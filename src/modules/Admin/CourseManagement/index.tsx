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
  Upload,
} from "antd";

import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../../constants";
import {
  acceptUserApi,
  addClassApi,
  deleteClassApi,
  getClassListPaginationApi,
  updateClassApi,
} from "../../../apis/class";
import { NguoiTao } from "../../../types/class.type";
import { useAppSelector } from "../../../redux/hook";
import { getUserApplyApi, getUserWaitToApplyApi } from "../../../apis/user";

export default function CourseManagement() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataEdit, setDataEdit] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [fileList, setFileList] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [userDataWait, setUserDataWait] = useState([]);
  const [userData, setUserData] = useState([]);
  const [courseID, setCourseID] = useState("");

  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isDeleteFail, setIsDeleteFail] = useState(false);

  const { currentUser } = useAppSelector((state) => state.user);

  const { handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: undefined,
      maNhom: "GP01",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: "",
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-class-pagination", { currentPage }],
    queryFn: () => getClassListPaginationApi(currentPage),
  });

  const queryClient = useQueryClient();

  const { mutate: handleAddCourse, isPending } = useMutation({
    mutationFn: (formValues: FormData) => {
      return addClassApi(formValues);
    },
    onSuccess: (data) => {
      setIsOpenModal(false);
      queryClient.refetchQueries({
        queryKey: ["list-class-pagination", { currentPage }],
        type: "active",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: handleDeleteCourse } = useMutation({
    mutationFn: (id: string | number) => {
      return deleteClassApi(id);
    },
    onSuccess: () => {
      setIsDeleteSuccess(true);
      queryClient.refetchQueries({
        queryKey: ["list-class-pagination", { currentPage }],
        type: "active",
      });
    },
    onError: (error) => {
      console.log(error);
      setIsDeleteFail(true);
    },
  });

  const { mutate: handleUpdateCourse } = useMutation({
    mutationFn: (formValues: FormData) => {
      return updateClassApi(formValues);
    },
    onSuccess: () => {
      setIsOpenModal(false);
      queryClient.refetchQueries({
        queryKey: ["list-class-pagination", { currentPage }],
        type: "active",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: handleListUserWaitToApply, isPending: userDataWaitPending } =
    useMutation({
      mutationFn: (payload: { maKhoaHoc: string }) => {
        return getUserWaitToApplyApi(payload);
      },
      onSuccess: (data) => {
        setUserDataWait(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const { mutate: handleListUserApply, isPending: userDataPending } =
    useMutation({
      mutationFn: (payload: { maKhoaHoc: string }) => {
        return getUserApplyApi(payload);
      },
      onSuccess: (data) => {
        setUserData(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const { mutate: handleAcceptUser } = useMutation({
    mutationFn: (payload: { maKhoaHoc: string; taiKhoan: string }) => {
      return acceptUserApi(payload);
    },
    onSuccess: () => {
      console.log("thành công");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = [
    {
      title: "Mã khóa học",
      dataIndex: "maKhoaHoc",
      render: (maKhoaHoc: string) => (
        <Typography.Paragraph className="w-[80px]" ellipsis={{ rows: 1 }}>
          {maKhoaHoc}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      render: (tenKhoaHoc: string) => (
        <Typography.Paragraph
          style={{ textAlign: "center" }}
          className="w-[200px]"
          ellipsis={{ rows: 1 }}
        >
          {tenKhoaHoc}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (key: string) => (
        <div>
          <img
            style={{ margin: "0 auto" }}
            className="w-[80px] h-[80px] rounded object-cover"
            src={key}
          />
        </div>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "luotXem",
      render: (luotXem: number) => (
        <Typography.Paragraph
          style={{ textAlign: "center" }}
          className="w-[50px]"
        >
          {luotXem}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Người tạo",
      dataIndex: "nguoiTao",
      render: (nguoiTao: NguoiTao) => {
        return (
          <Typography.Paragraph
            style={{ textAlign: "center" }}
            className="w-[120px]"
          >
            {nguoiTao.hoTen ? nguoiTao.hoTen : "N/A"}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: "Thao tác",
      render: (_: any, record: any) => (
        <div className="flex justify-center">
          <Space size="small">
            <Popconfirm
              title="Xoá khóa học"
              description="Bạn có chắc chắn sẽ xoá khóa học này?"
              onConfirm={() => handleDelete(record.maKhoaHoc)}
              okText={<span>OK</span>}
              cancelText="Huỷ"
            >
              <Button danger>Xoá</Button>
            </Popconfirm>
            <Button
              type="default"
              onClick={() => {
                setIsOpenModal(true);
                setValue("maKhoaHoc", record.maKhoaHoc);
                setValue("biDanh", record.biDanh);
                setValue("tenKhoaHoc", record.tenKhoaHoc);
                setValue("moTa", record.moTa);
                setValue("luotXem", record.luotXem);
                setValue("danhGia", record.danhGia);
                setValue("hinhAnh", record.hinhAnh);
                setValue("maNhom", record.maNhom);
                setValue("ngayTao", record.ngayTao);
                setValue(
                  "maDanhMucKhoaHoc",
                  record.danhMucKhoaHoc.maDanhMucKhoahoc
                );
                setValue("taiKhoanNguoiTao", record.nguoiTao.taiKhoan);
                setDataEdit(record);
              }}
            >
              Chỉnh sửa
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setIsUserModalOpen(true);
                setCourseID(record.maKhoaHoc);
                handleListUserWaitToApply({ maKhoaHoc: record.maKhoaHoc });
                handleListUserApply({ maKhoaHoc: record.maKhoaHoc });
              }}
            >
              DS Học viên
            </Button>
          </Space>
        </div>
      ),
    },
  ];

  const columnsUserWait = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      render: (hoTen: string) => (
        <Typography.Paragraph>{hoTen}</Typography.Paragraph>
      ),
    },
    {
      title: "Thao tác",
      render: (_: any, record: any) => (
        <div className="flex justify-center">
          <Space size="small">
            <Popconfirm
              title="Duyệt"
              description="Bạn muốn duyệt học viên này?"
              onConfirm={() =>
                handleAcceptUser({
                  maKhoaHoc: courseID,
                  taiKhoan: record.taiKhoan,
                })
              }
              okText={<span>OK</span>}
              cancelText="Huỷ"
            >
              <Button type="primary" >Duyệt</Button>
            </Popconfirm>
          </Space>
        </div>
      ),
    },
  ];

  const columnsUser = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      render: (hoTen: string) => (
        <Typography.Paragraph>{hoTen}</Typography.Paragraph>
      ),
    },
  ]

  const handleDelete = (id: string | number) => {
    handleDeleteCourse(id);
  };

  const hinhAnhValue = watch("hinhAnh");

  const previewImage = (file: File) => {
    return URL.createObjectURL(file);
  };

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList.slice(-1));
  };

  const onSubmit = (formValues: any) => {
    const formData = new FormData();
    formData.append("maKhoaHoc", formValues.maKhoaHoc);
    formData.append("biDanh", formValues.biDanh);
    formData.append("tenKhoaHoc", formValues.tenKhoaHoc);
    formData.append("moTa", formValues.moTa);
    formData.append("luotXem", formValues.luotXem);
    formData.append("danhGia", formValues.danhGia);
    formData.append("hinhAnh", formValues.hinhAnh);
    formData.append("maNhom", formValues.maNhom);
    formData.append("ngayTao", formValues.ngayTao);
    formData.append("maDanhMucKhoaHoc", formValues.maDanhMucKhoaHoc);
    formData.append("taiKhoanNguoiTao", formValues.taiKhoanNguoiTao);
    if (dataEdit === undefined) {
      handleAddCourse(formData);
    } else {
      handleUpdateCourse(formData);
    }
    console.log(formValues);
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
              title: "Quản lý khóa học",
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
            setValue("taiKhoanNguoiTao", currentUser.taiKhoan);
          }}
        >
          Thêm khóa học
        </Button>
      </div>
      <div className="mt-4 text-2xl">
        <h4>Danh sách khóa học</h4>
        <Table
          className="mt-2"
          columns={columns}
          rowKey={"maKhoaHoc"}
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
        title={dataEdit !== undefined ? "Chỉnh sửa khóa học" : "Thêm khóa học"}
        centered
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={false}
      >
        <Form className="mt-4" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[18, 18]}>
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Mã khóa học
              </label>
              <Controller
                name="maKhoaHoc"
                control={control}
                render={({ field }) => (
                  <Input
                    size="large"
                    className="mt-1"
                    placeholder="Mã khóa học"
                    {...field}
                  />
                )}
              />
            </Col>
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Bí danh
              </label>
              <Controller
                name="biDanh"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      type="text"
                      className="mt-1"
                      placeholder="Bí danh"
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Tên khóa học
              </label>
              <Controller
                name="tenKhoaHoc"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      className="mt-1"
                      placeholder="Tên khóa học"
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Đánh giá
              </label>
              <Controller
                name="danhGia"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      type="number"
                      min={0}
                      max={10}
                      className="mt-1"
                      placeholder="0 - 10"
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Lượt xem
              </label>
              <Controller
                name="luotXem"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      type="number"
                      min={0}
                      className="mt-1"
                      placeholder="Lượt xem"
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Ngày tạo
              </label>
              <Controller
                name="ngayTao"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      type="text"
                      className="mt-1"
                      placeholder="Ngày tạo"
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Người tạo
              </label>
              <Controller
                name="taiKhoanNguoiTao"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      type="text"
                      className="mt-1"
                      placeholder="Người tạo"
                      {...field}
                    />
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
                  </>
                )}
              />
            </Col>
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Danh mục khóa học
              </label>
              <Controller
                name="maDanhMucKhoaHoc"
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
                        { value: "BackEnd", label: "Lập trình Backend" },
                        { value: "Design", label: "Thiết kế Web" },
                        { value: "DiDong", label: "Lập trình di động" },
                        { value: "FrontEnd", label: "Lập trình Front end" },
                        { value: "FullStack", label: "Lập trình Full Stack" },
                        { value: "TuDuy", label: "Tư duy lập trình" },
                      ]}
                    />
                  </>
                )}
              />
            </Col>

            <Col span={24}>
              <Controller
                name="hinhAnh"
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <Upload
                      beforeUpload={() => {
                        return false;
                      }}
                      fileList={fileList}
                      showUploadList={false}
                      multiple={false}
                      onChange={({ file }) => {
                        handleUploadChange({ fileList: [file] });
                        onChange(file);
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Upload hình</Button>
                    </Upload>
                  );
                }}
              />
            </Col>
            <Col span={6}>
              {hinhAnhValue && (
                <div className="mt-5">
                  <img
                    src={
                      typeof hinhAnhValue === "string"
                        ? hinhAnhValue
                        : previewImage(hinhAnhValue)
                    }
                    className="w-[100px] h-[100px] object-cover rounded"
                  />
                  <span
                    className="block cursor-pointer mt-1"
                    style={{ color: "red", textAlign: "center" }}
                    onClick={() => setValue("hinhAnh", undefined)}
                  >
                    <DeleteOutlined />
                  </span>
                </div>
              )}
            </Col>
            <Col span={18}>
              <label className="text-sm" htmlFor="">
                Mô tả
              </label>
              <Controller
                name="moTa"
                control={control}
                render={({ field }) => {
                  return (
                    <Input.TextArea
                      size="large"
                      rows={4}
                      className="mt-1"
                      placeholder="Nhập mô tả..."
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col span={24} className="text-end">
              <Button
                loading={isPending}
                disabled={isPending}
                htmlType="submit"
                size="large"
                type="primary"
              >
                {dataEdit !== undefined ? "Cập nhật" : "Thêm khóa học"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* user modal */}
      <Modal
        title={
          <h3
            style={{ textAlign: "center", fontWeight: "600", fontSize: "30px" }}
          >
            Danh sách học viên khóa học
          </h3>
        }
        open={isUserModalOpen}
        centered
        footer={false}
        onCancel={() => setIsUserModalOpen(false)}
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
              Danh sách học viên chờ xét duyệt
            </h4>
            <Table
              loading={userDataWaitPending}
              className="mt-2"
              columns={columnsUserWait}
              rowKey={"taiKhoan"}
              dataSource={userDataWait}
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
              Danh sách học viên đã xét duyệt
            </h4>
            <Table
              className="mt-2"
              columns={columnsUser}
              rowKey={"taiKhoan"}
              dataSource={userData}
              pagination={false}
            ></Table>
          </Col>
        </Row>
      </Modal>

      {/* success | fail modal*/}
      <Modal
        title="Xóa khóa học thành công"
        open={isDeleteSuccess}
        footer={null}
        className="authModal registerModal"
        closable={false}
        centered
      >
        <img src="./../../../../img/successIcon.png" alt="" />
        <p>Bạn đã xóa khóa học thành công</p>
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
        title="Xóa khóa học không thành công"
        open={isDeleteFail}
        footer={null}
        className="authModal  loginModal"
        closable={false}
        centered
      >
        <img src="./../../../../img/login-fail-icon.png" alt="" />
        <p>Không thể xóa khóa học đã có học viên ghi danh.</p>
        <Button
          className="tryAgainBtn mt-5"
          onClick={() => {
            setIsDeleteFail(false);
          }}
        >
          Quay lại
        </Button>
      </Modal>
    </>
  );
}
