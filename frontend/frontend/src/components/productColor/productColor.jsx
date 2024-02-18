import { Navigate } from "react-router-dom";
import GetAllProductColor from "./getAllProductColor";

const ProductColor = () => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <>
      <GetAllProductColor />
    </>
  );
};

export default ProductColor;
