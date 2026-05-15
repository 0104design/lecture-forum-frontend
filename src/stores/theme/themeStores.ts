import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeType = "light" | "dark";

type ThemeState = {
    theme: ThemeType;
    onChangeTheme: VoidFunction;
};

export const useThemeStore = create<ThemeState>()(
    // persist는 이렇게 만든 store와 localStorage를 연결히는 미들웨어
    // persist 를 사용하면 localStorage의 자동저장 / 불러오기 기능이 추가됨
    // create <스토어늬 타입>()(persist)

    // 초기값을 함수로 넣었고ㅡ
    // 그 매개변수 자리에는 (스토어의 값을 바꿀 수 있는 명령) => ({ theme, onChangeTheme })

    //  persist(초기값,  localStorage설정)
    persist(
        set => ({
            theme: "light",
            onChangeTheme: () =>
                set(state => ({ theme: state.theme === "light" ? "dark" : "light" })),
        }),
        {
            name: "theme-storage",
        },
    ),
);




