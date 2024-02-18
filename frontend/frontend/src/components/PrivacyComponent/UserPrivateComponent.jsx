import React from "react";
import getPermissions from "../../utils/getPermissions";

const UserPrivateComponent = ({ permission, children }) => {
  const permissions = getPermissions();

  if (permissions?.includes(permission)) {
    return <>{children}</>;
  } else {
    return "";
  }
};

export default UserPrivateComponent;
