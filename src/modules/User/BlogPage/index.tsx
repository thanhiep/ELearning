import { Link } from "react-router-dom"
import "./style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBullhorn } from "@fortawesome/free-solid-svg-icons"
import { Button, Col, Row } from "antd"
import { faComment, faEye, faThumbsUp } from "@fortawesome/free-regular-svg-icons"

export default function BlogPage() {
  return (
    <div className="blogCourse">
      <div className="pageTitle">
        <h3>Blog</h3>
        <p>Thông tin công nghệ số</p>
      </div>
      <div className="blogCourseContainer">
          <h6>
            <Link to={"/blog"}>
              <FontAwesomeIcon icon={faBullhorn} className="hornIcon"/>
              Phù hợp với bạn
            </Link>
          </h6>
          <Row>
            <Col xs={24} md={16}>
              <div className="blogItemLeft">
                <Row gutter={40}>
                  <Col md={24} lg={12}>
                    <div className="blogCard">
                      <div className="blogCardContent">
                        <div className="blogCardImg">
                          <img src="./../../../../img/blog/blog1.webp" alt="" />
                        </div>
                        <h6>Thời gian và động lực</h6>
                        <div className="blogStatus">
                          <div className="blogReview">
                            <span>
                              <FontAwesomeIcon icon={faThumbsUp}/>
                               300
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faComment}/>
                               500
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faEye}/>
                               800
                            </span>
                          </div>
                          <p>Đăng bởi <span>Johny Dao</span></p>
                        </div>
                        <p className="blogContentText">
                        Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là "timetable". Hay dân dã hơn thì người ta hay gọi là "Lịch thường nhật",...
                        </p>
                        <Button className="globalBtn blogBtn">Xem thêm</Button>
                      </div>
                    </div>
                  </Col>
                  <Col md={24} lg={12}>
                    <div className="blogCard">
                      <div className="blogCardContent">
                        <div className="blogCardImg">
                          <img src="./../../../../img/blog/blog2.jpg" alt="" />
                        </div>
                        <h6>Tailwind CSS và cách cài đặt cơ bản</h6>
                        <div className="blogStatus">
                          <div className="blogReview">
                            <span>
                              <FontAwesomeIcon icon={faThumbsUp}/>
                               300
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faComment}/>
                               500
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faEye}/>
                               800
                            </span>
                          </div>
                          <p>Đăng bởi <span>Johny Dao</span></p>
                        </div>
                        <p className="blogContentText">
                        Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là "timetable". Hay dân dã hơn thì người ta hay gọi là "Lịch thường nhật",...
                        </p>
                        <Button className="globalBtn blogBtn">Xem thêm</Button>
                      </div>
                    </div>
                  </Col>
                  <Col md={24} lg={12}>
                    <div className="blogCard">
                      <div className="blogCardContent">
                        <div className="blogCardImg">
                          <img src="./../../../../img/blog/blog3.jpg" alt="" />
                        </div>
                        <h6>Cấu trúc cơ bản trong HTML</h6>
                        <div className="blogStatus">
                          <div className="blogReview">
                            <span>
                              <FontAwesomeIcon icon={faThumbsUp}/>
                               300
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faComment}/>
                               500
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faEye}/>
                               800
                            </span>
                          </div>
                          <p>Đăng bởi <span>Johny Dao</span></p>
                        </div>
                        <p className="blogContentText">
                        Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là "timetable". Hay dân dã hơn thì người ta hay gọi là "Lịch thường nhật",...
                        </p>
                        <Button className="globalBtn blogBtn">Xem thêm</Button>
                      </div>
                    </div>
                  </Col>
                  <Col md={24} lg={12}>
                    <div className="blogCard">
                      <div className="blogCardContent">
                        <div className="blogCardImg">
                          <img src="./../../../../img/blog/blog4.jpg" alt="" />
                        </div>
                        <h6>Material UI custom theme với TypeScript</h6>
                        <div className="blogStatus">
                          <div className="blogReview">
                            <span>
                              <FontAwesomeIcon icon={faThumbsUp}/>
                               300
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faComment}/>
                               500
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faEye}/>
                               800
                            </span>
                          </div>
                          <p>Đăng bởi <span>Johny Dao</span></p>
                        </div>
                        <p className="blogContentText">
                        Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là "timetable". Hay dân dã hơn thì người ta hay gọi là "Lịch thường nhật",...
                        </p>
                        <Button className="globalBtn blogBtn">Xem thêm</Button>
                      </div>
                    </div>
                  </Col>
                  <Col md={24} lg={12}>
                    <div className="blogCard">
                      <div className="blogCardContent">
                        <div className="blogCardImg">
                          <img src="./../../../../img/blog/blog5.png" alt="" />
                        </div>
                        <h6>Cách tạo một component nhanh chóng</h6>
                        <div className="blogStatus">
                          <div className="blogReview">
                            <span>
                              <FontAwesomeIcon icon={faThumbsUp}/>
                               300
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faComment}/>
                               500
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faEye}/>
                               800
                            </span>
                          </div>
                          <p>Đăng bởi <span>Johny Dao</span></p>
                        </div>
                        <p className="blogContentText">
                        Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là "timetable". Hay dân dã hơn thì người ta hay gọi là "Lịch thường nhật",...
                        </p>
                        <Button className="globalBtn blogBtn">Xem thêm</Button>
                      </div>
                    </div>
                  </Col>
                  <Col md={24} lg={12}>
                    <div className="blogCard">
                      <div className="blogCardContent">
                        <div className="blogCardImg">
                          <img src="./../../../../img/blog/blog6.png" alt="" />
                        </div>
                        <h6>Ant Design cơ bản</h6>
                        <div className="blogStatus">
                          <div className="blogReview">
                            <span>
                              <FontAwesomeIcon icon={faThumbsUp}/>
                               300
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faComment}/>
                               500
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faEye}/>
                               800
                            </span>
                          </div>
                          <p>Đăng bởi <span>Johny Dao</span></p>
                        </div>
                        <p className="blogContentText">
                        Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là "timetable". Hay dân dã hơn thì người ta hay gọi là "Lịch thường nhật",...
                        </p>
                        <Button className="globalBtn blogBtn">Xem thêm</Button>
                      </div>
                    </div>
                  </Col>
                  <Col md={24} lg={12}>
                    <div className="blogCard">
                      <div className="blogCardContent">
                        <div className="blogCardImg">
                          <img src="./../../../../img/blog/blog7.png" alt="" />
                        </div>
                        <h6>Bất đồng bộ trong Javascript</h6>
                        <div className="blogStatus">
                          <div className="blogReview">
                            <span>
                              <FontAwesomeIcon icon={faThumbsUp}/>
                               300
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faComment}/>
                               500
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faEye}/>
                               800
                            </span>
                          </div>
                          <p>Đăng bởi <span>Johny Dao</span></p>
                        </div>
                        <p className="blogContentText">
                        Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là "timetable". Hay dân dã hơn thì người ta hay gọi là "Lịch thường nhật",...
                        </p>
                        <Button className="globalBtn blogBtn">Xem thêm</Button>
                      </div>
                    </div>
                  </Col>
                  <Col md={24} lg={12}>
                    <div className="blogCard">
                      <div className="blogCardContent">
                        <div className="blogCardImg">
                          <img src="./../../../../img/blog/blog8.webp" alt="" />
                        </div>
                        <h6>Typescript là gì và ứng dụng</h6>
                        <div className="blogStatus">
                          <div className="blogReview">
                            <span>
                              <FontAwesomeIcon icon={faThumbsUp}/>
                               300
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faComment}/>
                               500
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faEye}/>
                               800
                            </span>
                          </div>
                          <p>Đăng bởi <span>Johny Dao</span></p>
                        </div>
                        <p className="blogContentText">
                        Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là "timetable". Hay dân dã hơn thì người ta hay gọi là "Lịch thường nhật",...
                        </p>
                        <Button className="globalBtn blogBtn">Xem thêm</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="blogItemRight">
                <div className="blogRightBox">
                  <h6>Các chủ đề được đề xuất</h6>
                  <ul>
                    <li>
                      <Link to={"/blog"}>Front-end / Mobile apps</Link>
                    </li>
                    <li><Link to={"/blog"}>UI / UX / Design</Link></li>
                    <li><Link to={"/blog"}>BACK-END</Link></li>
                    <li><Link to={"/blog"}>Thư viện</Link></li>
                    <li><Link to={"/blog"}>Chia sẻ người trong nghề</Link></li>
                    <li><Link to={"/blog"}>Châm ngôn IT</Link></li>
                    <li><Link to={"/blog"}>Chủ đề khác</Link></li>
                  </ul>
                </div>
                <div className="blogRightBox">
                  <h6>Bài đăng được đề xuất</h6>
                  <div className="blogPost">
                    <h6>Routing trong ReactJs</h6>
                    <p className="blogContentText">
                    Chúng ta sẽ cùng nhau tìm hiểu cách routing trong reactjs...
                    </p>
                    <div className="imgPost">
                      <img src="./../../../../img/instrutor10.jpg" alt="" />
                      <span className="blogContentText">Nguyên Văn</span>
                    </div>
                  </div>
                  <div className="blogPost">
                    <h6>Lập trình hướng đối tượng oop</h6>
                    <p className="blogContentText">
                    Chúng ta sẽ cùng nhau tìm hiểu oop trong reactjs...
                    </p>
                    <div className="imgPost">
                      <img src="./../../../../img/instrutor12.jpg" alt="" />
                      <span className="blogContentText">Vũ Nguyên Văn</span>
                    </div>
                  </div>
                  <div className="blogPost">
                    <h6>Xử Lý Bất Đồng Bộ Trong Javascript</h6>
                    <p className="blogContentText">
                    Chắc chắn khi lập trình, bạn sẽ có các công việc cần thời gian delay (gọi API, lấy dữ liệu từ Database, đọc/ghi file,...). Và đây...
                    </p>
                    <div className="imgPost">
                      <img src="./../../../../img/instrutor11.jpg" alt="" />
                      <span className="blogContentText">Nguyên Minh</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
      </div>
    </div>
  )
}
