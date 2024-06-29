import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Table,
  Select,
  Typography,
} from "antd";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../../constants";
import {
  addUserApi,
  deleteUserApi,
  getCourseAccept,
  getCourseWaitToAccept,
  getUserListPaginationApi,
  updateUserApi,
} from "../../../apis/user";
import { UserAdd } from "../../../types/user.type";
import * as yup from "yup";
import {
  ALPHA_NUMBER_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX,
  VIETNAMESE_REGEX,
} from "../../../constants";
import { yupResolver } from "@hookform/resolvers/yup";

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
  maNhom: yup.string().required("(*) Vui lòng chọn nhóm"),
  maLoaiNguoiDung: yup.string().required("(*) Vui lòng chọn loại người dùng"),
});

export default function UserManagement() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataEdit, setDataEdit] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const [isAddUserFail, setIsAddUserFail] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isDeleteFail, setIsDeleteFail] = useState(false);

  const [courseDataWait, setCourseDataWait] = useState([])
  const [courseData, setCourseData] = useState([])

  const {
    handleSubmit,
    control,
    setValue,
    reset,
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-user-pagination", { currentPage }],
    queryFn: () => getUserListPaginationApi(currentPage),
  });

  const queryClient = useQueryClient();

  const { mutate: handleAddUser, isPending } = useMutation({
    mutationFn: (user: UserAdd) => {
      return addUserApi(user);
    },
    onSuccess: (data) => {
      setIsOpenModal(false);
      queryClient.refetchQueries({
        queryKey: ["list-user-pagination", { currentPage }],
        type: "active",
      });
    },
    onError: (error) => {
      setIsAddUserFail(true);
      console.log(error);
    },
  });

  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (id: string) => {
      return deleteUserApi(id);
    },
    onSuccess: () => {
      setIsDeleteSuccess(true);
      queryClient.refetchQueries({
        queryKey: ["list-user-pagination", { currentPage }],
        type: "active",
      });
    },
    onError: (error) => {
      setIsDeleteFail(true);
    },
  });

  const { mutate: handleUpdateUser } = useMutation({
    mutationFn: (user: UserAdd) => {
      return updateUserApi(user);
    },
    onSuccess: () => {
      setIsOpenModal(false);
      queryClient.refetchQueries({
        queryKey: ["list-user-pagination", { currentPage }],
        type: "active",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: handleCourseWaitAccpet } = useMutation({
    mutationFn: (payload: { taiKhoan: string }) => {
      return getCourseWaitToAccept(payload);
    },
    onSuccess: (data) => {
      setCourseDataWait(data)
    },
    onError: (error)=>{
      console.log(error)
    }
  });

  const { mutate: handleCourseAccpet } = useMutation({
    mutationFn: (payload: { taiKhoan: string }) => {
      return getCourseAccept(payload);
    },
    onSuccess: (data) => {
      setCourseData(data)
      console.log(data)
    },
    onError: (error)=>{
      console.log(error)
    }
  });

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      render: (taiKhoan: string) => (
        <Typography.Paragraph className="w-[80px]" ellipsis={{ rows: 1 }}>
          {taiKhoan}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      render: (hoTen: string) => (
        <Typography.Paragraph
          style={{ textAlign: "center" }}
          className="w-[200px]"
          ellipsis={{ rows: 1 }}
        >
          {hoTen}
        </Typography.Paragraph>
      ),
    },

    {
      title: "Điện thoại",
      dataIndex: "soDT",
      render: (soDT: number) => (
        <Typography.Paragraph
          style={{ textAlign: "center" }}
          className="w-[50px]"
        >
          {soDT}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email: string) => {
        return (
          <Typography.Paragraph
            style={{ textAlign: "center" }}
            className="w-[120px]"
          >
            {email}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: "Nhóm",
      dataIndex: "maNhom",
      render: (maNhom: string) => (
        <Typography.Paragraph
          style={{ textAlign: "center" }}
          className="w-[50px]"
        >
          {maNhom ? maNhom : "N/A"}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Thao tác",
      render: (_: any, record: any) => (
        <div className="flex justify-center">
          <Space size="small">
            <Popconfirm
              title="Xoá người dùng"
              description="Bạn muốn xóa người dùng này?"
              onConfirm={() => handleDelete(record.taiKhoan)}
              okText={<span>OK</span>}
              cancelText="Huỷ"
            >
              <Button danger>Xoá</Button>
            </Popconfirm>
            <Button
              type="default"
              onClick={() => {
                setIsOpenModal(true);
                setValue("taiKhoan", record.taiKhoan);
                setValue("hoTen", record.hoTen);
                setValue("soDT", record.soDT);
                setValue("maNhom", record.maNhom);
                setValue("email", record.email);
                setValue("maLoaiNguoiDung", record.maLoaiNguoiDung);
                setValue("matKhau", record.matKhau);
                setDataEdit(record);
              }}
            >
              Chỉnh sửa
            </Button>
            <Button type="primary" onClick={()=>{
              setIsCourseModalOpen(true)
              handleCourseWaitAccpet({taiKhoan:record.taiKhoan})
              handleCourseAccpet({taiKhoan:record.taiKhoan})
              }}>Khóa học</Button>
          </Space>
        </div>
      ),
    },
  ];

  const columnsCourseWait = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      render: (maKhoaHoc: string) => (
        <Typography.Paragraph>{maKhoaHoc}</Typography.Paragraph>
      ),
    },
    {
      title: "Khóa học",
      dataIndex: "tenKhoaHoc",
      render: (tenKhoaHoc: string) => (
        <Typography.Paragraph>{tenKhoaHoc}</Typography.Paragraph>
      ),
    },
  ];

  const columnsCourse = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      render: (maKhoaHoc: string) => (
        <Typography.Paragraph>{maKhoaHoc}</Typography.Paragraph>
      ),
    },
    {
      title: "Khóa học",
      dataIndex: "tenKhoaHoc",
      render: (tenKhoaHoc: string) => (
        <Typography.Paragraph>{tenKhoaHoc}</Typography.Paragraph>
      ),
    },
  ]

  const handleDelete = (id: string) => {
    handleDeleteUser(id);
  };

  const onSubmit = (formValues: any) => {
    if (dataEdit === undefined) {
      handleAddUser(formValues);
    } else {
      handleUpdateUser(formValues);
    }
  };

  const dataSource = data?.items || [];
  const totalCount = data?.totalCount || 0;

  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: "Trang chủ",
              path: "/admin",
            },
            {
              title: "Quản lý người dùng",
            },
          ]}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setIsOpenModal(true);
            reset();
            setDataEdit(undefined);
          }}
        >
          Thêm người dùng
        </Button>
      </div>
      <div className="mt-4 text-2xl">
        <h4>Danh sách người dùng</h4>
        <Table
          className="mt-2"
          columns={columns}
          rowKey={"taiKhoan"}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 1280 }}
          loading={isLoading}
        />
        <div className="flex float-end mt-4 pb-4">
          <Pagination
            defaultCurrent={currentPage}
            total={totalCount}
            pageSize={PAGE_SIZE}
            onChange={(page: number) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
      <Modal
        title={
          dataEdit !== undefined ? "Chỉnh sửa thông tin" : "Thêm người dùng"
        }
        centered
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={false}
      >
        <Form className="mt-4" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[18, 18]}>
            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Tài khoản
              </label>
              <Controller
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
                        <span className="errorMess">{errors.soDT.message}</span>
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
                      <span className="errorMess">{errors.maNhom.message}</span>
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
              <Button htmlType="submit" size="large" type="primary">
                {dataEdit !== undefined ? "Cập nhật" : "Thêm người dùng"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* course modal */}
      <Modal
        title={
          <h3
            style={{ textAlign: "center", fontWeight: "600", fontSize: "30px" }}
          >
            Danh sách khóa học
          </h3>
        }
        open={isCourseModalOpen}
        centered
        footer={false}
        onCancel={() => setIsCourseModalOpen(false)}
        width={1000}
      >
        <Row gutter={30}>
          <Col span={12}>
            <h4
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              Khóa học chờ xét duyệt
            </h4>
            <Table
              className="mt-2"
              columns={columnsCourseWait}
              rowKey={"maKhoaHoc"}
              dataSource={courseDataWait}
              pagination={false}
            ></Table>
          </Col>
          <Col span={12}>
            <h4
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              Khóa học đã xét duyệt
            </h4>
            <Table
              className="mt-2"
              columns={columnsCourse}
              rowKey={"maKhoaHoc"}
              dataSource={courseData}
              pagination={false}
            ></Table>
          </Col>
        </Row>
      </Modal>

      <Modal
        title="Xóa người dùng thành công"
        open={isDeleteSuccess}
        footer={null}
        className="authModal registerModal"
        closable={false}
        centered
      >
        <img src="./../../../../img/successIcon.png" alt="" />
        <p>Bạn đã xóa người dùng thành công</p>
        <Button
          className="tryAgainBtn mt-5"
          onClick={() => {
            setIsDeleteSuccess(false);
          }}
        >
          Quay lại
        </Button>
      </Modal>

      <Modal
        title="Xóa người dùng không thành công"
        open={isDeleteFail}
        footer={null}
        className="authModal  loginModal"
        closable={false}
        centered
      >
        <img src="./../../../../img/login-fail-icon.png" alt="" />
        <p>Không thể xóa người dùng đã đăng ký khóa học.</p>
        <Button
          className="tryAgainBtn mt-5"
          onClick={() => {
            setIsDeleteFail(false);
          }}
        >
          Quay lại
        </Button>
      </Modal>

      <Modal
        title="Thêm người dùng không thành công"
        open={isAddUserFail}
        footer={null}
        className="authModal  loginModal"
        closable={false}
        centered
      >
        <img src="./../../../../img/login-fail-icon.png" alt="" />
        <p>Tài khoản hoặc email đã tồn tại, vui lòng thử lại.</p>
        <Button
          className="tryAgainBtn mt-5"
          onClick={() => {
            setIsAddUserFail(false);
          }}
        >
          Thử lại
        </Button>
      </Modal>
    </>
  );
}
