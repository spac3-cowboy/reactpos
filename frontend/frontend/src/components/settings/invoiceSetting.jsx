import { Navigate } from "react-router-dom";
import AddDetails from "./addDetails";

const InvoiceSetting = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <>
      <AddDetails />
    </>
  );
};

export default InvoiceSetting;
