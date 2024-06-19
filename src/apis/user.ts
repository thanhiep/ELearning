import { ThongTinTaiKhoan, User } from "../types/user.type";
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
