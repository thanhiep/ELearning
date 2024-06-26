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

export const registerClassApi = async (payload: {
  maKhoaHoc: string;
  taiKhoan: string;
}) => {
  try {
    const response = await api.post("QuanLyKhoaHoc/DangKyKhoaHoc", payload);
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const cancelClassApi = async (payload: {
  maKhoaHoc: string;
  taiKhoan: string;
}) => {
  try {
    const response = await api.post(`QuanLyKhoaHoc/HuyGhiDanh`, payload);
    return response;
  } catch (error: any) {
    throw Error(error);
  }
};

export const addClassApi = async (course: FormData) => {
  try {
    const response = await api.post(
      `QuanLyKhoaHoc/ThemKhoaHocUploadHinh`,
      course
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const deleteClassApi = async (id: string | number) => {
  try {
    const response = await api.delete(
      `QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${id}`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateClassApi = async (course: FormData) => {
  try {
    const response = await api.post(
      `QuanLyKhoaHoc/CapNhatKhoaHocUpload`,
      course
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const acceptUserApi = async (payload: {
  maKhoaHoc:string, taiKhoan:string
}) =>{
  try {
    const response = await api.post(`QuanLyKhoaHoc/GhiDanhKhoaHoc`,payload)
    return response.data
  } catch (error:any) {
    throw Error(error)
  }
}