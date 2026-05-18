import { createBrowserRouter, redirect } from "react-router";
import HomePage from "../pages/HomePage.tsx";
import SignInPage from "../pages/auth/signin/SignInPage.tsx";
import SignUpPage from "../pages/auth/signup/SignUpPage.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";
import AdminCategoryListPage from "../pages/admin/category/AdminCategoryListPage.tsx";
import { useAuthStore } from "../stores/auth/authStore.ts";
import { Role } from "../types/user.type.ts";

// 화면의 권한에 따라 접근할 수 있는 주소를 판별하기 위해
// react-router 라이브러리에서는 로더 라는 기능을 제공함
// 라우팅을 하기 전 로더가 미들웨어로 동작하여 접근할 수 있는지 유뮤를 판별

const adminLoader = () => {
    // zustand가 저장하고 있는 회원 정보에 접근
    //  컴포넌트 안에사는 const { user, isLoggedIn } = useAuthStore();로 불러오는 게 가능함
    // 이 파일은 컴포넌트가 아님 => 화면에 그려지기 전 단계의 처리 진행.
    // Next.js를 기준으로 설명하면 여기는 ClientSide가 아님

    const { user, isLoggedIn } = useAuthStore.getState();

    if (!isLoggedIn) {
        alert("로그인이 필요합니다.")
        // 컴포넌트가 아닌 곳에서 사용자를 이동시키는 메서드
        // 이전에 사용했던 navigate는 컴포넌트 안ㅇ에서만 사용ㅇ가능
        return redirect("/auth/signin");
    }

    if (user?.role !== Role.ADMIN) {
        alert("관리자만 접근할 수 있는 페이지입니다.")
        return redirect("/");
    }

    return null;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "auth",
                children: [
                    { path: "signin", element: <SignInPage /> },
                    { path: "signup", element: <SignUpPage /> },
                ],
            },
        ],
    },
    {
        path: "admin",
        loader: adminLoader,
        element: <AdminLayout />,
        children: [
            {
                path: "category",
                children: [{ index: true, element: <AdminCategoryListPage /> }],
            },
        ],
    },
]);

export default router;
