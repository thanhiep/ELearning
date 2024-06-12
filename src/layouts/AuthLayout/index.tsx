import { Outlet } from "react-router-dom";
import "./style.css";

export default function AuthLayout() {
  return (
    <div className="authBg">
      <>
        <Outlet />
      </>
    </div>
  );
}
