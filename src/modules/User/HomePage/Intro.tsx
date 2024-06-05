import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Intro() {
  return (
    <div className="introHome">
      <div className="intro">
        <div className="introItem introLargeItem">
          <div className="introContent">
            <h3>khóa học</h3>
            <p>
              <span>Học qua dự án thực tế</span>, học đi đôi với hành, không lý
              thuyết lan man, phân tích cội nguồn của vấn đề, xây dựng từ các ví
              dụ nhỏ đến thực thi một dự án lớn ngoài thực tế để học viên học
              xong làm được ngay
            </p>
            <ul>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>Hơn 1000 bài tập và dự án thực tế</span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>Công nghệ cập nhật mới nhất</span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>Hình ảnh, ví dụ, bài giảng sinh động trực quan</span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>Tư duy phân tích, giải quyết vấn đề trong dự án</span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>
                  Học tập kinh nghiệm, qui trình làm dự án, các qui chuẩn trong
                  dự án
                </span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>
                  Cơ hội thực tập tại các công ty lớn như FPT, Microsoft
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="introItem introSmallItemA">
          <div className="introContent">
            <h3>lộ trình phù hợp</h3>
            <ul>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>
                  Lộ trình bài bản từ zero tới chuyên nghiệp, nâng cao
                </span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>Học, luyện tập code, kỹ thuật phân tích, soft skill</span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>
                  Huấn luyện để phát triển năng lực và niềm đam mê lập trình
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="introItem introSmallItemB">
          <div className="introContent">
            <h3>HỆ THỐNG HỌC TẬP</h3>
            <ul>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>
                  Tự động chấm điểm trắc nghiệm và đưa câu hỏi tùy theo mức độ
                  học viên
                </span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>
                  Thống kê lượt xem video, làm bài, điểm số theo chu kỳ
                </span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>
                  Thống kê, so sánh khả năng học của các học viên cùng level để
                  đưa ra mục tiêu học tập
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="introItem introSmallItemA">
          <div className="introContent">
            <h3>GIẢNG VIÊN</h3>
            <ul>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>
                  Tương tác cùng mentor và giảng viên qua phần thảo luận
                </span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>Review code và đưa ra các nhận xét góp ý</span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>Chấm điểm tương tác thảo luận giữa các học viên</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="introItem introSmallItemC">
          <div className="introContent">
            <h3>CHỨNG NHẬN</h3>
            <ul>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>Chấm bài và có thể vấn đáp trực tuyến để review</span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>
                  Hệ thống của chúng tôi cũng tạo ra cho bạn một CV trực tuyến
                  độc đáo
                </span>
              </li>
              <li>
                <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
                <span>
                  Kết nối CV của bạn đến với các đối tác của V learning
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
