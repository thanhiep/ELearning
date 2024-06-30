import { Col, Row } from "antd";
import CountUp from "react-countup";
import studentImg from "./../../../assets/img/003-students.png"
import hourGlassImg from "./../../../assets/img/002-hourglass.png"
import teacherImg from "./../../../assets/img/004-teacher.png"
import timeImg from "./../../../assets/img/001-timetable.png"

export default function CountUpComponent() {
  return (
    <div className="countUp">
      <div className="container mx-auto">
        <Row>
          <Col xs={24} sm={12} lg={6}>
            <div className="countUpItem">
              <img
                className="countUpImg"
                src={studentImg}
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
                src={timeImg}
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
                src={hourGlassImg}
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
                src={teacherImg}
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
