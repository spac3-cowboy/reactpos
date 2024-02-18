import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  holdSale: null,
  error: "",
  loading: false,
  statement: null,
  total: 0,
};

//Load All hold sale for Paginated
export const loadAllHoldSalePaginated = createAsyncThunk(
  "holdSale/loadAllHoldSalePaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`sale-invoice/hold?${query}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

// Load All Hold sale
export const loadSingleHoldSale = createAsyncThunk(
  "holdSale/loadSingleHoldSale",
  async (id) => {
    try {
      const { data } = await axios.get(`sale-invoice/hold/${id}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

// search hold sale by order status
export const loadHoldSaleStatement = createAsyncThunk(
  "holdSale/loadHoldSaleStatement",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`sale-invoice?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
// search hold sale
export const loadSearchHoldSale = createAsyncThunk(
  "holdSale/loadSearchHoldSale",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`sale-invoice?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// DELETE_Hoad_sale
export const deleteHoldSale = createAsyncThunk(
  "holdSale/DeleteHoldSale",
  async () => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `sale-invoice/order`,
        data: {
          status: "false",
        },
      });

      return successHandler(data, ` holdSale deleted successfully`, "warning");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateHold = createAsyncThunk(
  "holdSale/updateHold",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `/sale-invoice/hold/${id}`,
        data: values,
      });

      const respData = {
        ...data.createdInvoice,
        customer: data.customer,
      };

      return successHandler(respData, "New product sold");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const holdSaleSlice = createSlice({
  name: "holdSale",
  initialState,
  reducers: {
    clearHoldSale: (state) => {
      state.holdSale = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllHoldSalePaginated ======

    builder.addCase(loadAllHoldSalePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllHoldSalePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.allHoldInvoice;
      state.total = action.payload?.data?._count;
    });

    builder.addCase(loadAllHoldSalePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadSingleHoldSale ======

    builder.addCase(loadSingleHoldSale.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleHoldSale.fulfilled, (state, action) => {
      state.loading = false;
      state.holdSale = action?.payload?.data;
    });

    builder.addCase(loadSingleHoldSale.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 3) ====== builders for loadholdSaleStatement ======

    builder.addCase(loadHoldSaleStatement.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadHoldSaleStatement.fulfilled, (state, action) => {
      state.loading = false;
      state.statement = action.payload?.data;
    });

    builder.addCase(loadHoldSaleStatement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5) ====== builders for Update HoldSale ======

    builder.addCase(deleteHoldSale.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteHoldSale.fulfilled, (state, action) => {
      state.loading = false;
      //   const filtercategory = state.list.filter(
      //     (brand) => brand.id !== parseInt(action.payload?.id) && brand
      //   );

      //   state.list = filtercategory;
    });

    builder.addCase(deleteHoldSale.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
  },
});

export default holdSaleSlice.reducer;
export const { clearHoldSale } = holdSaleSlice.actions;
