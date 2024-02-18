import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: [],
  product: null,
  posProduct: null,
  error: "",
  loading: false,
  total: 0,
};

export const loadProduct = createAsyncThunk(
  "product/loadProduct",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`product?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        url: `product/`,
        data: values,
      });
      return successHandler(data, "Product added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData: values, fileConfig }) => {
    try {
      const { data } = await axios({
        method: fileConfig() === "laravel" ? "post" : "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product/${id}`,
        data: values,
      });
      return successHandler(data, "Product updated successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
export const loadSingleProduct = createAsyncThunk(
  "product/loadSingleProduct",
  async (id) => {
    try {
      const { data } = await axios.get(`product/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadPosProduct = createAsyncThunk(
  "product/loadPosProduct",
  async (id) => {
    try {
      const { data } = await axios.get(`product?query=search&key=${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product/${id}`,
        data: {
          status: "false",
        },
      });
      return successHandler(data, "Product deleted successfully", "warning");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (prod) => {
    try {
      const { data } = await axios.get(`product?query=search&key=${prod}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const productSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
    clearProductList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadProduct ======

    builder.addCase(loadProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data.getAllProduct;
      state.total = action.payload?.data.totalProduct;
    });

    builder.addCase(loadProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addProduct ======

    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.unshift(action.payload?.data);
      state.list = list;
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleProduct ======

    builder.addCase(loadSingleProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload?.data;
    });

    builder.addCase(loadSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for loadPosProduct ======

    builder.addCase(loadPosProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadPosProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadPosProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5) ====== builders for deleteProduct ======

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6) ====== builders for searchProduct ======

    builder.addCase(searchProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(searchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 7) ======= builders for update product =============
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
  },
});

export default productSlice.reducer;
export const { clearProduct, clearProductList } = productSlice.actions;
