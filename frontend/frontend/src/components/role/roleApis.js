import axios from "axios";
import { toast } from "react-toastify";

// Get Roles
export const getRoles = async () => {
  const { data } = await axios.get(`role?query=all`);
  return data;
};

// Create Role

export const addRole = async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `role`,
      data: {
        ...values,
      },
    });
    //dispatching data

    return {
      data,
      message: "success",
    };
  } catch (error) {
    return {
      message: "error",
    };
  }
};

// Detail Role View

export const loadSingleRole = async (id) => {
  //dispatching with an call back function and returning that

  try {
    const { data } = await axios.get(`role/${id}`);
    return {
      data,
      message: "Success",
    };
    //dispatching data
  } catch (error) {
  }
};

//Add Permission in Role

export const addPermission = async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `role-permission`,
      data: {
        ...values,
      },
    });
    //dispatching data

    return {
      data,
      message: "success",
    };
  } catch (error) {
    return {
      message: "error",
    };
  }
};

// Get Permsiion
export const loadPermission = async () => {
  const { data } = await axios.get(`permission?query=all`);
  return data;
};

// delete Role permissions
export const deleteRolePermission = async (value) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `role-permission?query=deletemany`,
      data: value,
    });
    //dispatching data

    return {
      data,
      message: "success",
    };
  } catch (error) {
    return {
      message: "error",
    };
  }
};
