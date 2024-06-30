import { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Skeleton } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./style.css";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDanhMuc } from "../../apis/class";
import { DanhMuc } from "../../types/class.type";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";
import { logOut } from "../../redux/slices/user.slice";
import logoELearning from "./../../assets/img/logoelearning.png"
import avatarIcon from "./../../assets/img/avartarIcon.jpg"

export default function HeaderComponent() {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

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
      <Link to={"/event/year-end"}>
        <li className="dropdownItem">sự kiện sale cuối năm</li>
      </Link>
      <Link to={"/event/noel"}>
        <li className="dropdownItem">sự kiện giáng sinh</li>
      </Link>
      <Link to={"/event/new-year"}>
        <li className="dropdownItem">sự kiện tết</li>
      </Link>
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

  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch(logOut());
  };

  return (
    <div className={`header ${isScrolled ? "headerScroll" : ""}`}>
      <div className="nav container mx-auto">
        <NavLink to={"/"}>
          <img className="logo" src={logoELearning}/>
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
        {currentUser ? (
          <div>
            {currentUser.maLoaiNguoiDung === "GV" ? <Link style={{fontSize:"20px", paddingRight:"16px"}} to={"/admin/user"}><FontAwesomeIcon icon={faGear}/></Link> : ""}
            <Link to={"/profile"}>
              <Avatar src={avatarIcon} />
              <span className="headerUsername">{currentUser.taiKhoan}</span>
            </Link>
            <Button className="logOutBtn" onClick={handleLogOut}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="logOutIcon"
              />
            </Button>
          </div>
        ) : (
          <div className="authBtn">
            <Button className="loginBtn">
              <Link to={"/auth/login"}>Đăng nhập</Link>
            </Button>
            <Button className="signupBtn">
              <Link to={"/auth/register"}>Đăng ký</Link>
            </Button>
          </div>
        )}

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
              <Link to={"/event/year-end"}>
                <li className="dropdownItem">sự kiện sale cuối năm</li>
              </Link>
              <Link to={"/event/noel"}>
                <li className="dropdownItem">sự kiện giáng sinh</li>
              </Link>
              <Link to={"/event/new-year"}>
                <li className="dropdownItem">sự kiện tết</li>
              </Link>
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
