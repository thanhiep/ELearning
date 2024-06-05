import { DanhMuc, KhoaHoc } from "../types/class.type";
import api from "./apiUtil";

export const getClassListApi = async () => {
  try {
    const response = await api.get<KhoaHoc[]>(
      `QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getDanhMuc = async () => {
  try {
    const response = await api.get<DanhMuc[]>(
      `QuanLyKhoaHoc/LayDanhMucKhoaHoc`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};
