import React, { useState } from "react";
import FinanceScreen from "./FinanceScreen";
import {
  FileOutlined,
  PieChartOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Content, Footer, Sider } = Layout;
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
  getItem("User", "3", <UserOutlined />),
  getItem("Logout","4",<LogoutOutlined />)
];

export default function HomeScreen() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <header style={{ paddingLeft: 36, background: colorBgContainer}}><h2>TransactionList</h2></header>
        <Content style={{ margin: "16px 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <FinanceScreen/>
          </div>
        </Content>
        <Footer style={{ textAlign: "center",}}></Footer>
      </Layout>
    </Layout>
  );
}
