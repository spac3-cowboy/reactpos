import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: 0,
  brand: null,
  error: "",
  loading: false,
};

// ADD_PRODUCT_BRAND
export const addProductBrand = createAsyncThunk(
  "productBrand/addProductBrand",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product-brand/`,
        data: {
          ...values,
        },
      });
      return successHandler(data, "product brand added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_PRODUCT_BRAND
export const deleteProductBrand = createAsyncThunk(
  "productBrand/DeleteProductBrand",
  async (id) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product-brand/${id}`,
        data: {
          status: "false",
        },
      });

      return successHandler(data, "Product brand deleted successfully","warning");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// PRODUCT_BRAND_DETAILS
export const loadSingleProductBrand = createAsyncThunk(
  "productBrand/loadSingleProductBrand",
  async (id) => {
    try {
      const { data } = await axios.get(`product-brand/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// PRODUCT_BRANDS
export const loadAllProductBrand = createAsyncThunk(
  "productBrand/loadAllProductBrand",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`product-brand?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
//UPDATE PRODUCT BRAND
export const updateProductBrand = createAsyncThunk(
  "productBrand/update",
  async ({ id, values }, { dispatch }) => {
	try {
		const {data} = await axios({
			method: "put",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `/product-brand/${id}`,
			data: {
				...values,
      },
    });
    dispatch(loadSingleProductBrand(id))
		return successHandler(data, data.message)
	} catch (error) {
		return errorHandler(error)
	}
}

)
const productBrandSlice = createSlice({
  name: "productBrand",
  initialState,
  reducers: {
    clearBrand: (state) => {
      state.brand = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllProductBrand ======

    builder.addCase(loadAllProductBrand.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllProductBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action?.payload?.data?.getAllProductBrand;
      state.total = action?.payload?.data?.totalProductBrand;
    });

    builder.addCase(loadAllProductBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addProductBrand ======

    builder.addCase(addProductBrand.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addProductBrand.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload.data);
      state.list = list;
    });

    builder.addCase(addProductBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleProductBrand ======

    builder.addCase(loadSingleProductBrand.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleProductBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload?.data;
    });

    builder.addCase(loadSingleProductBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteProductBrand ======

    builder.addCase(deleteProductBrand.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteProductBrand.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteProductBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 5) ========= builders for update product brand ======
    // builder.addCase(updateProductBrand.pending, (state) => {
    //   state.loading = true;
    // })
    // builder.addCase(updateProductBrand.fulfilled, (state) => {
    //   state.loading = false;
    // })
    // builder.addCase(loadAllProductBrand.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload?.error
    //  })
  },
});

export default productBrandSlice.reducer;
export const { clearBrand } = productBrandSlice.actions;
