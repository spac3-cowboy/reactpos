import { Navigate } from "react-router-dom";
import GetAllUser from "./GetAllUser";

const UserList = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <>
      <GetAllUser />
    </>
  );
};

export default UserList;
