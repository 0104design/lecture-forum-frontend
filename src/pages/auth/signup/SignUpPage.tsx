import { useForm } from "react-hook-form";
import { type SignupInputType, signUpSchema } from "../../../schemas/auth/signUpSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { Gender } from "../../../types/user.type.ts";
import Button from "../../../components/common/button/Button.tsx";
import { useNavigate } from "react-router";
import axiosInstance from "../../../api/axiosInstance.ts";
import * as axios from "axios";

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
            <FormCard onSubmit={handleSubmit(onSubmit)}>
                <Title>회원가입</Title>
                <SubTitle>토론대난투에 오신 것을 환영합니다!</SubTitle>
                <FormBox>
                    <InputGroup>
                        <Label htmlFor={"username"}>아이디</Label>
                        <Input
                            {...register("username")}
                            $hasError={!!errors.username} // !를 붙인다는 건 있으면 false없으면 true 반대값으로 boolean혛변환
                            // !!를 붙인다는 건 어떤 값이든 있으면 true, 없으면 false boolean형변환
                            id={"username"}
                            placeholder={"4자 이상 필요"}
                        />
                        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"password"}>비밀번호</Label>
                        <Input
                            {...register("password")}
                            $hasError={!!errors.password}
                            id={"password"}
                            placeholder={"6자 이상 필요"}
                            type={"password"}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"passwordConfirm"}>비밀번호 확인</Label>
                        <Input
                            {...register("passwordConfirm")}
                            $hasError={!!errors.passwordConfirm}
                            id={"passwordConfirm"}
                            placeholder={"비밀번호를 한 번 더 입력헤주세요"}
                            type={"password"}
                        />
                        {errors.passwordConfirm && (
                            <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
                        )}
                    </InputGroup>
                    {/*<InputGroup>*/}
                    {/*    <Label htmlFor={"name"}>이름</Label>*/}
                    {/*    <Input {...register("name")} $hasError={!!errors.passwordConfirm} id={"name"} />*/}
                    {/*    {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}*/}
                    {/*</InputGroup>*/}
                    <InputGroup>
                        <Label htmlFor={"name"}>이름</Label>
                        <Input {...register("name")} $hasError={!!errors.name} id={"name"} />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"nickName"}>닉네임</Label>
                        <Input
                            {...register("nickname")}
                            $hasError={!!errors.nickname}
                            id={"nickName"}
                            placeholder={"닉네임을 2자 이상 입력해주세요"}
                        />
                        {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"email"}>이메일</Label>
                        <Input
                            {...register("email")}
                            $hasError={!!errors.email}
                            id={"email"}
                            type={"email"}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"phoneNumber"}>전화번호</Label>
                        <Input
                            {...register("phoneNumber")}
                            $hasError={!!errors.phoneNumber}
                            id={"phoneNumber"}
                            type={"tel"}
                        />
                        {errors.phoneNumber && (
                            <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
                        )}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"birthdate"}>생년월일</Label>
                        <Input
                            {...register("birthdate")} //  birthDate
                            $hasError={!!errors.birthdate}
                            id={"birthdate"}
                            type={"date"}
                        />
                        {errors.birthdate && (
                            <ErrorMessage>{errors.birthdate.message}</ErrorMessage>
                        )}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"gender"}>성별</Label>
                        <Select
                            {...register("gender")} //  birthDate
                            $hasError={!!errors.gender}
                            id={"gender"}>
                            <option value={""}>성별을 선택해주세요</option>
                            <option value={Gender.MALE}>남성</option>
                            <option value={Gender.FEMALE}>여성</option>
                        </Select>
                        {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
                    </InputGroup>
                </FormBox>
                {errors.root && <RootErrorMessage>{errors.root.message}</RootErrorMessage>}

                <Button
                    color={"primary"}
                    variant={"contained"}
                    fullWidth={true}
                    disabled={isSubmitting}
                    type={"submit"}>
                    회원가입
                </Button>
            </FormCard>
        </AuthContainer>
    );
}

export default SignUpPage;

const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormCard = styled.form`
    width: 100%;
    max-width: 480px;
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 16px;
    border: 1px solid ${props => props.theme.colors.divider};
    padding: 40px 20px;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 8px;
    text-align: center;
`;

const SubTitle = styled.h6`
    font-size: 15px;
    color: ${props => props.theme.colors.text.disabled};
    text-align: center;
    margin-bottom: 32px;
`;

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 50px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 800;
    color: ${props => props.theme.colors.text.default};
`;

const Input = styled.input<{ $hasError?: boolean }>`
    width: 100%;
    padding: 12px 16px;
    background-color: ${props => props.theme.colors.background.default};
    border: 1px solid
        ${props => (props.$hasError ? props.theme.colors.error : props.theme.colors.divider)};
    border-radius: 8px;
    font-size: 15px;
    color: ${props => props.theme.colors.text.default};
    transition: all 0.5s;

    &::placeholder {
        color: ${props => props.theme.colors.text.disabled};
    }

    &:focus {
        border-color: ${props =>
            props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
    }
`;

const Select = styled.select<{ $hasError?: boolean }>`
    width: 100%;
    padding: 12px 16px;
    background-color: ${props => props.theme.colors.background.default};
    border: 1px solid
        ${props => (props.$hasError ? props.theme.colors.error : props.theme.colors.divider)};
    border-radius: 8px;
    font-size: 15px;
    color: ${props => props.theme.colors.text.default};
    transition: all 0.5s;

    &::placeholder {
        color: ${props => props.theme.colors.text.disabled};
    }

    &:focus {
        border-color: ${props =>
            props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
    }
`;

const ErrorMessage = styled.span`
    font-size: 13px;
    color: ${props => props.theme.colors.error};
    font-weight: 500;
`;

const RootErrorMessage = styled.p`
    font-size: 14px;
    text-align: center;
    color: ${(props => props.theme.colors.error)};
    font-weight: 500;
    margin-bottom: 50px;
`;
