import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  user: null,
  error: "",
  loading: false,
  total: 0,
};

export const addStaff = createAsyncThunk("user/addStaff", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `user/register`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "Registration successful");
  } catch (error) {
    return errorHandler(error, true);
  }
});

export const updateStaff = createAsyncThunk(
  "user/updateStaff",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/${id}`,
        data: values,
      });

      return successHandler(data, "User updated successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
export const deleteStaff = createAsyncThunk("user/deleteStaff", async (id) => {
  try {
    const { data } = await axios({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `user/${id}`,
      data: {
        status: "false",
      },
    });

    return successHandler(data, "User successfully deleted", "warning");
  } catch (error) {
    return errorHandler(error, true);
  }
});

export const loadSingleStaff = createAsyncThunk(
  "user/loadSingleStaff",
  async (id) => {
    try {
      const data = await axios.get(`user/${id}`);
      return {
        data,
        message: "success",
      };
    } catch (error) {
      errorHandler(error, false);
    }
  }
);

export const loadAllStaff = createAsyncThunk(
  "user/loadAllStaff",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`user?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addUser = createAsyncThunk("user/addUser", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `user/login`,
      data: {
        ...values,
      },
    });

    localStorage.setItem("access-token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("user", data.username);
    localStorage.setItem("id", data.id);
    localStorage.setItem("isLogged", true);
    toast.success();

    return successHandler(data, "Login Successfully Done");
  } catch (error) {
    return errorHandler(error, true);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllStaff ======

    builder.addCase(loadAllStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data.getAllUser;
      state.total = action.payload?.data.totalUser;
    });

    builder.addCase(loadAllStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addStaff ======

    builder.addCase(addStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addStaff.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for addUser ======

    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.user)) {
        state.user = [];
      }
      const user = [...state.user];
      user.push(action.payload?.data);
      state.user = user;
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for loadSingleStaff ======

    builder.addCase(loadSingleStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload?.data;
    });

    builder.addCase(loadSingleStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5) ====== builders for deleteStaff ======

    builder.addCase(deleteStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteStaff.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
