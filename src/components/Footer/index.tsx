import { Button, Col, Row } from "antd";
import "./style.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footerBody container mx-auto">
        <Row className="footerContent">
          <Col xs={24} sm={12} lg={8}>
            <Link to={"/"} className="textLogo">
              <span className="textV">V</span>
              learning
              <FontAwesomeIcon icon={faKeyboard} className="iconLogo" />
            </Link>
            <ul className="footerContact menuFooter">
              <li>
                <FontAwesomeIcon icon={faPhone} className="iconFooter" />
                <span>090 777 888</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="iconFooter" />
                <span>cyberelearning@gmail.com</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faLocationDot} className="iconFooter" />
                <span>120 Điện Biên Phủ, Quận 01, TP.HCM</span>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <h3 className="textFooterTitle">Liên kết</h3>
            <ul className="menuFooter">
              <li>
                <FontAwesomeIcon icon={faAngleRight} />
                <span>Trang chủ</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faAngleRight} />
                <span>Sự kiện</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faAngleRight} />
                <span>Thông tin</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faAngleRight} />
                <span>Blog</span>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <h3 className="textFooterTitle">Khóa học</h3>
            <ul className="menuFooter">
              <li>
                <FontAwesomeIcon icon={faAngleRight} />
                <span>Front End</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faAngleRight} />
                <span>Back End</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faAngleRight} />
                <span>Full Stack</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faAngleRight} />
                <span>Mobie App</span>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <h3 className="textFooterTitle">Đăng ký tư vấn</h3>
            <form>
              <input
                className="formFooter"
                type="text"
                placeholder="Họ và tên"
              />
              <input className="formFooter" type="text" placeholder="Email" />
              <input
                className="formFooter"
                type="text"
                placeholder="Số điện thoại"
              />
            </form>
            <Button className="footerFormBtn">Đăng ký</Button>
          </Col>
        </Row>
      </div>
      <div className="extraFooter">
        <div className="container mx-auto">
          <div className="extraFooterContent">
            <div className="copyright">
              <p>Copyright © 2024. All rights reserved.</p>
            </div>
            <div>
              <span className="iconSocial">
                <FontAwesomeIcon icon={faFacebookF} />
              </span>
              <span className="iconSocial">
              <FontAwesomeIcon icon={faInstagram} />
              </span>
              <span className="iconSocial">
                <FontAwesomeIcon icon={faYoutube}  />
              </span>
              <span className="iconSocial">
              <FontAwesomeIcon icon={faTwitter} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
