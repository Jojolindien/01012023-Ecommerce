import React, { useState } from "react";
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/auth-slice";

const App = () => {
  const [current, setCurrent] = useState("mail");
  const [theme, setTheme] = useState("dark");
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  const history = useHistory();
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const logout = () => {
    console.log("logout");
    dispatch(userActions.logOut());
    history.push("/login");
  };

  const items = [
    {
      label: (
        <NavLink to="/" style={{ textDecoration: "none" }}>
          Home
        </NavLink>
      ),
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "Submenu",
      key: "SubMenu",
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:3",
            },
            {
              label: "Option 4",
              key: "setting:4",
            },
          ],
        },
      ],
    },
    (!user.token && {
      label: (
        <Link to="/register" style={{ textDecoration: "none" }}>
          Register
        </Link>
      ),
      key: "register",
      icon: <LoginOutlined />,
      style: { marginLeft: "auto" },
    }),
    (!user.token && {
      label: (
        <Link to="/login" style={{ textDecoration: "none" }}>
          Login
        </Link>
      ),
      key: "login",
      icon: <UserOutlined />,
    }),
    (user.token && 
    {
      label: "Logout",
      onClick: logout,
      key: "logout",
      icon: <LogoutOutlined />,
      style: { marginLeft: "auto" },
    }),
    {
      label: (
        <Switch
          checked={theme === "dark"}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        theme={theme}
      >
        <Switch
          checked={theme === "dark"}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </Menu>
    </React.Fragment>
  );
};
export default App;
