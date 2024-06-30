import { Button, Card, Col, Modal, Typography } from "antd";
import { ChiTietKhoaHocGhiDanh } from "../../../types/user.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock } from "@fortawesome/free-regular-svg-icons";
import "./style.css";
import { useMutation } from "@tanstack/react-query";
import { cancelClassApi } from "../../../apis/class";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { useNavigate } from "react-router-dom";
import successIcon from "./../../../assets/img/successIcon.png"
import questionIcon from "./../../../assets/img/questionIcon.jpg"

type Props = {
  course: ChiTietKhoaHocGhiDanh;
};

const { Meta } = Card;
const { Text } = Typography;

export default function Course(props: Props) {
  const { course } = props;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelSuccess, setIsCancelSuccess] = useState(false);

  const { currentUser } = useAppSelector((state) => state.user);

  const { mutate: handleCancelCourse, isPending } = useMutation({
    mutationFn: (payload: any) => cancelClassApi(payload),
    onSuccess: () => {
      setIsCancelSuccess(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = () => {
    handleCancelCourse({
      maKhoaHoc: course.maKhoaHoc,
      taiKhoan: currentUser.taiKhoan,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <Col xs={24} sm={12} lg={8}>
          <Card
            className="mx-auto card-class cursor-pointer"
            style={{ width: 240 }}
            cover={
              <img
                className="w-full h-[180px] "
                alt={course.biDanh}
                src={course.hinhAnh}
              />
            }
            onClick={()=>{navigate(`/class-detail/${course.maKhoaHoc}`)}}
          >
            <Meta
              title={<span className="card-title">{course.tenKhoaHoc}</span>}
              description={
                <Text ellipsis>
                  <span style={{ color: "#8c8c8c" }}>{course.moTa}</span>
                </Text>
              }
            />
            <div className="card-icon">
              <FontAwesomeIcon
                className="icon text-orange-400"
                icon={faClock}
              />
              <span className="icon-text">48 giờ</span>
              <span className="icon-spacing">|</span>
              <FontAwesomeIcon
                className="icon text-red-700"
                icon={faCalendarDays}
              />
              <span className="icon-text">8 tuần</span>
            </div>
          </Card>
        <div className="cancelCourseBtn">
          <Button
            className="cancelBtn"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Hủy đăng ký
          </Button>
        </div>
      </Col>
      <Modal
        title="Hủy khóa học"
        open={isModalOpen}
        closable={false}
        footer={null}
        className="authModal registerModal"
        centered
      >
        <img src={questionIcon} alt="" />
        <p>
          Bạn muốn hủy đăng ký khóa học{" "}
          <span style={{ fontWeight: "600", color: "#41b294" }}>
            {course.tenKhoaHoc}
          </span>{" "}
          phải không?
        </p>
        <Button
          className="cancelBtn mt-5 mx-5"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          Quay lại
        </Button>
        <Button
          className="confirmDeleteBtn mt-5"
          onClick={onSubmit}
          disabled={isPending}
        >
          Đồng ý
        </Button>
      </Modal>

      <Modal
        title="Hủy khóa học thành công"
        open={isCancelSuccess}
        footer={null}
        className="authModal registerModal"
        closable={false}
        centered
      >
        <img src={successIcon} alt="" />
        <p>Bạn đã hủy khóa học, hẹn gặp lại bạn ở các khóa học khác.</p>
        <Button
          className="tryAgainBtn mt-5 mr-5"
          onClick={() => {
            setIsCancelSuccess(false);
            navigate(0);
          }}
        >
          Quay lại
        </Button>
        <Button
          className="moreCourseBtn mt-5"
          onClick={() => {
            navigate("/class-list");
          }}
        >
          Xem khóa học khác
        </Button>
      </Modal>
    </>
  );
}
