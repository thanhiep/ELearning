import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ReadOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, theme } from "antd";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { logOut } from "../../redux/slices/user.slice";
import logoELearning from "./../../assets/img/logoelearning.png"

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch()

  const handleLogOut = () =>{
    dispatch(logOut())
    localStorage.removeItem("user")
  }

  const items = [
    {
      key: "1",
      label: <Button onClick={handleLogOut}>Đăng xuất</Button>,
    },
  ];


  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link to={"/"}>
          <div className="h-[72px] my-1 text-white flex items-center justify-center">
            <img src={logoELearning} width={150} className="cursor-pointer" />
          </div>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          className="pt-1"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/admin/user",
              icon: <UserOutlined />,
              label: "Quản lý người dùng",
            },
            {
              key: "/admin/courses",
              icon: <ReadOutlined />,
              label: "Quản lý khóa học",
            },
            {
              key: "/admin/setting",
              icon: <ToolOutlined />,
              label: "Cài đặt tài khoản",
            },
          ]}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex items-center justify-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="h-[64px] w-[64px]"
            />
            <Dropdown menu={{ items }} arrow={{ pointAtCenter: true }}>
              <div className="pr-4">
                <Avatar
                  size={"large"}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "scroll",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
