// 1  타입 지정

import { create } from "zustand";
import type { User } from "../../types/user.type.ts";
import { persist } from "zustand/middleware";

type AuthState = {
    // 값을 저장하는
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;

    // 저장된 값을 바꿀 수 있도록 외부에서 사용하게 하는 기능 프퍼티
    login: (user: User, token: string) => void  // token과 user의 값을 지정하고  isLoggedIn의 값을 true로 바꾸는 일을하는 함수
    logout: VoidFunction,       // token과 user의 항목 값을 비우고 isLoggedIn을  false로 바꾸는 일을 하는 함수
}

export const useAuthStore = create<AuthState>()(persist(set => ({
    isLoggedIn: false,
    token: null,
    user: null,
    login: (user, token) => set({ isLoggedIn: true, token, user }),
    logout: () => set({ isLoggedIn: false, token: null , user: null }),
}), { name: "auth-storage"}));

// 원래 객체의 값을 바꿔준다라고 했울 때 나머지 항목들도 적어줘애 하는데,
// zustand의 set명령어는 적어주지 않은 프로파티(항목)의 값은 안 적어줘도 유지함
