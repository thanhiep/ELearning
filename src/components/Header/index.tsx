import { useEffect, useState } from "react";
import { Button, Dropdown, Skeleton } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./style.css";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDanhMuc } from "../../apis/class";
import { DanhMuc } from "../../types/class.type";

export default function HeaderComponent() {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isLoading: isDanhMucLoading, data: dataDanhMuc = [] } = useQuery({
    queryKey: ["danh-muc"],
    queryFn: getDanhMuc,
  });

  const renderDanhMuc = () => {
    if (isDanhMucLoading) return <Skeleton />;
    if (dataDanhMuc) {
      return dataDanhMuc.map((danhMuc: DanhMuc) => {
        return (
          <NavLink
            key={danhMuc.maDanhMuc}
            to={`/danh-muc/${danhMuc.maDanhMuc}`}
            className={({ isActive }) => (isActive ? "my-active-mobie" : "")}
          >
            <li className="dropdownItem">{danhMuc.tenDanhMuc}</li>
          </NavLink>
        );
      });
    }
  };

  const showDrawer = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const dropdownDanhMuc = <ul className="dropdown">{renderDanhMuc()}</ul>;

  const dropdownSuKien = (
    <ul className="dropdown">
      <li className="dropdownItem">sự kiện sale cuối năm</li>
      <li className="dropdownItem">sự kiện giáng sinh</li>
      <li className="dropdownItem">sự kiện tết</li>
    </ul>
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`header ${isScrolled ? "headerScroll" : ""}`}>
      <div className="nav container mx-auto">
        <NavLink to={"/"}>
          <img className="logo" src="img/logoelearning.png" />
        </NavLink>

        <ul className="nav-bar">
          <li className="nav-item">
            <Dropdown dropdownRender={() => dropdownDanhMuc}>
              <NavLink to={"/"}>
                <MenuOutlined /> Danh mục
              </NavLink>
            </Dropdown>
          </li>

          <li className="nav-item">
            <NavLink
              to={"/class-list"}
              className={({ isActive }) => (isActive ? "my-active" : "")}
            >
              Khóa học
            </NavLink>
          </li>

          <li className="nav-item">
            {" "}
            <NavLink
              to={"/blog"}
              className={({ isActive }) => (isActive ? "my-active" : "")}
            >
              blog
            </NavLink>
          </li>

          <li className="nav-item">
            <Dropdown dropdownRender={() => dropdownSuKien}>
              <NavLink
                to={"/event"}
                className={({ isActive }) => (isActive ? "my-active" : "")}
              >
                sự kiện
              </NavLink>
            </Dropdown>
          </li>

          <li className="nav-item">
            {" "}
            <NavLink
              to={"/about"}
              className={({ isActive }) => (isActive ? "my-active" : "")}
            >
              Thông tin{" "}
            </NavLink>
          </li>
        </ul>
        <div className="authBtn">
          <Button className="loginBtn"> Đăng nhập</Button>
          <Button className="signupBtn">Đăng ký</Button>
        </div>

        <ul
          className={
            visible
              ? "menuHeaderMobie menuHeaderMobieRes"
              : "menuHeaderMobieInvi menuHeaderMobie"
          }
        >
          <li className="nav-item courseCateMobie">
            <MenuOutlined /> Danh mục
            <ul className="courseCateListMobie">{renderDanhMuc()}</ul>
          </li>
          <NavLink
            to={"/class-list"}
            className={({ isActive }) => (isActive ? "my-active-mobie" : "")}
          >
            <li className="nav-item">Khóa học</li>
          </NavLink>
          <NavLink
            to={"/blog"}
            className={({ isActive }) => (isActive ? "my-active-mobie" : "")}
          >
            <li className="nav-item">blog</li>
          </NavLink>
          <li className="nav-item eventHeaderMobie courseCateMobie">
            <NavLink
              to={"/event"}
              className={({ isActive }) => (isActive ? "my-active-mobie" : "")}
            >
              sự kiện
            </NavLink>
            <ul className="courseCateListMobie">
              <li className="dropdownItem">sự kiện sale cuối năm</li>
              <li className="dropdownItem">sự kiện giáng sinh</li>
              <li className="dropdownItem">sự kiện tết</li>
            </ul>
          </li>
          <NavLink
            to={"/about"}
            className={({ isActive }) => (isActive ? "my-active-mobie" : "")}
          >
            <li className="nav-item">Thông tin</li>
          </NavLink>
        </ul>

        <Button id="menuButton" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
      </div>
    </div>
  );
}
