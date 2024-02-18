import { Navigate } from "react-router-dom";
import AddSale from "./addSale";

const Sale = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <div>
      <AddSale />
    </div>
  );
};

export default Sale;
