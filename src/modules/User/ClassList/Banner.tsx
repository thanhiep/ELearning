import { faBook, faBriefcase, faCamera, faDiceD20, faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import "./style.css"
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";

export default function BannerClassList() {
  return (
    <div>
      <div className="pageTitle">
        <h3>Khóa học</h3>
        <p>Bắt đầu hành trình nào!!!</p>
      </div>
      <div className="coursesContainer">
        <Row>
          <Col xs={12} md={8} lg={4} className="coursesBoxItem">
          <div className="coursesBox bgStyle1">
            <h6>Chương trình học</h6>
            <FontAwesomeIcon icon={faLaptop}/>
            <p>300</p>
          </div>
          </Col>
          <Col xs={12} md={8} lg={4} className="coursesBoxItem">
          <div className="coursesBox bgStyle2">
            <h6>Nhà sáng tạo</h6>
            <FontAwesomeIcon icon={faCamera}/>
            <p>10000</p>
          </div>
          </Col>
          <Col xs={12} md={8} lg={4} className="coursesBoxItem">
          <div className="coursesBox bgStyle3">
            <h6>Nhà thiết kế</h6>
            <FontAwesomeIcon icon={faBriefcase}/>
            <p>3000</p>
          </div>
          </Col>
          <Col xs={12} md={8} lg={4} className="coursesBoxItem">
          <div className="coursesBox bgStyle4">
            <h6>Bài giảng</h6>
            <FontAwesomeIcon icon={faBook}/>
            <p>4000</p>
          </div>
          </Col>
          <Col xs={12} md={8} lg={4} className="coursesBoxItem">
          <div className="coursesBox bgStyle5">
            <h6>Video</h6>
            <FontAwesomeIcon icon={faPlayCircle}/>
            <p>30000</p>
          </div>
          </Col>
          <Col xs={12} md={8} lg={4} className="coursesBoxItem">
          <div className="coursesBox bgStyle6">
            <h6>Lĩnh vực</h6>
            <FontAwesomeIcon icon={faDiceD20}/>
            <p>800</p>
          </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
