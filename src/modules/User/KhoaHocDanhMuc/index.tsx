import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDanhMuc, getKhoaHocDanhMucApi } from "../../../apis/class";
import Class from "../HomePage/Class";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer } from "@fortawesome/free-solid-svg-icons";
import "./style.css"
import { Row, Skeleton } from "antd";
import { useEffect } from "react";

export default function KhoaHocDanhMuc() {
  const { id } = useParams();

  const { data: khoaHocData, isLoading: isKhoaHocLoading } = useQuery({
    queryKey: [`khoa-hoc-danh-muc`, id],
    queryFn: () => getKhoaHocDanhMucApi(id),
  });

  const { data: danhMucData, isLoading: isDanhMucLoading } = useQuery({
    queryKey: [`danh-muc-khoa-hoc`],
    queryFn: () => getDanhMuc(),
  });

  const renderKhoaHocDanhMuc = () => {
    if (khoaHocData) {
      return khoaHocData.map((khoa) => (
        <Class key={khoa.maKhoaHoc} khoa={khoa} />
      ));
    }
  };

  const renderTenDanhMuc = () => {
    if (danhMucData) {
     return danhMucData.map((danhMuc) => {
        if (danhMuc.maDanhMuc === id) {
          return (
            <div className="courseTitle" key={danhMuc.maDanhMuc}>
              <h5>
                <FontAwesomeIcon icon={faComputer} />
                <span>{danhMuc.tenDanhMuc}</span>
              </h5>
            </div>
          );
        }
      });
    }
  };

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  },[id])

  if(isDanhMucLoading || isKhoaHocLoading) return <Skeleton/>

  return (
    <div className="khoaHocDanhMuc">
      <div className="pageTitle">
        <h3>Khóa học theo danh mục</h3>
        <p>Hãy chọn khóa học mong muốn!!!</p>
      </div>
      {renderTenDanhMuc()}
      <div className="container mx-auto">
        <Row gutter={16}>
          {renderKhoaHocDanhMuc()}
        </Row>
      </div>
    </div>
  );
}
