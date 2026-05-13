import { createContext } from "react";

// ThemeContext 선언
export type ThemeType = "light" | "dark";

export type ThemeContextType = {
    theme: ThemeType;
    onChangeTheme: VoidFunction;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    onChangeTheme: () => {},
});

// 사실 이렇게 만든 초기값을 쓸모가 없음
//  그 저장소의 type만 맞춰서 값을 집어넣은 것 (dummy)


