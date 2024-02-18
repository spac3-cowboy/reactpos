import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: null,
  information: null,
  purchase: null,
  error: "",
  loading: false,
};

export const addPurchase = createAsyncThunk(
  "purchase/addPurchase",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `purchase-invoice/`,
        data: {
          ...values,
        },
      });

      const newData = {
        ...data.createdInvoice,
        supplier: data.supplier,
      };

      return successHandler(newData, "New product purchased");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deletePurchase = createAsyncThunk(
  "purchase/deletePurchase",
  async (id) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `purchase-invoice/${id}`,
        data: {
          status: "false",
        },
      });
      return successHandler(data, "Purchase deleted");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const loadSinglePurchase = createAsyncThunk(
  "purchase/loadSinglePurchase",
  async (id) => {
    try {
      const { data } = await axios.get(`purchase-invoice/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllPurchase = createAsyncThunk(
  "purchase/loadAllPurchase",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`purchase-invoice?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    clearPurchase: (state) => {
      state.purchase = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllPurchase ======

    builder.addCase(loadAllPurchase.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllPurchase.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.allPurchaseInvoice;
      state.total = action.payload?.data?.aggregations?._count?.id;
      state.information = action.payload?.data?.aggregations?._sum;
    });

    builder.addCase(loadAllPurchase.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addPurchase ======

    builder.addCase(addPurchase.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addPurchase.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload?.data);
      state.list = list;
    });

    builder.addCase(addPurchase.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSinglePurchase ======

    builder.addCase(loadSinglePurchase.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSinglePurchase.fulfilled, (state, action) => {
      state.loading = false;
      state.purchase = action.payload?.data;
    });

    builder.addCase(loadSinglePurchase.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deletePurchase ======

    builder.addCase(deletePurchase.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deletePurchase.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deletePurchase.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default purchaseSlice.reducer;
export const { clearPurchase } = purchaseSlice.actions;
