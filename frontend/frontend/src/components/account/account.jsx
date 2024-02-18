import { Navigate } from "react-router-dom";

import GetAllAccount from "./getAllAccount";

const Account = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }

  return (
    <>
      <GetAllAccount />
    </>
  );
};

export default Account;
