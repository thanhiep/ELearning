import { Navigate, Outlet, useRoutes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import HomePage from "../modules/User/HomePage";
import ClassDetail from "../modules/User/ClassDetail";
import ClassList from "../modules/User/ClassList";
import KhoaHocDanhMuc from "../modules/User/KhoaHocDanhMuc";
import AboutPage from "../modules/User/AboutPage";
import BlogPage from "../modules/User/BlogPage";
import EventPage from "../modules/User/EventPage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../modules/Auth/login";
import RegisterPage from "../modules/Auth/register";
import AdminLayout from "../layouts/AdminLayout";
import ProfilePage from "../modules/User/ProfilePage";
import { useAppSelector } from "../redux/hook";
import NotFound from "../modules/NotFound";


const RejectedRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return currentUser === null ? <Outlet /> : <Navigate to={"/"} />;
};

const ProtectedAdminRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return currentUser && currentUser.maLoaiNguoiDung === "GV" ? (
    <Outlet />
  ) : (
    currentUser ? <Navigate to={"/"}/> : <Navigate to={"/auth/login"}/>
  );
};

const userRouteElement = () => {
  const element = useRoutes([
    {
      path: "",
      element: <UserLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/class-detail/:id",
          element: <ClassDetail />,
        },
        {
          path: "/class-list",
          element: <ClassList />,
        },
        {
          path: "/danh-muc/:id",
          element: <KhoaHocDanhMuc />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/blog",
          element: <BlogPage />,
        },
        {
          path: "/event",
          element: <EventPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <RejectedRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "/auth/login",
              element: <LoginPage />,
            },
            {
              path: "/auth/register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },

    {
      path: "/admin",
      element: <ProtectedAdminRoute/>,
      children: [
        {
            path:"",
            element:<AdminLayout/>,
            children:[]
        }
      ],
    },

    {
        path:"*",
        element: <NotFound/>
    }
  ]);
  return element;
};

export default userRouteElement;
