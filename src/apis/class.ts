import { PAGE_SIZE } from "../constants";
import { DanhMuc, KhoaHoc, KhoaHocPagination } from "../types/class.type";
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

export const getClassListPaginationApi = async (currentPage: number) => {
  try {
    const response = await api.get<KhoaHocPagination>(
      `QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${currentPage}&pageSize=${PAGE_SIZE}&MaNhom=GP01`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getKhoaHocDanhMucApi = async (
  maDanhMucKhoahoc: string | undefined
) => {
  try {
    const response = await api.get<KhoaHoc[]>(
      `QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMucKhoahoc}&MaNhom=GP01`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getClassDetailApi = async (id: number | string | undefined) => {
  try {
    const response = await api.get<KhoaHoc>(
      `QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};
