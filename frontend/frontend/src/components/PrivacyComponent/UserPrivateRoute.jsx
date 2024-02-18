import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import getPermissions from "../../utils/getPermissions";

const UserPrivateRoute = ({ path, permission, ...props }) => {
  const permissions = getPermissions();
  const isLogged = localStorage.getItem("isLogged");
  
  if (permissions?.includes(permission) && isLogged) {
    return <Outlet />;
  } else {
    toast.error("You are not Authorized, Contact with Admin");
    return <Navigate to='/admin/auth/login' />;
  }
};

export default UserPrivateRoute;
