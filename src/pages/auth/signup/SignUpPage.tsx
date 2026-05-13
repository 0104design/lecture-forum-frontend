import { useForm } from "react-hook-form";
import { type SignupInputType, signUpSchema } from "../../../schemas/auth/signUpSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";

function SignUpPage() {
    // 회원가입 화면

    // input을 react-hook-form으로 관리
    // 사용자가 입력한 값을 백엔드로 보내기 전 검증절차 필요   => zod 라이브러리
    // 화면 작성

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupInputType>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur", // 언제 검증할 것인지
    });

    return <></>;
}

export default SignUpPage;
