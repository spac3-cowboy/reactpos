import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: null,
  adjustInventory: null,
  error: "",
  loading: false,
};

export const addAdjustInventory = createAsyncThunk(
  "adjustInventory/addAdjustInventory",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `adjust-inventory`,
        data: values,
      });

      return successHandler(data, "New adjust Inventory added");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteAdjustInventory = createAsyncThunk(
  "adjustInventory/deleteAdjustInventory",
  async (id) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `adjust-inventory/${id}`,
        data: {
          status: "false",
        },
      });
      return successHandler(data, "Adjust Inventory deleted");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const loadSingleAdjustInventory = createAsyncThunk(
  "adjustInventory/loadSingleAdjustInventory",
  async (id) => {
    try {
      const { data } = await axios.get(`adjust-inventory/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllAdjustInventory = createAsyncThunk(
  "adjustInventory/loadAllAdjustInventory",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`adjust-inventory?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const adjustInventorySlice = createSlice({
  name: "adjustInventory",
  initialState,
  reducers: {
    clearAdjustInventory: (state) => {
      state.adjustInventory = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllAdjustInventory ======

    builder.addCase(loadAllAdjustInventory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllAdjustInventory.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllAdjustInvoice;
      state.total = action.payload?.data?._count?.id;
    });

    builder.addCase(loadAllAdjustInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addAdjustInventory ======

    builder.addCase(addAdjustInventory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addAdjustInventory.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addAdjustInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleAdjustInventory ======

    builder.addCase(loadSingleAdjustInventory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleAdjustInventory.fulfilled, (state, action) => {
      state.loading = false;
      state.adjustInventory = action.payload?.data.adjustInvoice;
    });

    builder.addCase(loadSingleAdjustInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteAdjustInventory ======

    builder.addCase(deleteAdjustInventory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteAdjustInventory.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteAdjustInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default adjustInventorySlice.reducer;
export const { clearAdjustInventory } = adjustInventorySlice.actions;
