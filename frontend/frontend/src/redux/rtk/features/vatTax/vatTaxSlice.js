import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  vatTax: null,
  error: "",
  loading: false,
  edit: false,
  statement: null,
  total: 0,
};

// ADD_VAT_TAX
export const addVatTax = createAsyncThunk(
  "vatTax/addVatTax",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product-vat/`,
        data: {
          ...values,
        },
      });
      return successHandler(data, "Vat/Tax Type Added");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// UPDATE_VAT_TAZ
export const updateVatTax = createAsyncThunk(
  "vatTax/UpdateVatTax",
  async ({ id, values }, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product-vat/${id}`,
        data: values,
      });
      dispatch(loadAllVatTaxPaginated({ status: true, page: 1, count: 10 }));
      return successHandler(data, "VatTax Update Success");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_VAT_TAZ
export const deleteVatTax = createAsyncThunk(
  "vatTax/DeleteVatTax",
  async (id) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product-vat/${id}`,
        data: {
          status: "false",
        },
      });

      return successHandler(
        data,
        `Id No ${id}, VatTax deleted successfully`,
        "warning"
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// VAT_TAZ_DETAILS
export const loadSingleVatTax = createAsyncThunk(
  "vatTax/loadSingleVatTax",
  async (id) => {
    try {
      const { data } = await axios.get(`product-vat/${id}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

// VAT_TAX Statement
export const loadVatTaxStatement = createAsyncThunk(
  "vatTax/loadVatTaxStatement",
  async () => {
    try {
      const { data } = await axios.get(`product-vat/statement`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// Load all VAT_TAX
export const loadAllVatTax = createAsyncThunk(
  "vatTax/loadAllVatTax",
  async () => {
    try {
      const { data } = await axios.get(`product-vat?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
//Load All VAT_TAX for Paginated
export const loadAllVatTaxPaginated = createAsyncThunk(
  "vatTax/loadAllVatTaxPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`product-vat?${query}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

const vatTaxSlice = createSlice({
  name: "vatTax",
  initialState,
  reducers: {
    editVatTax: (state, action) => {
      if (action.payload) {
        state.edit = action.payload;
      } else {
        state.edit = false;
      }
    },
    clearVatTax: (state) => {
      state.brand = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllVatTax ======

    builder.addCase(loadAllVatTax.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllVatTax.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllVatTax.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadAllVatTaxPaginated ======

    builder.addCase(loadAllVatTaxPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllVatTaxPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllProductVat;
      state.total = action.payload?.data?.totalProductVat;
    });

    builder.addCase(loadAllVatTaxPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addVatTax ======

    builder.addCase(addVatTax.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addVatTax.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action?.payload?.data);
      state.list = list;
    });

    builder.addCase(addVatTax.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 3) ===== builders for update Vat Tax ===========
    builder.addCase(updateVatTax.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateVatTax.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateVatTax.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 4) ====== builders for loadSingleVatTax ======

    builder.addCase(loadSingleVatTax.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleVatTax.fulfilled, (state, action) => {
      state.loading = false;
      state.vatTax = action?.payload?.data;
    });

    builder.addCase(loadSingleVatTax.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 5) ====== builders for loadVatTaxStatement ======

    builder.addCase(loadVatTaxStatement.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadVatTaxStatement.fulfilled, (state, action) => {
      state.loading = false;
      state.statement = action.payload?.data;
    });

    builder.addCase(loadVatTaxStatement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6) ====== builders for deleteVatTax ======

    builder.addCase(deleteVatTax.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteVatTax.fulfilled, (state, action) => {
      state.loading = false;
      const filtercategory = state.list.filter(
        (brand) => brand.id !== parseInt(action.payload?.id) && brand
      );

      state.list = filtercategory;
    });

    builder.addCase(deleteVatTax.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
  },
});

export default vatTaxSlice.reducer;
export const { clearVatTax, editVatTax } = vatTaxSlice.actions;
