import { Button, Col, Row } from "antd";
import "./style.css";
import itImg from "./../../../assets/img/event/it.png"
import intrutor05 from "./../../../assets/img/instrutor5.jpg"
import intrutor06 from "./../../../assets/img/instrutor6.jpg"
import intrutor07 from "./../../../assets/img/instrutor7.jpg"
import intrutor08 from "./../../../assets/img/instrutor8.jpg"
import intrutor09 from "./../../../assets/img/instrutor9.jpg"
import intrutor10 from "./../../../assets/img/instrutor10.jpg"
import intrutor11 from "./../../../assets/img/instrutor11.jpg"
import intrutor12 from "./../../../assets/img/instrutor12.jpg"
import meta from "./../../../assets/img/event/meta.jpg"
import microsoft from "./../../../assets/img/event/microsoft.jpg"
import google from "./../../../assets/img/event/Google-logo.jpg"
import amazon from "./../../../assets/img/event/amazon.jpg"

export default function EventPage() {
  return (
    <>
      <div className="eventBanner">
        <div className="eventTime">
          <div className="eventCountDown">
            <div className="time">
              <p className="eventDay">00</p>
              <p>
                <small>Ngày</small>
              </p>
            </div>
            <div className="time">
              <p className="eventHours">00</p>
              <p>
                <small>Giờ</small>
              </p>
            </div>
            <div className="time">
              <p className="eventMins">00</p>
              <p>
                <small>Phút</small>
              </p>
            </div>
            <div className="time">
              <p className="eventSecs">00</p>
              <p>
                <small>Giây</small>
              </p>
            </div>
          </div>
          <h4>Sự kiện công nghệ lớn nhất 2021</h4>
          <h6>20 - 25 tháng 12, 2024, Việt Nam</h6>
        </div>
      </div>
      <div className="eventDetail">
        <Row>
          <Col xs={24} md={12} className="eventImg">
            <img
              className="eventImgAni"
              src={itImg}
              alt=""
            />
          </Col>
          <Col xs={24} md={12} className="eventInfo">
            <h5>Sự kiện công nghệ dành cho startup</h5>
            <h6>Nơi gặp gỡ của những tư tưởng lớn</h6>
            <p className="infoText">
              Innovatube Frontier Summit (IFS) là sự kiện đầu tiên tại Việt Nam
              tập trung vào cả bốn mảng tiêu biểu của công nghệ tiên phong, bao
              gồm Artificial Intelligence (trí tuệ nhân tạo), Internet of Things
              (Internet vạn vật), Blockchain (Chuỗi khối) và Augmented
              reality/Virtual Reality (Thực tế tăng cường/Thực tế ảo)
            </p>
            <Button className="globalBtn joinBtn">tham gia</Button>
            <Button className="globalBtn learnBtn">tìm hiểu thêm</Button>
          </Col>
        </Row>
      </div>
      <div className="speecher">
        <h6>Các nhà đồng sáng tạo</h6>
        <Row className="speechDetail" gutter={40}>
            <Col xs={24} md={12} lg={8} xl={6}>
                <div className="speecherCard">
                    <img src={intrutor05} alt="" />
                    <h6>Nguyễn Nhật</h6>
                    <p>CEO TechViet Production</p>
                </div>
            </Col>
            <Col xs={24} md={12} lg={8} xl={6}>
                <div className="speecherCard">
                    <img src={intrutor06} alt="" />
                    <h6>Nguyễn Nhật</h6>
                    <p>CEO TechViet Production</p>
                </div>
            </Col>
            <Col xs={24} md={12} lg={8} xl={6}>
                <div className="speecherCard">
                    <img src={intrutor07} alt="" />
                    <h6>Nguyễn Nam</h6>
                    <p>CEO TechViet Production</p>
                </div>
            </Col>
            <Col xs={24} md={12} lg={8} xl={6}>
                <div className="speecherCard">
                    <img src={intrutor08} alt="" />
                    <h6>Long Le</h6>
                    <p>CEO TechViet Production</p>
                </div>
            </Col>
            <Col xs={24} md={12} lg={8} xl={6}>
                <div className="speecherCard">
                    <img src={intrutor09} alt="" />
                    <h6>Johny Musk</h6>
                    <p>CEO TechViet Production</p>
                </div>
            </Col>
            <Col xs={24} md={12} lg={8} xl={6}>
                <div className="speecherCard">
                    <img src={intrutor10} alt="" />
                    <h6>Vương Phạm</h6>
                    <p>CEO TechViet Production</p>
                </div>
            </Col>
            <Col xs={24} md={12} lg={8} xl={6}>
                <div className="speecherCard">
                    <img src={intrutor11} alt="" />
                    <h6>Jessica Dao</h6>
                    <p>CEO TechViet Production</p>
                </div>
            </Col>
            <Col xs={24} md={12} lg={8} xl={6}>
                <div className="speecherCard">
                    <img src={intrutor12} alt="" />
                    <h6>Mark Pug</h6>
                    <p>CEO TechViet Production</p>
                </div>
            </Col>
        </Row>
      </div>
      <div className="donors">
        <h6>Nhà tài trợ chương trình</h6>
        <Row gutter={40}>
            <Col xs={24} md={12} lg={6}>
                <div className="donorsItem">
                    <img src={meta} alt="" />
                    <p>Facebook</p>
                </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
                <div className="donorsItem">
                    <img src={microsoft} alt="" />
                    <p>Microsoft</p>
                </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
                <div className="donorsItem">
                    <img src={google} alt="" />
                    <p>Google</p>
                </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
                <div className="donorsItem">
                    <img src={amazon} alt="" />
                    <p>Amazon</p>
                </div>
            </Col>
        </Row>
      </div>
    </>
  );
}
