import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  color: null,
  error: "",
  loading: false,
  total: 0,
};

export const loadAllColor = createAsyncThunk("color/loadAllColor", async () => {
  try {
    const { data } = await axios.get(`product-color?query=all`);
    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});

export const loadColorPaginated = createAsyncThunk(
  "color/loadColorPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`product-color?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addSingleColor = createAsyncThunk(
  "color/addSingleColor",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `product-color/`,
        data: values,
      });
      toast.success();

      return successHandler(data, "Color added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const loadSingleColor = createAsyncThunk(
  "color/loadSingleColor",
  async (id) => {
    try {
      const { data } = await axios.get(`product-color/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addManyColor = createAsyncThunk(
  "color/addManyColor",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `product-color?query=createmany`,
        data: values,
      });

      return successHandler(data, "Colors added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateColor = createAsyncThunk(
  "color/updateColor",
  async ({ id, data:values}, { dispatch }) => {

    try {
      const { data } = await axios({
        method: "put",
        url: `product-color/${id}`,
        data: values,
      });
      dispatch(loadColorPaginated({}))
      return successHandler(data, "Color updated successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_color
export const deleteColor = createAsyncThunk("color/DeleteColor", async (id) => {
  try {
    const { data } = await axios({
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `/product-color/${id}`,
      data: {
        status: "false",
      },
    });

    return successHandler(data, "Color deleted successfully","warning");
  } catch (error) {
    return errorHandler(error, true);
  }
});

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    clearColor: (state) => {
      state.color = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllColor ======

    builder.addCase(loadAllColor.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllColor.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllColor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadColorPaginated ======

    builder.addCase(loadColorPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadColorPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data.getAllProductColor;
      state.total = action.payload?.data.totalProductColor;
    });

    builder.addCase(loadColorPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleColor ======

    builder.addCase(addSingleColor.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleColor.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.unshift(action.payload?.data);
      state.list = list;
    });

    builder.addCase(addSingleColor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleColor ======

    builder.addCase(loadSingleColor.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleColor.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload?.data;
    });

    builder.addCase(loadSingleColor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for addManyColor ======

    builder.addCase(addManyColor.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addManyColor.fulfilled, (state, action) => {
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

    builder.addCase(addManyColor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for updateColor ======

    builder.addCase(updateColor.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateColor.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload?.data;
    });

    builder.addCase(updateColor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 4) ====== builders for deleteVatTax ======

    builder.addCase(deleteColor.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteColor.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteColor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default colorSlice.reducer;
export const { clearColor } = colorSlice.actions;
