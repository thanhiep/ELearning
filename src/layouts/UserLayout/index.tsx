import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderComponent from "../../components/Header";
import BackToTop from "../../components/BackToTop";
import { useMemo } from "react";

export default function UserLayout() {
  const renderHeader = useMemo(() => <HeaderComponent />, []);
  const renderFooter = useMemo(()=> <Footer/>,[])

  return (
    <>
      {renderHeader}
      <Outlet />
      <BackToTop />
      {renderFooter}
    </>
  );
}
