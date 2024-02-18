import { Navigate } from "react-router-dom";
import GetAllProductSubcategory from "./getAllProductSubcategory";

const ProductCategory = () => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <>
      <GetAllProductSubcategory />
    </>
  );
};

export default ProductCategory;
