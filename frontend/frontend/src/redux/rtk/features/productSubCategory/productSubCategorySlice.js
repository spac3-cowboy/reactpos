import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: null,
  subCategory: null,
  error: "",
  loading: false,
};

// ADD_SUB_CATEGORY
export const addProductSubCategory = createAsyncThunk(
  "productSubCategory/addProductSubCategory",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product-sub-category/`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "Product sub-category added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
//UPDATE PRODUCT SUB CATEGORY
export const updateProductSubCategory = createAsyncThunk(
  "ProductSubCategory/update",
  async ({ id, values }, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product-sub-category/${id}`,
        data: {
          ...values,
        },
      });
      dispatch(loadSingleProductSubCategory(id));
      return successHandler(data, data.message);
      // return data;
    } catch (error) {
      return errorHandler(error);
    }
  }
);
// DELETE_SUB_CATEGORY
export const deleteProductSubCategory = createAsyncThunk(
  "productSubCategory/deleteProductSubCategory",
  async (id) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product-sub-category/${id}`,
        data: {
          status: "false",
        },
      });

      return successHandler(
        data,
        "Product sub-category deleted successfully",
        "warning"
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// SUB_CATEGORY_DETAILS
export const loadSingleProductSubCategory = createAsyncThunk(
  "productSubCategory/loadSingleProductSubCategory",
  async (id) => {
    try {
      const { data } = await axios.get(`product-sub-category/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// loadSingleProductSubCategoryForEcommerceProduct
export const loadSingleProductSubCategoryForEcommerceProduct = createAsyncThunk(
  "productSubCategory/loadSingleProductSubCategoryForEcommerceProduct",
  async (id) => {
    try {
      const { data } = await axios.get(
        `e-commerce/subcategory/sub-category-details/${id}`
      );

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// SUB_CATEGORYS
export const loadAllProductSubCategory = createAsyncThunk(
  "productSubCategory/loadAllProductSubCategory",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`product-sub-category?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// SUB_CATEGORYS for EcommeceProduct

export const loadAllProductSubCategoryForEcommerceProduct = createAsyncThunk(
  "productSubCategory/loadAllProductSubCategoryForEcommerceProduct",
  async () => {
    try {
      const { data } = await axios.get(
        `e-commerce/subcategory/sub-category-details`
      );
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const productSubCategorySlice = createSlice({
  name: "productSubCategory",
  initialState,
  reducers: {
    clearSubCategory: (state) => {
      state.sub_category = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllProductSubCategory ======

    builder.addCase(loadAllProductSubCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllProductSubCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllProductSubCategory;
      state.total = action.payload?.data?.totalProductSubCategory;
    });

    builder.addCase(loadAllProductSubCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllEcomProductSubCategory ======

    builder.addCase(
      loadAllProductSubCategoryForEcommerceProduct.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      loadAllProductSubCategoryForEcommerceProduct.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload?.data;
      }
    );

    builder.addCase(
      loadAllProductSubCategoryForEcommerceProduct.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );

    // 2) ====== builders for addProductSubCategory ======

    builder.addCase(addProductSubCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addProductSubCategory.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload?.data);
      state.list = list;
    });

    builder.addCase(addProductSubCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleProductSubCategory ======

    builder.addCase(loadSingleProductSubCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleProductSubCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.subCategory = action.payload?.data;
    });

    builder.addCase(loadSingleProductSubCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleProductSubCategoryForEcommerceProduct ======

    builder.addCase(
      loadSingleProductSubCategoryForEcommerceProduct.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      loadSingleProductSubCategoryForEcommerceProduct.fulfilled,
      (state, action) => {
        state.loading = false;
        state.sub_category = action.payload?.data;
      }
    );

    builder.addCase(
      loadSingleProductSubCategoryForEcommerceProduct.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );

    // 4) ====== builders for deleteProductSubCategory ======

    builder.addCase(deleteProductSubCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteProductSubCategory.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteProductSubCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default productSubCategorySlice.reducer;
export const { clearSubCategory } = productSubCategorySlice.actions;
