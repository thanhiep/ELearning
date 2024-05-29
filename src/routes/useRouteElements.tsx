import { useRoutes } from "react-router-dom"
import UserLayout from "../layouts/UserLayout"
import HomePage from "../modules/User/HomePage";
import ClassDetail from "../modules/User/ClassDetail";

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
                }
            ]
        }
    ])
    return element;
}

export default userRouteElement;