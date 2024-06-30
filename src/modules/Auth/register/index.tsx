import { Typography, Form, Row, Col, Input, Button, Modal, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../../apis/user";
import { Controller, useForm } from "react-hook-form";
import "./../style.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {
  ALPHA_NUMBER_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX,
  VIETNAMESE_REGEX,
} from "../../../constants";

const schema = yup.object({
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
  maNhom: yup.string(),
});

export default function RegisterPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegisterFail, setIsRegisterFail] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "GP01",
    },
    mode: `onChange`,
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const { mutate: handleRegister, isPending } = useMutation({
    mutationFn: (payload: any) => registerApi(payload),
    onSuccess: () => {
      setIsModalVisible(true);
    },
    onError: (error) => {
      console.log("onError", error);
      setIsRegisterFail(true)
    },
  });

  const onSubmit = (formValues: any) => {
    handleRegister(formValues);
  };

  const handleTryAgain = () => {
    setIsRegisterFail(false);
  };

  return (
    <div className="authForm">
      <div className="w-[400px]">
        <div className="my-4 text-center">
          <Typography className="font-bold text-4xl">Tạo tài khoản</Typography>
          <Typography className="mt-2 text-lg">
            Chào mừng bạn đến với môi trường V-Learning 👋
          </Typography>
        </div>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[48, 16]}>
            <Col span={24}>
              <label className="text-lg text-[#6A7280]">Họ tên</label>
              <Controller
                name="hoTen"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="text"
                      size="large"
                      className="mt-1"
                      placeholder="Vui lòng nhập họ tên..."
                      {...field}
                    />
                    {errors.hoTen && (
                      <span className="errorMess">{errors.hoTen.message}</span>
                    )}
                  </>
                )}
              />
            </Col>
            <Col span={24}>
              <label className="text-lg text-[#6A7280]">Tài khoản</label>
              <Controller
                name="taiKhoan"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="text"
                      size="large"
                      className="mt-1"
                      placeholder="Vui lòng nhập tài khoản..."
                      {...field}
                    />
                    {errors.taiKhoan && (
                      <span className="errorMess">
                        {errors.taiKhoan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Col>
            <Col span={24}>
              <label className="text-lg text-[#6A7280]">Mật khẩu</label>
              <Controller
                name="matKhau"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="password"
                      size="large"
                      className="mt-1"
                      placeholder="Vui lòng nhập mật khẩu..."
                      {...field}
                    />
                    {errors.matKhau && (
                      <span className="errorMess">
                        {errors.matKhau.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Col>
            <Col span={24}>
              <label className="text-lg text-[#6A7280]">Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="text"
                      size="large"
                      className="mt-1"
                      placeholder="Vui lòng nhập email..."
                      {...field}
                    />
                    {errors.email && (
                      <span className="errorMess">{errors.email.message}</span>
                    )}
                  </>
                )}
              />
            </Col>
            <Col span={16}>
              <label className="text-lg text-[#6A7280]">Số điện thoại</label>
              <Controller
                name="soDT"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      type="text"
                      size="large"
                      className="mt-1"
                      placeholder="Vui lòng nhập số điện thoại..."
                      {...field}
                    />
                    {errors.soDT && (
                      <span className="errorMess">{errors.soDT.message}</span>
                    )}
                  </>
                )}
              />
            </Col>
            <Col span={8}>
              <label className="text-lg text-[#6A7280]">Mã nhóm</label>
              <Controller
                name="maNhom"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      size="large"
                      defaultValue="GP01"
                      className="mt-1"
                      style={{ width: 100, display: "block" }}
                      options={[
                        { value: "GP01", label: "GP01" },
                        { value: "GP02", label: "GP02" },
                        { value: "GP03", label: "GP03" },
                        { value: "GP04", label: "GP04" },
                        { value: "GP05", label: "GP05" },
                        { value: "GP06", label: "GP06" },
                        { value: "GP07", label: "GP07" },
                        { value: "GP08", label: "GP08" },
                        { value: "GP09", label: "GP09" },
                        { value: "GP10", label: "GP10" },
                      ]}
                    />
                  </>
                )}
              />
            </Col>
            <Col span={24}>
              <Button
                loading={isPending}
                disabled={isPending}
                className="authSubmit mt-4"
                htmlType="submit"
                size="large"
                block
              >
                Tạo tài khoản
              </Button>
            </Col>
          </Row>
        </Form>

        <Typography className="mt-8 text-center">
          Đã có tài khoản?
          <Link to={"/auth/login"}>
            <span className="text-blue-700 font-medium cursor-pointer">
              Đăng nhập
            </span>
          </Link>
        </Typography>
        <Typography className="mt-4" style={{ textAlign: "center" }}>
          <Link to={"/"} className="text-blue-700 font-medium">
            Về trang chủ
          </Link>
        </Typography>
      </div>

      <Modal
        title="Tạo tài khoản thành công"
        open={isModalVisible}
        footer={null}
        className="authModal registerModal"
        closable={false}
        centered
      >
        <img src="src/assets/img/successIcon.png" alt="" />
        <p>Bạn đã tạo tài khoản thành công, vui lòng đăng nhập.</p>
        <Button
          className="tryAgainBtn mt-5"
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          Đăng nhập
        </Button>
      </Modal>

      <Modal
        title="Tạo tài khoản không thành công"
        open={isRegisterFail}
        footer={null}
        className="authModal  loginModal"
        closable={false}
        centered
      >
        <img src="src/assets/img/login-fail-icon.png" alt="" />
        <p>Tài khoản hoặc email đã tồn tại, vui lòng thử lại.</p>
        <Button
          className="tryAgainBtn mt-5"
          onClick={handleTryAgain}
        >
          Thử lại
        </Button>
      </Modal>
    </div>
  );
}
