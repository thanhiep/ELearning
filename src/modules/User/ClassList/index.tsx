import "./style.css";
import { useEffect, useMemo, useState } from "react";
import BannerClassList from "./Banner";
import { useQuery } from "@tanstack/react-query";
import { getClassListPaginationApi } from "../../../apis/class";
import { Pagination, Row, Skeleton } from "antd";
import { PAGE_SIZE } from "../../../constants";
import Class from "../HomePage/Class";

export default function ClassList() {
  const renderBanner = useMemo(() => <BannerClassList />, []);

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["list-class-pagination", { currentPage }],
    queryFn: () => getClassListPaginationApi(currentPage),
  });

  const renderListClass = () => {
    if (isLoading) return <Skeleton />;
    if (data) {
      return data.items.map((khoa) => {
        return <Class key={khoa.maKhoaHoc} khoa={khoa} />;
      });
    }
  };

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  },[currentPage])

  const totalCount = data?.totalCount || 0;

  return (
    <div>
      {renderBanner}
      <div className="container mx-auto">
        <h2 className="titleClassList">Danh sách khóa học</h2>
        <Row gutter={16}>{renderListClass()}</Row>
      </div>
      <div className="paginationClassList">
        <Pagination
          defaultCurrent={currentPage}
          total={totalCount}
          pageSize={PAGE_SIZE}
          onChange={(page: number) => {
            setCurrentPage(page);
          }}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
