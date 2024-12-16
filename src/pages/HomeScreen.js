import React, { useState } from "react";
import FinanceScreen from "./FinanceScreen";
import FooterLink from "../components/FooterLink";
import Logout from "../components/Logout";
import {
    FileOutlined,
    PieChartOutlined,
    LogoutOutlined,
    UserOutlined,
    WalletOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem("Dashboard", "1", <PieChartOutlined />),
    getItem("Transactions", "2", <FileOutlined />),
    getItem("Profile", "3", <UserOutlined />),
    getItem("Logout", "4", <LogoutOutlined />),
];

export default function HomeScreen() {
    const [collapsed, setCollapsed] = useState(false);
    const [render, updateRender] = useState(1);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const components = {
        1: <div>Dashboard</div>,
        2: <FinanceScreen />,
        3: <div>Profile</div>,
        4: <Logout />,
    };

    const layoutTitle = {
        1: "Dashboard",
        2: "Transaction list",
        3: "Profile",
        4: "Logout",
    };

    const handleMenuClick = (menu) => {
        updateRender(menu.key);
        console.log(menu.key);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div
                    className="demo-logo-vertical"
                    style={{ textAlign: "center", color: "white", padding: 10 }}
                >
                    <h1>
                        <WalletOutlined /> {!collapsed ? "FINANCE" : ""}{" "}
                    </h1>
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                    style={{ padding: 5 }}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
                <header
                    style={{ paddingLeft: 36, background: colorBgContainer }}
                >
                    <h2>{layoutTitle[render]}</h2>
                </header>
                <Content style={{ margin: "16px 16px" }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {components[render]}
                    </div>
                </Content>
                <FooterLink />
            </Layout>
        </Layout>
    );
}
