import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";

export default function Teacher() {
  return (
    <div className="px-8 teacher">
        <h1 className="teacherTitle">Giảng viên hàng đầu</h1>
        <div className="teacherItem">
            <Row>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <div className="teacherContent">
                        <img src="./../../../public/img/instrutor5.jpg" alt="" />
                        <h6>Big DadMon</h6>
                        <div className="textReviewRole">
                            <p>Chuyên gia lĩnh vực</p>
                            <p>lập trình</p>
                        </div>
                        <p className="reviewMentor">
                        <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <span className="textStar">4.9</span>
                             </p>
                             <span className="textReviewBot">100 đánh giá</span>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <div className="teacherContent">
                        <img src="./../../../public/img/instrutor6.jpg" alt="" />
                        <h6>Big DadMon</h6>
                        <div className="textReviewRole">
                            <p>Chuyên gia ngôn ngữ</p>
                            <p>VueJs</p>
                        </div>
                        <p className="reviewMentor">
                        <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <span className="textStar">4.9</span>
                             </p>
                             <span className="textReviewBot">100 đánh giá</span>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <div className="teacherContent">
                        <img src="./../../../public/img/instrutor7.jpg" alt="" />
                        <h6>Big DadMon</h6>
                        <div className="textReviewRole">
                            <p>Chuyên gia hệ thống</p>
                            <p>máy tính</p>
                        </div>
                        <p className="reviewMentor">
                        <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <span className="textStar">4.9</span>
                             </p>
                             <span className="textReviewBot">100 đánh giá</span>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <div className="teacherContent">
                        <img src="./../../../public/img/instrutor8.jpg" alt="" />
                        <h6>Big DadMon</h6>
                        <div className="textReviewRole">
                            <p>Chuyên gia lĩnh vực</p>
                            <p>Full Skill</p>
                        </div>
                        <p className="reviewMentor">
                        <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <span className="textStar">4.9</span>
                             </p>
                             <span className="textReviewBot">100 đánh giá</span>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <div className="teacherContent">
                        <img src="./../../../public/img/instrutor9.jpg" alt="" />
                        <h6>Big DadMon</h6>
                        <div className="textReviewRole">
                            <p>Chuyên gia lĩnh vực</p>
                            <p>phân tích</p>
                        </div>
                        <p className="reviewMentor">
                        <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <span className="textStar">4.9</span>
                             </p>
                             <span className="textReviewBot">100 đánh giá</span>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <div className="teacherContent">
                        <img src="./../../../public/img/instrutor10.jpg" alt="" />
                        <h6>Big DadMon</h6>
                        <div className="textReviewRole">
                            <p>Chuyên gia lĩnh vực</p>
                            <p>PHP</p>
                        </div>
                        <p className="reviewMentor">
                        <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <span className="textStar">4.9</span>
                             </p>
                             <span className="textReviewBot">100 đánh giá</span>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
  )
}
