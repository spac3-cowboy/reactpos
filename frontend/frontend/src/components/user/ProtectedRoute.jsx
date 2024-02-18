import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isLogged");

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to='/admin/login' />
      }
    />
  );
}

export default ProtectedRoute;
