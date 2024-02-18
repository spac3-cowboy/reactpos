import axios from "axios";
import { toast } from "react-toastify";

export const addReturnSale = async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `return-sale-invoice/`,
      data: {
        ...values,
      },
    });
    return "success";
  } catch (error) {
  }
};
