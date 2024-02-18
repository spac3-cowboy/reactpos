import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  page: null,
  error: "",
  loading: false,
  total: null,
};

export const loadAllPrintPagePaginated = createAsyncThunk(
  "printPage/loadAllPrintPage",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`page-size?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSinglePrintPage = createAsyncThunk(
  "printPage/loadSinglePrintPage",
  async (id) => {
    try {
      const { data } = await axios.get(`page-size/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addSinglePrintPage = createAsyncThunk(
  "printPage/addSinglePrintPage",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `page-size`,
        data: values,
      });

      return successHandler(data, "Page size added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);


export const updatePrintPage = createAsyncThunk(
  "printPage/updatePrintPage",
  async ({ id, data: values }, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "put",
        url: `page-size/${id}`,
        data: values,
      });
      dispatch(loadAllPrintPagePaginated({ status: "true", page: 1, count: 10 }));
      return successHandler(data, "Print page updated successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deletePrintPage = createAsyncThunk(
  "print/deletePrintPage",
  async (id) => {
    try {
      const { data } = await axios({
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `page-size/${id}`,
        data: {
          status: "false",
        },
      });

      return successHandler(data, "print page deleted successfully", "warning");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const printPageSlice = createSlice({
  name: "printPage",
  initialState,
  reducers: {
    clearPrintPage: (state) => {
      state.coupon = null;
    },
  },
  extraReducers: (builder) => {
    //1......... load all print page
    builder.addCase(loadAllPrintPagePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllPrintPagePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data.getAllPageSize;
      state.total = action.payload?.data.totalPageSizeCount;
    });

    builder.addCase(loadAllPrintPagePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
      
    //2 load single print page ==========
     builder.addCase(loadSinglePrintPage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSinglePrintPage.fulfilled, (state, action) => {
      state.loading = false;
      state.page = action.payload?.data;
    });

    builder.addCase(loadSinglePrintPage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });


    // 3 update single print page =========
     builder.addCase(updatePrintPage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updatePrintPage.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(updatePrintPage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
      
      // 4 delete print page ==============
       builder.addCase(deletePrintPage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deletePrintPage.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deletePrintPage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    
    builder.addCase(addSinglePrintPage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSinglePrintPage.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.unshift(action.payload?.data);
      state.list = list;
    });

    builder.addCase(addSinglePrintPage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

  },
});

export default printPageSlice.reducer;
export const { clearPrintPage } = printPageSlice.actions;
