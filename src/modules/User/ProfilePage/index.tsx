import { useQuery } from "@tanstack/react-query";
import "./style.css";
import { getUserProfileApi } from "../../../apis/user";
import { Col, Row, Skeleton } from "antd";
import Course from "./course";
import avatarIcon from "./../../../assets/img/avartarIcon.jpg";
import { useAppSelector } from "../../../redux/hook";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state) => state.user);
  if (!currentUser) {
    navigate("/");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserProfileApi(),
  });

  const renderCourse = () => {
    if (data) {
      return data.chiTietKhoaHocGhiDanh.map((course) => {
        return <Course key={course.maKhoaHoc} course={course} />;
      });
    }
  };

  const renderProfile = () => {
    if (data) {
      return (
        <Row gutter={40}>
          <Col xs={24} md={8}>
            <div className="profileContent">
              <h3>Thông tin tài khoản</h3>
              <img src={avatarIcon} alt="avartar" />
              <div className="profileTextBox">
                <div className="profileText">
                  <p>
                    <span>Họ tên: </span> {data.hoTen}
                  </p>
                  <p>
                    <span>Tài khoản: </span> {data.taiKhoan}
                  </p>
                  <p>
                    <span>Email: </span> {data.email}
                  </p>
                  <p>
                    <span>Điện thoại: </span> {data.soDT}
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={16}>
            <div className="profileContent">
              <h3>Khóa học của bạn</h3>
              <div className="profileCourse">
                <Row gutter={40}>{renderCourse()}</Row>
              </div>
            </div>
          </Col>
        </Row>
      );
    }
  };

  if (isLoading) return <Skeleton />;

  return (
    <div className="profileUser">
      <div className="pageTitle">
        <h3>Thông tin người dùng</h3>
        <p>Các khóa học bạn đã đăng ký</p>
      </div>
      <div className="container mx-auto profileContentBox">
        {renderProfile()}
      </div>
    </div>
  );
}
