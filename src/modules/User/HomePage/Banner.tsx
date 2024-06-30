import { Col, Row, Button } from "antd";
import bannerELearning from "./../../../assets/img/bannerelearning.png"
import plane from "./../../../assets/img/plane.png"
import cloud from "./../../../assets/img/cloud.png"
import codeSlider from "./../../../assets/img/code_slider.png"
import messSlider from "./../../../assets/img/message_slider.png"

export default function Banner() {
  return (
    <Row>
      <Col xs={24} lg={12} className="bannerLeft">
        <div className="textLeft">
          <img
            className="planeSlide"
            src={plane}
            alt="plane"
          />
          <h1>
            Chào mừng
            <br />
            đến với môi trường
          </h1>
          <h2>
            V<span>Learning</span>
          </h2>
          <Button className="bannerBtn">Bắt đầu nào</Button>
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div className="bannerRight">
          <img
            src={bannerELearning}
            alt="banner"
            className="w-full"
          />
          <img
            src={codeSlider}
            alt="code_slider"
            className="sliderSubImg codeSlider"
          />
          <img
            src={messSlider}
            alt="message_slider"
            className="sliderSubImg messSlider"
          />
          <img
            src={cloud}
            alt="cloud"
            className="sliderSubImg cloudSlider"
          />
          <img
            src={cloud}
            alt="cloud"
            className="sliderSubImg cloudSlider2"
          />
          <img
            src={cloud}
            alt="cloud"
            className="sliderSubImg cloudSlider3"
          />
        </div>
      </Col>
    </Row>
  );
}
