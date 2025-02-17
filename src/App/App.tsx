import {
  LockOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  RobotOutlined,
  SignatureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Space, theme, Tooltip, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Users from "../Containers/Users/Users";
import Icon from "../assets/Icon";
import { useSetAtom } from "jotai";
import { accessTokenAtom, profileAtom, refreshTokenAtom } from "../Providers/Store";
import ProfileDialog from "./ProfileDialog";
import Entities from "../Containers/Entities/Entities";

export default function App() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setAccessToken = useSetAtom(accessTokenAtom);
  const setRefreshToken = useSetAtom(refreshTokenAtom);
  const setProfile = useSetAtom(profileAtom);
  function logout() {
    setProfile(undefined);
    setRefreshToken(undefined);
    setAccessToken(undefined);
  }
  return (
    <Layout>
      <ProfileDialog
        show={profileOpen}
        onClose={() => {
          setProfileOpen(false);
        }}
      />
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: 64, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Icon style={{ width: 32, height: 32, stroke: "#fff" }} />
          <Typography.Text style={{ color: "#fff", marginLeft: 8 }}>Nexus Admin</Typography.Text>
        </div>
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
            {
              key: "/entities",
              icon: <RobotOutlined />,
              label: "entities",
              onClick: () => {
                navigate("/entities");
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Layout.Header
          style={{
            padding: "0px 10px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </Space>
          <Space>
            <Tooltip title="profile">
              <Button
                type="text"
                icon={<UserOutlined />}
                shape="circle"
                onClick={() => {
                  setProfileOpen(true);
                }}
              />
            </Tooltip>
            <Tooltip title="logout">
              <Button type="text" icon={<LockOutlined />} onClick={logout} shape="circle" />
            </Tooltip>
          </Space>
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
            <Route path="/entities" element={<Entities />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
