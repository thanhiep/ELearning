import { Col, Row } from "antd";
import CountUp from "react-countup";

export default function CountUpComponent() {
  return (
    <div className="countUp">
      <div className="container mx-auto">
        <Row>
          <Col xs={24} sm={12} lg={6}>
            <div className="countUpItem">
              <img
                className="countUpImg"
                src="./../../../public/img/003-students.png"
                alt=""
              />
              <div className="countUpText">
                <span>
                  {" "}
                  <CountUp end={9000} duration={3} enableScrollSpy />
                </span>
                <p className="countUpTextTitle">Học viên</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="countUpItem">
              <img
                className="countUpImg"
                src="./../../../public/img/001-timetable.png"
                alt=""
              />
              <div className="countUpText">
                <span>
                  {" "}
                  <CountUp end={1000} duration={4} enableScrollSpy />
                </span>
                <p className="countUpTextTitle">Khóa học</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="countUpItem">
              <img
                className="countUpImg"
                src="./../../../public/img/002-hourglass.png"
                alt=""
              />
              <div className="countUpText">
                <span>
                  {" "}
                  <CountUp end={33200} duration={2} enableScrollSpy />
                </span>
                <p className="countUpTextTitle">Giờ học</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="countUpItem">
              <img
                className="countUpImg"
                src="./../../../public/img/004-teacher.png"
                alt=""
              />
              <div className="countUpText">
                <span>
                  {" "}
                  <CountUp end={400} duration={5} enableScrollSpy />
                </span>
                <p className="countUpTextTitle">Giảng viên</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
