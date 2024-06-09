import { Button, Col, Row, Skeleton } from "antd";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getClassDetailApi } from "../../../apis/class";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCheck,
  faDollarSign,
  faEye,
  faGraduationCap,
  faPeopleGroup,
  faPlayCircle,
  faStar,
  faUserGraduate,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { faClock,  faStarHalfAlt } from "@fortawesome/free-regular-svg-icons";

export default function ClassDetail() {
  const { id } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["class-detail", id],
    queryFn: () => getClassDetailApi(id),
  });

  const renderClassDetail = () => {
    if (data) {
      return (
        <div className="classDetail">
          <img src={data.hinhAnh} alt="" />
          <p className="classDetailInfo">
            <span style={{ fontWeight: "600" }}>Chi tiết: </span>
            <span style={{ color: "#8c8c8c" }}>{data.moTa}</span>
          </p>
          <div className="classDetailView">
            <p>
              <FontAwesomeIcon icon={faEye} />
              <span>{data.luotXem}</span>
              <span>lượt xem</span>
            </p>
            <p className="classDetailPrice">
              <FontAwesomeIcon icon={faDollarSign} />
              500.000<sup>đ</sup>
            </p>
          </div>
          <Button className="classRegisterBtn">Đăng ký</Button>
          <div className="classDetailBonus">
            <ul>
              <li>
                <p>
                  Ghi danh:
                  <span> 10 học viên</span>
                </p>
                <FontAwesomeIcon icon={faUserGraduate} />
              </li>
              <li>
                <p>
                  Thời gian:
                  <span> 20 giờ</span>
                </p>
                <FontAwesomeIcon icon={faClock} />
              </li>
              <li>
                <p>
                  Bài học:
                  <span> 10</span>
                </p>
                <FontAwesomeIcon icon={faBook} />
              </li>
              <li>
                <p>
                  Video:
                  <span> 15</span>
                </p>
                <FontAwesomeIcon icon={faVideo} />
              </li>
              <li>
                <p>
                  Trình độ:
                  <span> Người mới bắt đầu</span>
                </p>
                <FontAwesomeIcon icon={faPeopleGroup} />
              </li>
            </ul>
          </div>
        </div>
      );
    }
  };

  if (isLoading) return <Skeleton />;

  return (
    <div>
      <div className="pageTitle">
        <h3>Thông tin khóa học</h3>
        <p>Tiến lên và không chần chừ!!!</p>
      </div>
      <div className="classDetailContent">
        <Row gutter={40}>
          <Col md={24} lg={16}>
            <h4 className="titleClassDetail">{data?.tenKhoaHoc}</h4>
            <Row className="headClassDetail">
              <Col span={8}>
                <div className="classDetailIntro">
                  <img src="./../../../../img/instrutor5.jpg" alt="" />
                  <div className="instrutorTitle">
                    <p>Giảng viên</p>
                    <p>Robert Lê Văn</p>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="classDetailIntro">
                  <div>
                    <FontAwesomeIcon icon={faGraduationCap} />
                  </div>
                  <div className="instrutorTitle">
                    <p>Lĩnh vực</p>
                    <p>Thiết kế web</p>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="classDetailIntro">
                  <div className="reviewDetail">
                    <span>
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStarHalfAlt} />
                      4.5
                    </span>
                    <p>100 đánh giá</p>
                  </div>
                </div>
              </Col>
            </Row>
            <p className="classDetailText">
              React.js là thư viện JavaScript phổ biến nhất mà bạn có thể sử
              dụng và tìm hiểu ngày nay để xây dựng giao diện người dùng hiện
              đại, phản ứng cho web.Khóa học này dạy bạn về React chuyên sâu, từ
              cơ bản, từng bước đi sâu vào tất cả các kiến ​​thức cơ bản cốt
              lõi, khám phá rất nhiều ví dụ và cũng giới thiệu cho bạn các khái
              niệm nâng cao.Bạn sẽ nhận được tất cả lý thuyết, hàng tấn ví dụ và
              bản trình diễn, bài tập và bài tập cũng như vô số kiến ​​thức quan
              trọng bị hầu hết các nguồn khác bỏ qua - sau cùng, có một lý do
              tại sao khóa học này lại rất lớn! Và trong trường hợp bạn thậm chí
              không biết tại sao bạn lại muốn học React và bạn chỉ ở đây vì một
              số quảng cáo hoặc "thuật toán" - đừng lo lắng: ReactJS là một công
              nghệ quan trọng với tư cách là một nhà phát triển web và trong
              khóa học này, tôi sẽ cũng giải thích TẠI SAO điều đó lại quan
              trọng!
            </p>
            <div className="boxClassLearn">
              <h6>Những gì bạn sẽ học</h6>
              <Row gutter={40}>
                <Col sm={24} md={12}>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>
                        Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân
                        thiện với người dùng và phản ứng nhanh
                      </span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>
                        Đăng ký công việc được trả lương cao hoặc làm freelancer
                        trong một trong những lĩnh vực được yêu cầu nhiều nhất
                        mà bạn có thể tìm thấy trong web dev ngay bây giờ
                      </span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>
                        Cung cấp trải nghiệm người dùng tuyệt vời bằng cách tận
                        dụng sức mạnh của JavaScript một cách dễ dàng
                      </span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>
                        Tìm hiểu tất cả về React Hooks và React Components
                      </span>
                    </li>
                  </ul>
                </Col>
                <Col sm={24} md={12}>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>
                      Thông thạo chuỗi công cụ hỗ trợ React, bao gồm cú pháp Javascript NPM, Webpack, Babel và ES6 / ES2015
                      </span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>
                      Hãy là kỹ sư giải thích cách hoạt động của Redux cho mọi người, bởi vì bạn biết rất rõ các nguyên tắc cơ bản
                      </span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>
                      Nắm vững các khái niệm cơ bản đằng sau việc cấu trúc các ứng dụng Redux
                      </span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>
                      Nhận ra sức mạnh của việc xây dựng các thành phần có thể kết hợp
                      </span>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
            <div className="classContent">
              <h6>Nội dung khóa học</h6>
              <div className="classContentItemBox">
                <div className="classContentItem">
                  <div className="classContentItemTitle">
                    <span>Mục 1: Giới thiệu</span>
                    <Button className="classPreviewBtn">Xem trước</Button>
                  </div>
                  <p>Bài học</p>
                  <div className="lessonContainer">
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        Các khái niệm về React Component
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        Thiết lập môi trường cho Windows
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        Tạo ứng dụng React - React-Scripts
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        Ghi chú nhanh về dấu ngoặc kép cho string interpolation
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                  </div>
                </div>
                <div className="classContentItem">
                  <div className="classContentItemTitle">
                    <span>Mục 2: Kiến thức căn bản</span>
                    <Button className="classPreviewBtn">Xem trước</Button>
                  </div>
                  <p>Bài học</p>
                  <div className="lessonContainer">
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        Trang chủ và thành phần thư mục
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        Hướng dẫn khóa học + Liên kết Github
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        Trang chủ thương mại điện tử + thiết lập SASS
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        Tệp CSS và SCSS
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        React 17: Cập nhật các gói + Phiên bản React mới nhất
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                  </div>
                </div>
                <div className="classContentItem">
                  <div className="classContentItemTitle">
                    <span>Mục 3: Kiến thức chuyên sâu</span>
                    <Button className="classPreviewBtn">Xem trước</Button>
                  </div>
                  <p>Bài học</p>
                  <div className="lessonContainer">
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        connect() and mapStateToProps
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        Trạng thái thư mục vào Redux
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                    <div className="lessonContent">
                      <span>
                        <FontAwesomeIcon icon={faPlayCircle}/>
                        Thành phần Tổng quan về Bộ sưu tập
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock}/>
                        15:35
                      </span>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={24} lg={8}>
            {renderClassDetail()}
          </Col>
        </Row>
      </div>
    </div>
  );
}
