import "./style.css";
import { useEffect, useMemo, useState } from "react";
import BannerClassList from "./Banner";
import { useQuery } from "@tanstack/react-query";
import {
  getClassListApi,
  getClassListPaginationApi,
} from "../../../apis/class";
import { Input, Pagination, Row, Skeleton } from "antd";
import { PAGE_SIZE } from "../../../constants";
import Class from "../HomePage/Class";
import { SearchOutlined } from "@ant-design/icons";

export default function ClassList() {
  const renderBanner = useMemo(() => <BannerClassList />, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["list-class-pagination", { currentPage }],
    queryFn: () => getClassListPaginationApi(currentPage),
  });

  const { data: courseList } = useQuery({
    queryKey: ["class-list"],
    queryFn: getClassListApi,
  });

  const dataSearch = courseList?.filter((course) => {
    return (
      course.tenKhoaHoc.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );
  });
  const totalCountSearch = dataSearch?.length;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = dataSearch?.slice(startIndex, endIndex);

  const totalCount = data?.totalCount || 0;

  const renderListClass = () => {
    if (isLoading) return <Skeleton />;
    if (data && searchValue === "") {
      return data.items.map((khoa) => {
        return <Class key={khoa.maKhoaHoc} khoa={khoa} />;
      });
    }
    if (data && searchValue !== "") {
      return paginatedData?.map((khoa) => {
        return <Class key={khoa.maKhoaHoc} khoa={khoa} />;
      });
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const handleSearchChange = (e: any) => {
    const { value } = e.target;
    setSearchValue(value);
    setCurrentPage(1);
  };

  return (
    <div>
      {renderBanner}

      <div className="container mx-auto">
        <h2 className="titleClassList">Danh sách khóa học</h2>
        <div className="searchInput">
          <Input
            placeholder="Nhập tên khóa học để tìm kiếm..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <Row gutter={16}>{renderListClass()}</Row>
      </div>
      <div className="paginationClassList">
        <Pagination
          defaultCurrent={currentPage}
          total={searchValue !== "" ? totalCountSearch : totalCount}
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
