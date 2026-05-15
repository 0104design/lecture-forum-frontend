import Input from "./Input.tsx";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { InputHTMLAttributes } from "react";
import { ErrorMessage, StyledInputGroup } from "../group/Group.tsx";



// 우리가 사용하는 INputGroup이 input의 확장형임
interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    errorMessage?: string;
    registerObject?: UseFormRegisterReturn;
}


// 원래 input을 수동 관리하게되면 <input onChange{() => {}}의 형태가 됨
// ㅡreact-hook-form을 이용할 경우
// <input {...register("uesrname")} />로 사용했는데
// 이것은
// register("username")을 실행한 결과 (리턴)이
// {
//    onChange: () => {}.
//    value: "",
//    name: "username"
// }
// 이러힌 객체였기 때 때문에 스프레드 문법을 통해 input태그, 안에 흩뿌린 것
// 그렇기 때문에 InputGroup이라는 컴포넌트도 registerObject이라는 이름으로 register()를 실행시킨 결과를
// 반아서 input 내붕 흩뿌려주도록 함
// register()를 실행한 결과 갹체의 타입은 UseFormRegisterReturn
function InputGroup({ label, id, errorMessage, registerObject, ...props}: Props) {
    return (
        <StyledInputGroup>
            {label && <label htmlFor={id}>{label}</label>}
            <Input id={id} $hasError={!!errorMessage} {...registerObject} {...props} />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </StyledInputGroup>
    );
}

export default InputGroup;
