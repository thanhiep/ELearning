import { Col, Row, Button } from "antd";

export default function Banner() {
  return (
    <Row>
      <Col xs={24} lg={12} className="bannerLeft">
        <div className="textLeft">
          <img
            className="planeSlide"
            src="src/assets/img/plane.png"
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
            src="src/assets/img/bannerelearning.png"
            alt="banner"
            className="w-full"
          />
          <img
            src="src/assets/img/code_slider.png"
            alt="code_slider"
            className="sliderSubImg codeSlider"
          />
          <img
            src="src/assets/img/message_slider.png"
            alt="message_slider"
            className="sliderSubImg messSlider"
          />
          <img
            src="src/assets/img/cloud.png"
            alt="cloud"
            className="sliderSubImg cloudSlider"
          />
          <img
            src="src/assets/img/cloud.png"
            alt="cloud"
            className="sliderSubImg cloudSlider2"
          />
          <img
            src="src/assets/img/cloud.png"
            alt="cloud"
            className="sliderSubImg cloudSlider3"
          />
        </div>
      </Col>
    </Row>
  );
}
