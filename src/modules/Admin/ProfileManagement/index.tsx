import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Row, Col, Form, Input, Select, Button, Modal, Skeleton } from "antd";
import { getUserProfileApi, updateUserApi } from "../../../apis/user";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserAdd } from "../../../types/user.type";
import { useState } from "react";
import * as yup from "yup";
import { EMAIL_REGEX, PHONE_REGEX, VIETNAMESE_REGEX } from "../../../constants";
import { FormOutlined, RollbackOutlined } from "@ant-design/icons";

const schema = yup.object({
  hoTen: yup
    .string()
    .trim()
    .required("(*) Vui lòng nhập họ tên")
    .matches(VIETNAMESE_REGEX, "(*) Họ tên chỉ được nhập chữ")
    .min(6, "(*) Họ tên quá ngắn"),
  taiKhoan: yup.string(),

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
  maLoaiNguoiDung: yup.string(),
});

export default function ProfileManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserProfileApi(),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maLoaiNguoiDung: "",
      maNhom: "GP01",
      email: "",
    },
    mode: `onChange`,
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const { mutate: handleUpdateUser, isPending } = useMutation({
    mutationFn: (user: UserAdd) => {
      return updateUserApi(user);
    },
    onSuccess: () => {
      setIsModalOpen(true);
      setIsEdit(false);
      queryClient.refetchQueries({
        queryKey: ["profile"],
        type: "active",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (formValues: any) => {
    formValues.taiKhoan = data?.taiKhoan;
    formValues.maLoaiNguoiDung = data?.maLoaiNguoiDung;
    handleUpdateUser(formValues);
  };

  if (data && !isEdit) {
    setValue("taiKhoan", data.taiKhoan);
    setValue("matKhau", data.matKhau);
    setValue("hoTen", data.hoTen);
    setValue("soDT", data.soDT);
    setValue("maLoaiNguoiDung", data.maLoaiNguoiDung);
    setValue("maNhom", data.maNhom);
    setValue("email", data.email);
  }

  if(isLoading) return <Skeleton/>

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: "Trang chủ",
            path: "/admin",
          },
          {
            title: "Cài đặt tài khoản",
          },
        ]}
      />
      <div className="container mx-auto mt-6">
        {data && (
          <Row gutter={40}>
            <Col xs={24} md={8}>
              <div className="profileContent">
                <h3>Thông tin tài khoản</h3>
                <img src="./../../../../img/avartarIcon.jpg" alt="avartar" />
                <div className="profileTextBox">
                  <div className="profileText">
                    <p>
                      <span>Họ tên: </span> {data.hoTen}
                    </p>
                    <p>
                      <span>Tài khoản: </span> {data.taiKhoan}
                    </p>
                    <p>
                      <span>Email: </span> {data.email}
                    </p>
                    <p>
                      <span>Điện thoại: </span> {data.soDT}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={16}>
              <div className="profileContent">
                <h3>Chỉnh sửa thông tin</h3>
                <div className="flex justify-center">
                <Button style={isEdit ? {display:"none"} : {display:"inline-block",fontSize:"20px", lineHeight:"20px",height:"50px"}} type="default" onClick={()=>{setIsEdit(true)}}><FormOutlined /></Button>
                </div>
                <div className="flex justify-center">
                <Button style={isEdit ? {display:"inline-block",fontSize:"20px", lineHeight:"20px",height:"50px"} : {display:"none"}} danger onClick={()=>{setIsEdit(false)}}><RollbackOutlined /></Button>
                </div>
               
               
                <div className="profileCourse">
                  <Row gutter={40}>
                    <Form
                      className="mt-4 w-[500px] mx-auto"
                      onFinish={handleSubmit(onSubmit)}
                    >
                      <Row gutter={[18, 18]}>
                        <Col span={24}>
                          <label className="text-sm" htmlFor="">
                            Tài khoản
                          </label>
                          <Controller
                            disabled
                            name="taiKhoan"
                            control={control}
                            render={({ field }) => (
                              <>
                                <Input
                                  size="large"
                                  className="mt-1"
                                  placeholder="Tài khoản"
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
                          <label className="text-sm" htmlFor="">
                            Họ tên
                          </label>
                          <Controller
                          disabled={!isEdit}
                            name="hoTen"
                            control={control}
                            render={({ field }) => {
                              return (
                                <>
                                  <Input
                                    size="large"
                                    type="text"
                                    className="mt-1"
                                    placeholder="Họ tên"
                                    {...field}
                                  />
                                  {errors.hoTen && (
                                    <span className="errorMess">
                                      {errors.hoTen.message}
                                    </span>
                                  )}
                                </>
                              );
                            }}
                          />
                        </Col>
                        <Col span={24}>
                          <label className="text-sm" htmlFor="">
                            Mật khẩu
                          </label>
                          <Controller
                          disabled={!isEdit}
                            name="matKhau"
                            control={control}
                            render={({ field }) => {
                              return (
                                <>
                                  <Input
                                    size="large"
                                    className="mt-1"
                                    type="password"
                                    placeholder="Mật khẩu"
                                    {...field}
                                  />
                                  {errors.matKhau && (
                                    <span className="errorMess">
                                      {errors.matKhau.message}
                                    </span>
                                  )}
                                </>
                              );
                            }}
                          />
                        </Col>
                        <Col span={12}>
                          <label className="text-sm" htmlFor="">
                            Điện thoại
                          </label>
                          <Controller
                          disabled={!isEdit}
                            name="soDT"
                            control={control}
                            render={({ field }) => {
                              return (
                                <>
                                  <Input
                                    size="large"
                                    className="mt-1"
                                    placeholder="090xxxxxxx"
                                    {...field}
                                  />
                                  {errors.soDT && (
                                    <span className="errorMess">
                                      {errors.soDT.message}
                                    </span>
                                  )}
                                </>
                              );
                            }}
                          />
                        </Col>
                        <Col span={12}>
                          <label className="text-sm" htmlFor="">
                            Email
                          </label>
                          <Controller
                          disabled={!isEdit}
                            name="email"
                            control={control}
                            render={({ field }) => {
                              return (
                                <>
                                  <Input
                                    size="large"
                                    className="mt-1"
                                    placeholder="example@gmail.com"
                                    {...field}
                                  />
                                  {errors.email && (
                                    <span className="errorMess">
                                      {errors.email.message}
                                    </span>
                                  )}
                                </>
                              );
                            }}
                          />
                        </Col>

                        <Col span={12}>
                          <label className="text-sm" htmlFor="">
                            Mã nhóm
                          </label>
                          <Controller
                          disabled={!isEdit}
                            name="maNhom"
                            control={control}
                            render={({ field }) => (
                              <>
                                <Select
                                  {...field}
                                  size="large"
                                  className="mt-1"
                                  style={{ display: "block" }}
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
                                {errors.maNhom && (
                                  <span className="errorMess">
                                    {errors.maNhom.message}
                                  </span>
                                )}
                              </>
                            )}
                          />
                        </Col>
                        <Col span={12}>
                          <label className="text-sm" htmlFor="">
                            Loại người dùng
                          </label>
                          <Controller
                            disabled
                            name="maLoaiNguoiDung"
                            control={control}
                            render={({ field }) => (
                              <>
                                <Select
                                  {...field}
                                  size="large"
                                  defaultValue={""}
                                  className="mt-1"
                                  style={{ display: "block" }}
                                  options={[
                                    { value: "GV", label: "Giáo vụ" },
                                    { value: "HV", label: "Học viên" },
                                  ]}
                                />
                                {errors.maLoaiNguoiDung && (
                                  <span className="errorMess">
                                    {errors.maLoaiNguoiDung.message}
                                  </span>
                                )}
                              </>
                            )}
                          />
                        </Col>
                        <Col span={24} className="text-end mt-5">
                          <Button htmlType="submit" size="large" type="primary" disabled={!isEdit || isPending}>
                            Cập nhật
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>

      <Modal
        title="Cập nhật thành công"
        open={isModalOpen}
        footer={null}
        className="authModal registerModal"
        closable={false}
        centered
      >
        <img src="src/assets/img/successIcon.png" alt="" />
        <p>Cập nhật thông tin cá nhân thành công.</p>
        <Button
          className="tryAgainBtn mt-5"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          Quay lại
        </Button>
      </Modal>
    </>
  );
}
