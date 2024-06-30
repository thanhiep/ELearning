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

import {
  UploadOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DATE_REGEX, PAGE_SIZE } from "../../../constants";
import {
  acceptUserApi,
  addClassApi,
  cancelClassApi,
  deleteClassApi,
  getClassListApi,
  getClassListPaginationApi,
  updateClassApi,
} from "../../../apis/class";
import { KhoaHoc, NguoiTao } from "../../../types/class.type";
import { useAppSelector } from "../../../redux/hook";
import { getUserApplyApi, getUserWaitToApplyApi } from "../../../apis/user";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  maKhoaHoc: yup.string(),
  biDanh: yup
    .string()
    .required("(*) Vui lòng nhập bí danh")
    .max(20, "(*) Tối đa 20 ký tự"),
  tenKhoaHoc: yup.string().required("(*) Vui lòng nhập tên khóa học"),
  moTa: yup.string().required("(*) Vui lòng nhập mô tả"),
  luotXem: yup
    .number()
    .typeError("(*) Vui lòng nhập số")
    .required("(*) Vui lòng nhập lượt xem"),
  danhGia: yup
    .number()
    .typeError("(*) Vui lòng nhập một số từ 0 - 10")
    .required("(*) Vui lòng nhập đánh giá từ 0 - 10")
    .min(0, "(*) Đánh giá phải từ 0 - 10")
    .max(10, "(*) Đánh giá phải từ 0 - 10"),
  maNhom: yup.string().required("(*) Vui lòng chọn mã nhóm"),
  hinhAnh: yup.mixed().required("(*) Vui lòng tải lên hình ảnh"),
  ngayTao: yup
    .string()
    .required("(*) Vui lòng nhập ngày tạo")
    .matches(DATE_REGEX, "(*) Ngày tạo phải theo định dạng DD/MM/YYYY"),
  maDanhMucKhoaHoc: yup.string().required("(*) Vui lòng chọn danh mục"),
  taiKhoanNguoiTao: yup
    .string()
});

export default function CourseManagement() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataEdit, setDataEdit] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [fileList, setFileList] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAddCourseFail, setIsAddCourseFail] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [userDataWait, setUserDataWait] = useState([]);
  const [userData, setUserData] = useState([]);
  const [courseID, setCourseID] = useState("");

  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isDeleteFail, setIsDeleteFail] = useState(false);

  const { currentUser } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
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
    mode: `onChange`,
    resolver: yupResolver(schema),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["list-class-pagination", { currentPage }],
    queryFn: () => getClassListPaginationApi(currentPage),
  });

  const dataSource = data?.items || [];
  const totalCount = data?.totalCount || 0;

  const { data: courseList } = useQuery({
    queryKey: ["class-list", { dataSource }],
    queryFn: getClassListApi,
  });

  const queryClient = useQueryClient();

  const { mutate: handleAddCourse, isPending } = useMutation({
    mutationFn: (formValues: FormData) => {
      return addClassApi(formValues);
    },
    onSuccess: () => {
      setIsOpenModal(false);
      queryClient.refetchQueries({
        queryKey: ["list-class-pagination", { currentPage }],
        type: "active",
      });
    },
    onError: (error) => {
      console.log(error)
      setIsAddCourseFail(true);
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

  const { mutate: handleAcceptUser, isPending: acceptUserPending } =
    useMutation({
      mutationFn: (payload: { maKhoaHoc: string; taiKhoan: string }) => {
        return acceptUserApi(payload);
      },
      onSuccess: () => {
        handleListUserWaitToApply({ maKhoaHoc: courseID });
        handleListUserApply({ maKhoaHoc: courseID });
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const { mutate: handleCancelCourse, isPending: cancelCoursePending } =
    useMutation({
      mutationFn: (payload: { maKhoaHoc: string; taiKhoan: string }) => {
        return cancelClassApi(payload);
      },
      onSuccess: () => {
        handleListUserWaitToApply({ maKhoaHoc: courseID });
        handleListUserApply({ maKhoaHoc: courseID });
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
              onConfirm={() => {
                handleAcceptUser({
                  maKhoaHoc: courseID,
                  taiKhoan: record.taiKhoan,
                });
              }}
              okText={<span>OK</span>}
              cancelText="Huỷ"
            >
              <Button type="primary" loading={acceptUserPending}>
                Duyệt
              </Button>
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
    {
      title: "Thao tác",
      render: (_: any, record: any) => (
        <div className="flex justify-center">
          <Space size="small">
            <Popconfirm
              title="Xóa"
              description="Bạn muốn xóa học viên này khỏi khóa học?"
              onConfirm={() => {
                handleCancelCourse({
                  maKhoaHoc: courseID,
                  taiKhoan: record.taiKhoan,
                });
              }}
              okText={<span>OK</span>}
              cancelText="Huỷ"
            >
              <Button danger loading={cancelCoursePending}>
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        </div>
      ),
    },
  ];

  const handleDelete = (id: string | number) => {
    handleDeleteCourse(id);
  };

  const hinhAnhValue = watch("hinhAnh");

  const previewImage = (file: any) => {
    return URL.createObjectURL(file);
  };

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList.slice(-1));
  };

  // tự tạo mã khóa học
  const uuidv4 = () => {
    const uuid = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
      (
        +c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
      ).toString(16)
    );
    return uuid.substr(uuid.length - 8);
  };

  const onSubmit = (formValues: any) => {
    const formData = new FormData();
    formData.append("biDanh", formValues.biDanh);
    formData.append("tenKhoaHoc", formValues.tenKhoaHoc);
    formData.append("moTa", formValues.moTa);
    formData.append("luotXem", formValues.luotXem);
    formData.append("danhGia", formValues.danhGia);
    formData.append("hinhAnh", formValues.hinhAnh);
    formData.append("maNhom", formValues.maNhom);
    formData.append("ngayTao", formValues.ngayTao);
    formData.append("maDanhMucKhoaHoc", formValues.maDanhMucKhoaHoc);
    
    if (dataEdit === undefined) {
      const newMaKhoaHoc = uuidv4();
      formValues.maKhoaHoc = newMaKhoaHoc;
      formData.append("taiKhoanNguoiTao", currentUser.taiKhoan);
      formData.append("maKhoaHoc", formValues.maKhoaHoc);
      handleAddCourse(formData);
    } else {
      formData.append("taiKhoanNguoiTao", (dataEdit as KhoaHoc).nguoiTao.taiKhoan)
      formData.append("maKhoaHoc", (dataEdit as KhoaHoc).maKhoaHoc);
      handleUpdateCourse(formData);
    }
  };

  const handleSearchChange = (e: any) => {
    const { value } = e.target;
    setSearchValue(value);
    setCurrentPage(1);
  };

  const dataSearch = courseList?.filter((course) => {
    return (
      course.tenKhoaHoc.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );
  });
  const totalCountSearch = dataSearch?.length;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = dataSearch?.slice(startIndex, endIndex);

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

        <Input
          placeholder="Nhập tên khóa học để tìm kiếm..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchValue}
          onChange={handleSearchChange}
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
          dataSource={searchValue !== "" ? paginatedData : dataSource}
          pagination={false}
          scroll={{ x: 1280 }}
          loading={isLoading}
        />
        <div className="flex mt-4 pb-4 justify-center">
          <Pagination
            current={currentPage}
            defaultCurrent={currentPage}
            total={searchValue !== "" ? totalCountSearch : totalCount}
            pageSize={PAGE_SIZE}
            showSizeChanger={false}
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
                disabled
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
                    <>
                      <Input
                        size="large"
                        type="text"
                        className="mt-1"
                        placeholder="Bí danh"
                        {...field}
                      />
                      {errors.biDanh && (
                        <span className="errorMess">
                          {errors.biDanh.message}
                        </span>
                      )}
                    </>
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
                    <>
                      <Input
                        size="large"
                        className="mt-1"
                        placeholder="Tên khóa học"
                        {...field}
                      />
                      {errors.tenKhoaHoc && (
                        <span className="errorMess">
                          {errors.tenKhoaHoc.message}
                        </span>
                      )}
                    </>
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
                    <>
                      <Input
                        size="large"
                        type="number"
                        min={0}
                        max={10}
                        className="mt-1"
                        placeholder="0 - 10"
                        {...field}
                      />
                      {errors.danhGia && (
                        <span className="errorMess">
                          {errors.danhGia.message}
                        </span>
                      )}
                    </>
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
                    <>
                      <Input
                        size="large"
                        type="number"
                        min={0}
                        className="mt-1"
                        placeholder="Lượt xem"
                        {...field}
                      />
                      {errors.luotXem && (
                        <span className="errorMess">
                          {errors.luotXem.message}
                        </span>
                      )}
                    </>
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
                    <>
                      <Input
                        size="large"
                        type="text"
                        className="mt-1"
                        placeholder="Ngày tạo"
                        {...field}
                      />
                      {errors.ngayTao && (
                        <span className="errorMess">
                          {errors.ngayTao.message}
                        </span>
                      )}
                    </>
                  );
                }}
              />
            </Col>
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Người tạo
              </label>
              <Controller
                disabled
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
                    {errors.maNhom && (
                      <span className="errorMess">{errors.maNhom.message}</span>
                    )}
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
                    {errors.maDanhMucKhoaHoc && (
                      <span className="errorMess">
                        {errors.maDanhMucKhoaHoc.message}
                      </span>
                    )}
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
                    <>
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
                      {errors.hinhAnh && (
                        <span className="errorMess ml-3">
                          {errors.hinhAnh.message}
                        </span>
                      )}
                    </>
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
                    onClick={() => setValue("hinhAnh", "")}
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
                    <>
                      <Input.TextArea
                        size="large"
                        rows={4}
                        className="mt-1"
                        placeholder="Nhập mô tả..."
                        {...field}
                      />
                      {errors.moTa && (
                        <span className="errorMess ml-3">
                          {errors.moTa.message}
                        </span>
                      )}
                    </>
                  );
                }}
              />
            </Col>
            <Col span={24} className="text-end">
              <Button
                loading={isPending}
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
              loading={userDataPending}
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

      <Modal
        title="Thêm khóa học không thành công"
        open={isAddCourseFail}
        footer={null}
        className="authModal  loginModal"
        closable={false}
        centered
      >
        <img src="./../../../../img/login-fail-icon.png" alt="" />
        <p>Đã có lỗi xảy ra, vui lòng thử lại.</p>
        <Button
          className="tryAgainBtn mt-5"
          onClick={() => {
            setIsAddCourseFail(false);
          }}
        >
          Thử lại
        </Button>
      </Modal>
    </>
  );
}
