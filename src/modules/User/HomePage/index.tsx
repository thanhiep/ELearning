import { useQuery } from "@tanstack/react-query";
import { getClassListApi } from "../../../apis/class";
import { Button, Row, Skeleton } from "antd";
import Class from "./Class";
import Banner from "./Banner";
import Intro from "./Intro";
import CountUpComponent from "./CountUp";
import { Link } from "react-router-dom";
import Teacher from "./Teacher";
import Review from "./Review";

export default function HomePage() {
  const { isLoading, data = [] } = useQuery({
    queryKey: ["class-list"],
    queryFn: getClassListApi,
  });

  const renderClassList = () => {
    if (data) {
      return data.map((khoa, index) => {
        if (index < 8) {
          return <Class key={khoa.maKhoaHoc} khoa={khoa} />;
        }
      });
    }
  };

  if (isLoading) return <Skeleton />;
  return (
    <>
      <div className="container mx-auto">
        <Banner />
        <Intro />
        <h3 className="class-list-title" style={{ paddingBottom: "50px" }}>
          Khóa học phổ biến
        </h3>
        <Row gutter={16} style={{ paddingBottom: "50px" }}>
          {renderClassList()}
        </Row>
        <div className="seeMore">
          <Button className="seeMoreBtn">
            <Link to={"/class-list"}>Xem thêm</Link>
            </Button>
        </div>
      </div>
      <CountUpComponent />
      <Teacher/>
      <Review/>
    </>
  );
}
