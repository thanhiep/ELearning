import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderComponent from "../../components/Header";
import BackToTop from "../../components/BackToTop";

export default function UserLayout() {
  return (
    <>
      <HeaderComponent />
      <Outlet />
      <BackToTop/>
      <Footer />
    </>
  );
}
