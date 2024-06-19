import { Button } from "antd";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <div className="notFoundContent">
          <h1 className="notFoundText">404</h1>
        </div>
        <div className="notFoundBottom">
          <h3>Có gì đó sai sai ở đây</h3>
          <Button
            className="tryAgainBtn backToHomeBtn"
            onClick={() => {
              navigate("/")
            }}
          >
            Quay về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
