import { PAGE_SIZE } from "../constants";
import {
  ThongTinTaiKhoan,
  User,
  UserAdd,
  UserPagination,
  UserSearch,
} from "../types/user.type";
import api from "./apiUtil";

export const loginApi = async (payload: {
  taiKhoan: string;
  matKhau: string;
}) => {
  try {
    const response = await api.post(`/QuanLyNguoiDung/DangNhap`, payload);
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const registerApi = async (user: User) => {
  try {
    const response = await api.post(`/QuanLyNguoiDung/DangKy`, user);
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getUserProfileApi = async () => {
  try {
    const response = await api.post<ThongTinTaiKhoan>(
      `/QuanLyNguoiDung/ThongTinTaiKhoan`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getUserWaitToApplyApi = async (payload: { maKhoaHoc: string }) => {
  try {
    const response = await api.post(
      `/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getUserApplyApi = async (payload: { maKhoaHoc: string }) => {
  try {
    const response = await api.post(
      `/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getUserListPaginationApi = async (currentPage: number) => {
  try {
    const response = await api.get<UserPagination>(
      `QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP01&page=${currentPage}&pageSize=${PAGE_SIZE}`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const addUserApi = async (user: UserAdd) => {
  try {
    const response = await api.post(`QuanLyNguoiDung/ThemNguoiDung`, user);
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const deleteUserApi = async (taiKhoan: string) => {
  try {
    const response = await api.delete(
      `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateUserApi = async (user: UserAdd) => {
  try {
    const response = await api.put(
      `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      user
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getCourseWaitToAccept = async (payload: { taiKhoan: string }) => {
  try {
    const response = await api.post(
      `QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getCourseAccept = async (payload: { taiKhoan: string }) => {
  try {
    const response = await api.post(
      `QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getUserListApi = async () => {
  try {
    const response = await api.get<UserSearch[]>(
      `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};
