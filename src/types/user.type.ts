export interface User {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
}

export interface ThongTinTaiKhoan {
  chiTietKhoaHocGhiDanh: ChiTietKhoaHocGhiDanh[];
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

export interface ChiTietKhoaHocGhiDanh {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  ngayTao: Date;
  danhGia: number;
}

export interface UserPagination {
  currentPage: number;
  count:       number;
  totalPages:  number;
  totalCount:  number;
  items:       UserInfo[];
}

export interface UserInfo {
  taiKhoan:         string;
  hoTen:            string;
  soDT:             string;
  maNhom:           null;
  email:            string;
  maLoaiNguoiDung:  MaLoaiNguoiDung;
  tenLoaiNguoiDung: string;
}

export enum MaLoaiNguoiDung {
  GV = "GV",
  Hv = "HV",
}

export type UserAdd = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
  maLoaiNguoiDung: string;
}