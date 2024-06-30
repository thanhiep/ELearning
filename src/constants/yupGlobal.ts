import * as yup from "yup";
import { ALPHA_NUMBER_REGEX, EMAIL_REGEX, PHONE_REGEX, VIETNAMESE_REGEX } from ".";

export const SCHEMA_USER_FORM = yup.object({
    hoTen: yup
      .string()
      .trim()
      .required("(*) Vui lòng nhập họ tên")
      .matches(VIETNAMESE_REGEX, "(*) Họ tên chỉ được nhập chữ")
      .min(6, "(*) Họ tên quá ngắn"),
    taiKhoan: yup
      .string()
      .required("(*) Vui lòng nhập tài khoản")
      .matches(ALPHA_NUMBER_REGEX, "(*) Tài khoản không được chứa ký tự đặc biệt")
      .min(4, "(*) Tài khoản quá ngắn"),
    matKhau: yup
      .string()
      .required("(*) Vui lòng nhập mật khẩu")
      .min(8, "(*) Mật khẩu quá ngắn")
      .max(32, "(*) Mật khẩu chỉ được tối đa 32 ký tự"),
    email: yup
      .string()
      .required("(*) Vui lòng nhập email")
      .matches(EMAIL_REGEX, "(*) Email không đúng định dạng"),
    soDT: yup
      .string()
      .required("(*) Vui lòng nhập số điện thoại")
      .matches(PHONE_REGEX, "(*) Số điện thoại không đúng định dạng"),
    maNhom: yup.string().required("(*) Vui lòng chọn nhóm"),
    maLoaiNguoiDung: yup.string().required("(*) Vui lòng chọn loại người dùng"),
  });