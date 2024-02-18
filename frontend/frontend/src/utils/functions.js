import { toast } from "react-toastify";

// remove all falsy property from  object
export function removeFalsyProperties(obj) {
  const newObj = {};
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop]) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}

export function stringShorter(str, length) {
  return str?.length > length ? str.slice(0, length) + "..." : str;
}

export function errorHandler(error, toastStatus) {
  if (error.response?.data?.error) {
    toastStatus && toast.error(error.response.data.error);
    return {
      message: "error",
      error: error.response.data.error,
    };
  } else {
    toastStatus && toast.warning("Something went wrong, Please try again");
    return {
      message: "error",
      error: "Something went wrong, Please try again",
    };
  }
}

export function successHandler(data, message, messageType = "success") {
  message && toast[messageType](message);
  return {
    message: "success",
    data,
  };
}
