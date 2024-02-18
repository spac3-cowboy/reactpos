import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  coupon: null,
  total: null,
  validList:null,
  error: "",
  loading: false,
};

export const loadAllCoupon = createAsyncThunk(
  "coupon/loadAllCoupon",
  async () => {
    try {
      const { data } = await axios.get(`coupon`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllCouponValid = createAsyncThunk(
  "coupon/loadAllCouponValid",
  async () => {
    try {
      const { data } = await axios.get(`coupon/valid`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadCouponPaginated = createAsyncThunk(
  "coupon/loadCouponPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`coupon?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addSingleCoupon = createAsyncThunk(
  "coupon/addSingleCoupon",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `coupon`,
        data: values,
      });
      toast.success();

      return successHandler(data, "Coupon added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const loadSingleCoupon = createAsyncThunk(
  "coupon/loadSingleCoupon",
  async (id) => {
    try {
      const { data } = await axios.get(`coupon/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addManyCoupon = createAsyncThunk(
  "coupon/addManyCoupon",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `coupon?query=createmany`,
        data: values,
      });

      return successHandler(data, "Coupons added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupon/updateCoupon",
  async ({ id, values }, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "put",
        url: `coupon/${id}`,
        data: values,
      });
      dispatch(loadCouponPaginated({}));
      return successHandler(data, "Coupon updated successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_coupon
export const deleteCoupon = createAsyncThunk(
  "coupon/DeleteCoupon",
  async (id) => {
    try {
      const { data } = await axios({
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `coupon/${id}`,
        data: {
          status: "false",
        },
      });

      return successHandler(data, "Coupon deleted successfully", "warning");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearCoupon: (state) => {
      state.coupon = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllCoupon ======

    builder.addCase(loadAllCoupon.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadAllCoupon ======

    builder.addCase(loadAllCouponValid.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllCouponValid.fulfilled, (state, action) => {
      state.loading = false;
      state.validList = action.payload?.data;
    });

    builder.addCase(loadAllCouponValid.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadCouponPaginated ======

    builder.addCase(loadCouponPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadCouponPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllVoucher;
      state.total = action.payload?.data?.totalVoucher;
    });

    builder.addCase(loadCouponPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleCoupon ======

    builder.addCase(addSingleCoupon.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleCoupon.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.unshift(action.payload?.data);
      state.list = list;
    });

    builder.addCase(addSingleCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleCoupon ======

    builder.addCase(loadSingleCoupon.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload?.data;
    });

    builder.addCase(loadSingleCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for addManyCoupon ======

    builder.addCase(addManyCoupon.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addManyCoupon.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      action.payload?.data.map((item) => {
        list.unshift(item);
      });

      state.list = list;
    });

    builder.addCase(addManyCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for updateCoupon ======

    builder.addCase(updateCoupon.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload?.data;
    });

    builder.addCase(updateCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 4) ====== builders for deleteVatTax ======

    builder.addCase(deleteCoupon.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCoupon.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default couponSlice.reducer;
export const { clearCoupon } = couponSlice.actions;
