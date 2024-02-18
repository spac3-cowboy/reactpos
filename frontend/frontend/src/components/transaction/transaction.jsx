import { Navigate } from "react-router-dom";
import GetAllTransaction from "./getAllTransaction";

const Transaction = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <div>
      <GetAllTransaction />
    </div>
  );
};

export default Transaction;
