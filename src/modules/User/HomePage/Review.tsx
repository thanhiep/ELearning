import { Col, Row } from "antd";

export default function Review() {
  return (
    <div className="review">
        <div className="reviewStudent container mx-auto">
            <Row>
                <Col xs={24} lg={8}>
                    <div className="reviewImg">
                        <div className="bgStudentReview"></div>
                        <img src="img/avatarReview.png" alt="" />
                    </div>
                </Col>
                <Col xs={24} lg={16} className="quoteRight">
                   <blockquote className="textQuote">
                        <q>
                        Chương trình giảng dạy được biên soạn dành riêng cho các bạn Lập trình từ trái ngành hoặc đã có kiến thức theo cường độ cao, luôn được tinh chỉnh và tối ưu hóa theo thời gian bởi các thành viên sáng lập và giảng viên dày kinh nghiệm.Thực sự rất hay và hấp dẫn
                        </q>
                   </blockquote>
                   <p>Nhi Dev</p>
                   <span>Học viên xuất sắc</span>
                </Col>
            </Row>
        </div>
    </div>
  )
}
