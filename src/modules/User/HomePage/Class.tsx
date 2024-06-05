import { Link } from "react-router-dom";
import { KhoaHoc } from "../../../types/class.type";
import { Card, Col, Typography } from "antd";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
} from "@fortawesome/free-regular-svg-icons";

type Props = {
  khoa: KhoaHoc;
};

const { Meta } = Card;
const { Text } = Typography;

export default function Class(props: Props) {
  const { khoa } = props;
  return (
    <Col xs={24} sm={12} lg={6}>
      <Link to={`/class-detail/${khoa.maKhoaHoc}`}>
        <Card
          className="mx-auto card-class"
          style={{ width: 240 }}
          cover={
            <img
              className="w-full h-[180px] "
              alt={khoa.biDanh}
              src={khoa.hinhAnh}
            />
          }
        >
          <Meta
            title={<span className="card-title">{khoa.tenKhoaHoc}</span>}
            description={
              <Text ellipsis>
                <span>{khoa.moTa}</span>
              </Text>
            }
          />
          <div className="card-icon">
            <FontAwesomeIcon className="icon text-orange-400" icon={faClock} />
            <span className="icon-text">48 giờ</span>
            <span className="icon-spacing">|</span>
            <FontAwesomeIcon
              className="icon text-red-700"
              icon={faCalendarDays}
            />
            <span className="icon-text">8 tuần</span>
          </div>
        </Card>
      </Link>
    </Col>
  );
}
