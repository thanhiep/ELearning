import { useRoutes } from "react-router-dom"
import UserLayout from "../layouts/UserLayout"
import HomePage from "../modules/User/HomePage";
import ClassDetail from "../modules/User/ClassDetail";
import ClassList from "../modules/User/ClassList";
import KhoaHocDanhMuc from "../modules/User/KhoaHocDanhMuc";
import AboutPage from "../modules/User/AboutPage";
import BlogPage from "../modules/User/BlogPage";

const userRouteElement = () => {
    const element = useRoutes([
        {
            path: "",
            element: <UserLayout/>,
            children: [
                {
                    path: "",
                    element: <HomePage/>
                },
                {
                    path: "/class-detail/:id",
                    element: <ClassDetail/>
                },
                {
                    path:"/class-list",
                    element: <ClassList/>
                },
                {
                    path:"/danh-muc/:id",
                    element: <KhoaHocDanhMuc/>
                },
                {
                    path:"/about",
                    element:<AboutPage/>
                },
                {
                    path:"/blog",
                    element:<BlogPage/>
                }
            ]
        }
    ])
    return element;
}

export default userRouteElement;