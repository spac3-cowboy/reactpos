import jwtDecode from "jwt-decode";

const checkTokenExp = (token, customer) => {
  try {
    if (jwtDecode(token).exp * 1000 < Date.now()) {
      if (customer) {
        return (window.location.href = "customer/logout");
      } else {
        return (window.location.href = "/admin/auth/logout");
      }
    } else {
    }
  } catch (error) {
  }
};

export default checkTokenExp;
