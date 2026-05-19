import { FiGrid, FiHome, FiUser } from "react-icons/fi";
import styled from "styled-components";
import { Link, useLocation } from "react-router";

const adminNavList = [
    {
        path: "/admin/category",
        label: "카테고리 관리",
        icon: <FiGrid />,
    },
    {
        path: "/admin/user",
        label: "유저 관리",
        icon: <FiUser />,
    },
    {
        path: "/",
        label: "서비스로 돌아가기",
        icon: <FiHome />,
    },
];

function AdminAside() {
    // 사용자가 현대 위치한 경로를 가져오기 위헤 사용
    // location.pathname에 저장되어 있음
    const location = useLocation();
    return (
        <AdminSideBar>
            <SidebarHeader to={"/admin"}>관리자 센터</SidebarHeader>
            <SidebarMenu>
                {adminNavList.map((item, index) => {
                    // 지금 사용자가 있는 위치에 때라 MenuItem 글자 색 다르게 하기
                    const isActive = item.path === location.pathname;

                    return (
                        <MenuItem to={item.path} key={index} $isActive={isActive}>
                            {item.icon}
                            {item.label}
                        </MenuItem>
                    );
                })}
            </SidebarMenu>
        </AdminSideBar>
    );
}

export default AdminAside;

const AdminSideBar = styled.aside`
    width: 260px;
    background-color: ${props => props.theme.colors.background.paper};
    border-right: 1px solid ${props => props.theme.colors.divider};
    display: flex;
    flex-direction: column;
`;

const SidebarHeader = styled(Link)`
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    font-size: 20px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    border-bottom: 1px solid ${props => props.theme.colors.divider};
`;

const SidebarMenu = styled.nav`
    display: flex;
    flex-direction: column;
    padding: 16px 0;
    gap: 8px;
`;

const MenuItem = styled(Link)<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    font-size: 15px;
    font-weight: 500;
    color: ${props =>
        props.$isActive ? props.theme.colors.primary : props.theme.colors.text.default};
    background-color: ${props =>
        props.$isActive ? `${props.theme.colors.primary}15` : "transparent"};
    border-left: 4px solid
        ${props => (props.$isActive ? props.theme.colors.primary : "transparent")};
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.theme.colors.background.default};
        color: ${props => props.theme.colors.primary};
    }
`;
