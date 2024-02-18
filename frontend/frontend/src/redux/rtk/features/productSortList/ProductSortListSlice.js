import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: null,
  error: "",
  loading: false,
};

// ADD_PRODUCT_BRAND
export const addPurchaseOrder = createAsyncThunk(
  "purchaseOrder/addPurchaseOrder",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `purchase-reorder-invoice`,
        data: values,
      });
      return successHandler(data, "product brand added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// get  Product All
export const loadAllProductSortList = createAsyncThunk(
  "purchaseOrder/loadAllProductSortList",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`reorder-quantity?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const ProductSortListSlice = createSlice({
  name: "ProductSortList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllAdjustInventory ======

    builder.addCase(loadAllProductSortList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllProductSortList.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllReOderList;
      state.total = action.payload?.data?._count?.id;
    });

    builder.addCase(loadAllProductSortList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default ProductSortListSlice.reducer;
