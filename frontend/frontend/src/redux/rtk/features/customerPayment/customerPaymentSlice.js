import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  customerPayment: null,
  total: null,
  error: "",
  loading: false,
};

// ADD_Customer_PAYMENT
export const addCustomerPayment = createAsyncThunk(
  "customerPayment/addCustomerPayment",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `payment-sale-invoice/`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "Payment added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_Customer_PAYMENT
export const deleteCustomerPayment = createAsyncThunk(
  "customerPayment/deleteCustomerPayment",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `transaction/${id}`,
      });

      return successHandler(data, "Payment deleted successfully", "warning");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// Customer_DETAILS_PAYMENT
export const loadCustomerSinglePayment = createAsyncThunk(
  "customerPayment/loadCustomerSinglePayment",
  async (id) => {
    try {
      const { data } = await axios.get(`transaction/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// CustomerS_PAYMENT
export const loadCustomerAllPayment = createAsyncThunk(
  "customerPayment/loadCustomerAllPayment",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`transaction?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const customerPaymentSlice = createSlice({
  name: "customerPayment",
  initialState,
  extraReducers: (builder) => {
    // 1) ====== builders for loadCustomerAllPayment ======

    builder.addCase(loadCustomerAllPayment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadCustomerAllPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data.allTransaction;
      state.total = action.payload?.data.aggregations;
    });

    builder.addCase(loadCustomerAllPayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addCustomerPayment ======

    builder.addCase(addCustomerPayment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addCustomerPayment.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload?.data);
      state.list = list;
    });

    builder.addCase(addCustomerPayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadCustomerSinglePayment ======

    builder.addCase(loadCustomerSinglePayment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadCustomerSinglePayment.fulfilled, (state, action) => {
      state.loading = false;

      state.Customer = action.payload?.data;
    });

    builder.addCase(loadCustomerSinglePayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteCustomerPayment ======

    builder.addCase(deleteCustomerPayment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCustomerPayment.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteCustomerPayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default customerPaymentSlice.reducer;
