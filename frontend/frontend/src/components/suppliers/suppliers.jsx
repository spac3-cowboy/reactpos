import React, { createContext } from "react";
import GetAllSup from "./getAllSup";

import { Navigate } from "react-router-dom";

export const SuppliersContext = createContext();

const Suppliers = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <>
      <GetAllSup />
    </>
  );
};

export default Suppliers;
