import { useForm } from "react-hook-form";
import { type signInInputType, signInSchema } from "../../../schemas/auth/signInSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/common/button/Button.tsx";
import axiosInstance from "../../../api/axiosInstance.ts";
import { useNavigate } from "react-router";
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

function SignInPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<signInInputType>({
        resolver: zodResolver(signInSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: signInInputType) => {
        try {
            // signUpPage에서는 백엔드가 우리보고뭐라도 대답하든 "성공" 이면 신경 안 써도 됐는데
            // SignInPage  백앤드가 "성공"이라고 대답하면 신분증을 응답함
            const response = await axiosInstance.post("/user/login", data);
            /// axios의 응답 값인 response.data에 실제 백엔드가 응답한 데이터가 들어있음

            // user 정보와 token을 뽑이와야 함
            const { user, token } = response.data.data;
            // 신분증 발금은 login이라는 행위를 할 때마다 발급이 됨
            // 그렇기 떄문에 이 token을 어딘가(ContextAPI)등 에 저장해서 사용자가 백엔드에 저장해서
            // 사용자가 백엔드에 요청을 할 때나다 꺼내서 요청을 해야 함.
            localStorage.setItem("accessToken", token);

            alert("로그인에 성공했습니다");
            navigate("/");
        } catch (error) {
            let errorMessage = "로그인 중 오류가 발생했습니다";
            if (axios.isAxiosError(error)) {
                // catch에 모여지는 error는
                // axios에서 발생한 에러일 수도 있고, 아닐 수도 있는데 (통신 자체 실패)
                // axios에서 발생한 에러이더라도
                // 백엔드가 값을 정상적으로 받아준 200번대가 아닌 에러들은 백엔드가 { message: "어쩌구" } 형태로 응답
                // 아니라면 기본 메세지 "로그인 중 오류가 발생했습니다"를 유지하겠다.
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            setError("root", { message: errorMessage });
        }
    };

    return (
        <AuthContainer>
            <AuthFormCard onSubmit={handleSubmit(onSubmit)}>
                <AuthTitle>로그인</AuthTitle>
                <AuthSubTitle>다시 오신 것을 환영합니다!</AuthSubTitle>
                <AuthFormBox>
                    <InputGroup
                        label={"아이디"}
                        id={"username"}
                        registerObject={register("username")}
                        errorMessage={errors.username?.message}
                        placeholder={"아이디를 입력해주세요"}
                    />
                    <InputGroup
                        label={"비밀번호"}
                        id={"password"}
                        registerObject={register("password")}
                        errorMessage={errors.password?.message}
                        placeholder={"비밀번호를 입력헤주세요"}
                        type={"password"}
                    />
                </AuthFormBox>
                {errors.root && <AuthRootErrorMessage>{errors.root.message}</AuthRootErrorMessage>}

                <Button
                    color={"primary"}
                    variant={"contained"}
                    fullWidth={true}
                    disabled={isSubmitting}
                    type={"submit"}>
                    로그인
                </Button>
            </AuthFormCard>
        </AuthContainer>
    );
}

export default SignInPage;
