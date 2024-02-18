import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: null,
  singlePurchase: null,
  error: "",
  loading: false,
};
// ============ loadAllPurchase==================
export const loadAllPurchaseReorder = createAsyncThunk(
  "purchaseReorder/purchaseOrderList",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`purchase-reorder-invoice?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// ==============load single purchase ==============
export const loadSinglePurchaseReorder = createAsyncThunk(
  "purchaseReorder/loadSinglePurchaseReorder",
  async (id) => {
    try {
      const { data } = await axios.get(`purchase-reorder-invoice/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const PurchaseOrderSlice = createSlice({
  name: "PurchaseOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //==================loadAllPurchaseOrder======================
    builder.addCase(loadAllPurchaseReorder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllPurchaseReorder.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllPurchaseReorderInvoice;
      state.total = action.payload?.data?.totalReorderInvoice;
    });
    builder.addCase(loadAllPurchaseReorder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    //==================loadSinglePurchaseReturn======================
    builder.addCase(loadSinglePurchaseReorder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadSinglePurchaseReorder.fulfilled, (state, action) => {
      state.loading = false;
      state.singlePurchase = action.payload?.data;
    });
    builder.addCase(loadSinglePurchaseReorder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
  },
});

export default PurchaseOrderSlice.reducer;
