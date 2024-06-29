import { Typography, Form, Row, Col, Input, Button, Modal } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../../apis/user";
import { setCurrentUser } from "../../../redux/slices/user.slice";
import { Controller, useForm } from "react-hook-form";
import "./../style.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = yup.object({
  taiKhoan: yup.string().required("(*) Vui lòng nhập tài khoản"),
  matKhau: yup.string().required("(*) Vui lòng nhập mật khẩu"),
});

export default function LoginPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (payload: any) => loginApi(payload),
    onSuccess: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setCurrentUser(user));
    },
    onError: (error) => {
      console.log("onError", error);
      setIsModalVisible(true)
    },
  });

  const onSubmit = (formValues: any) => {
    handleLogin(formValues);
  };

  const handleTryAgain = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="authForm">
      <div className="w-[400px]">
        <div className="my-4 text-center">
          <Typography className="font-bold text-4xl">Đăng nhập</Typography>
          <Typography className="mt-2 text-lg">
            Xin chào, chào mừng bạn quay lại 👋
          </Typography>
        </div>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[48, 16]}>
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
              <Button
                loading={isPending}
                disabled={isPending}
                className="authSubmit mt-4"
                htmlType="submit"
                size="large"
                block
              >
                Đăng nhập
              </Button>
            </Col>
          </Row>
        </Form>

        <Typography className="mt-8 text-center">
          Chưa có tài khoản?
          <Link to={"/auth/register"}>
            <span className="text-blue-700 font-medium cursor-pointer">
              Tạo tài khoản
            </span>
          </Link>
        </Typography>
        <Typography className="mt-4" style={{textAlign:"center"}}>
            <Link to={"/"} className="text-blue-700 font-medium">Về trang chủ</Link>
        </Typography>
      </div>

      <Modal
        title="Đăng nhập không thành công"
        open={isModalVisible}
        footer={null}
        className="loginModal authModal"
        closable={false}
        centered
      >
        <img src="./../../../../img/login-fail-icon.png" alt="" />
        <p>Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại.</p>
        <Button className="tryAgainBtn mt-5" onClick={handleTryAgain}>Thử lại</Button>
      </Modal>
    </div>
  );
}
