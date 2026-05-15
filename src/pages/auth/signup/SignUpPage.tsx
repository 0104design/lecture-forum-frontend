import { useForm } from "react-hook-form";
import { type SignupInputType, signUpSchema } from "../../../schemas/auth/signUpSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender } from "../../../types/user.type.ts";
import Button from "../../../components/common/button/Button.tsx";
import { useNavigate } from "react-router";
import axiosInstance from "../../../api/axiosInstance.ts";
import * as axios from "axios";
import {
    AuthContainer,
    AuthFormBox,
    AuthFormCard,
    AuthRootErrorMessage,
    AuthSubTitle,
    AuthTitle,
} from "../../../components/auth/auth.style.tsx";
import InputGroup from "../../../components/common/input/InputGroup.tsx";
import SelectGroup from "../../../components/common/select/SelectGroup.tsx";

function SignUpPage() {
    const navigate = useNavigate();
    // 회원가입 화면

    // input을 react-hook-form으로 관리
    // 사용자가 입력한 값을 백엔드로 보내기 전 검증절차 필요   => zod 라이브러리
    // 화면 작성

    // isSubmitting: handleSubmit을 통해 전솔중이라면 true, 아니라면 false
    // setError : 에러 발생 시 해당 항목에 대한 에러 메세지를 설정하는 메소드
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignupInputType>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur", // 언제 검증할 것인지
    });

    // 처음에는 errors = {}
    // 그러다가 각 항목에 에러가 발생하면 그 안에 key가 추가됨
    //  username의 검증에 실패하면 { username: { message: "어러내용 } } 형태가 됨
    // errors는 각 항목에 대한 에러만 관리하는게 아니라 대표 항목인 root 라는 항목도 존재
    const onSubmit = async (data: SignupInputType) => {
        try {
            // 전송에 대한 내용을 기재하면 되는데, 그대로 데이터를 전달할 것인가?
            // 프론트엔드에서만 필요한 passwordConfirm이라는 항목이 추가됨
            const { passwordConfirm, ...submitData } = data;

            // fetch() 로 통신을 하면 백엔드가 전달해주는 response가 존재하기만 하면 성공으로 판단
            // axios로 하면 백엔드가 200번대 서성공 코드를 전해줘야만 성공으로 판단
            // 이 외의 에러는 catch로 처리됨
            await axiosInstance.post("/user/create", submitData);

            // 성공했었을 때 백엔드가 전해준 내용은 response.data 에 객체 상태로 존재하 (JSON 불필요)

            // 백엔드에게 전송해서 성공
            alert("회원가입이 완료되었습니다. 로그인을 진행해주세요.");
            navigate("/auth/signin");
        } catch (error) {
            // 기본 에러 메세지를 미리 넣어서
            let errorMessage = "회원가입 중 오류가 발생했습니다";

            // 지금 catch에 잡힌 error가  axios의 에러인지 판별
            if (axios.isAxiosError(error)) {
                // axios 에서 발생한 error라면 백엔드에서 기재한 내용이 error.response?.data?.message 존재
                // 그 백엔드에서 전달해 준 내용dmf ㄷㄱ객Message에 저장
                errorMessage = error.response?.data?.message || errorMessage;
                // axio에서 발생한 에러가 아닌 자바스크립트 표준 에러 객체라면
                // error.message에 담긴 에러 내용을 errorMessage 에 저장
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            setError("root", { message: errorMessage });
        }
    };

    return (
        <AuthContainer>
            <AuthFormCard onSubmit={handleSubmit(onSubmit)}>
                <AuthTitle>회원가입</AuthTitle>
                <AuthSubTitle>토론대난투에 오신 것을 환영합니다!</AuthSubTitle>
                <AuthFormBox>
                    <InputGroup
                        label={"아이디"}
                        id={"username"}
                        errorMessage={errors.username?.message}
                        registerObject={register("username")}
                        placeholder={"4자 이상 필요"}
                    />
                    <InputGroup
                        label={"비밀번호"}
                        id={"password"}
                        errorMessage={errors.password?.message}
                        registerObject={register("passwordConfirm")}
                        placeholder={"6자 이상 필요"}
                        type={"6자 이상 필요"}
                    />

                    <InputGroup
                        label={"이름"}
                        id={"name"}
                        errorMessage={errors.name?.message}
                        registerObject={register("name")}
                    />
                    <InputGroup
                        label={"닉네임"}
                        id={"nickname"}
                        errorMessage={errors.nickname?.message}
                        registerObject={register("nickname")}
                        placeholder={"닉네임을 2자 이상 입력해 주세요"}
                    />
                    <InputGroup
                        label={"이메일"}
                        id={"email"}
                        errorMessage={errors.email?.message}
                        registerObject={register("email")}
                        type={"email"}
                    />
                    <InputGroup
                        label={"전화먼호"}
                        id={"phoneNumber"}
                        errorMessage={errors.phoneNumber?.message}
                        registerObject={register("phoneNumber")}
                        type={"tel"}
                    />
                    <InputGroup
                        label={"생년월일"}
                        id={"birthdate"}
                        errorMessage={errors.birthdate?.message}
                        registerObject={register("birthdate")}
                        type={"date"}
                    />
                    <SelectGroup
                        label={"성별"}
                        id={"gender"}
                        errorMessage={errors.gender?.message}
                        registerObj={register("gender")}>
                        <option value={""}>성별을 선택해주세요</option>
                        <option value={Gender.MALE}>남성</option>
                        <option value={Gender.FEMALE}>여성</option>
                    </SelectGroup>

                </AuthFormBox>
                {errors.root && <AuthRootErrorMessage>{errors.root.message}</AuthRootErrorMessage>}

                <Button
                    color={"primary"}
                    variant={"contained"}
                    fullWidth={true}
                    disabled={isSubmitting}
                    type={"submit"}>
                    회원가입
                </Button>
            </AuthFormCard>
        </AuthContainer>
    );
}

export default SignUpPage;


