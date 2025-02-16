import { MenuFoldOutlined, MenuUnfoldOutlined, ProductOutlined, SignatureOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Users from "../Containers/Users/Users";

export default function App() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: 64 }}>logo</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/",
              icon: <ProductOutlined />,
              label: "Home",
              onClick: () => {
                navigate("/");
              },
            },
            {
              key: "/users",
              icon: <UserOutlined />,
              label: "users",
              onClick: () => {
                navigate("/users");
              },
            },
            {
              key: "/invitations",
              icon: <SignatureOutlined />,
              label: "invitations",
              onClick: () => {
                navigate("/invitations");
              },
            },
          ]}
        />
      </Sider>

      <Layout>
        <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Layout.Header>
        <Layout.Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "calc(100vh - 112px)",
          }}
        >
          <Routes>
            <Route path="/" element={<div>home</div>} />
            <Route path="/users" element={<Users />} />
            <Route path="/invitations" element={<div>invitations</div>} />
            <Route path="/entities" element={<div>entities</div>} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
