import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  trailBalance: null,
  balanceSheet: null,
  incomeStatement: null,
  updateAccount: null,
  mainAccount: null,
  list: null,
  account: null,
  error: "",
  loading: false,
  total: 0,
};

// ADD_ACCOUNT
export const addAccount = createAsyncThunk(
  "account/addAccount",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `account/`,
        data: {
          ...values,
        },
      });
      return successHandler(data, "Account added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_ACCOUNT
export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `account/${id}`,
      });

      return successHandler(data, "Account deleted successfully", "warning");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// ACCOUNT_DETAILS
export const loadSingleAccount = createAsyncThunk(
  "account/loadSingleAccount",
  async (id) => {
    try {
      const { data } = await axios({
        method: "get",
        url: `account/${id}`,
      });

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// ACCOUNTS
export const loadAllAccount = createAsyncThunk(
  "account/loadAllAccount",
  async () => {
    try {
      const { data } = await axios.get(`account?type=sa&query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
// ACCOUNTS
export const loadAllAccountPaginated = createAsyncThunk(
  "account/loadAllAccountPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`account?type=sa&${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
// Trail Balance
export const loadTrailBalance = createAsyncThunk(
  "account/loadTrailBalance",
  async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `account?query=tb`,
      });
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
// Balance sheet
export const loadBalanceSheet = createAsyncThunk(
  "account/loadBalanceSheet",
  async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `account?query=bs`,
      });
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
// Income Statement
export const loadIncomeStatement = createAsyncThunk(
  "account/IncomeStatement",
  async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `account?query=is`,
      });
      return successHandler(data);
    } catch (error) {
      return errorHandler(error, false);
    }
  }
);

// Main Account
export const loadMainAccount = createAsyncThunk(
  "account/loadMainAccount",
  async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `account?query=ma`,
      });

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// update Account
export const loadUpdateAccount = createAsyncThunk(
  "account/loadUpdateAccount",
  async ({ id, values }, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `account/${id}`,
        data: {
          ...values,
        },
      });
      dispatch(loadSingleAccount(id));
      return successHandler(data, "Account updated successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccount: (state) => {
      state.account = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllAccount ======

    builder.addCase(loadAllAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadAllAccount ======

    builder.addCase(loadAllAccountPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllAccountPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllSubAccount;
      state.total = action.payload?.data?.totalSubAccount;
    });

    builder.addCase(loadAllAccountPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addAccount ======

    builder.addCase(addAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addAccount.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload?.data);
      state.list = list;
    });

    builder.addCase(addAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 3) ====== builders for loadSingleAccount ======

    builder.addCase(loadSingleAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.account = action.payload?.data;
    });

    builder.addCase(loadSingleAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for Trail Balance ======
    builder.addCase(loadTrailBalance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadTrailBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.trailBalance = action.payload?.data;
    });
    builder.addCase(loadTrailBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5) ====== builders for Balance Sheet ======
    builder.addCase(loadBalanceSheet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadBalanceSheet.fulfilled, (state, action) => {
      state.loading = false;
      state.balanceSheet = action.payload?.data;
    });
    builder.addCase(loadBalanceSheet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6) ====== builders for Income Statement ======
    builder.addCase(loadIncomeStatement.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadIncomeStatement.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeStatement = action.payload?.data;
    });
    builder.addCase(loadIncomeStatement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 7) ====== builders for Income Statement ======
    builder.addCase(loadUpdateAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUpdateAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.updateAccount = action.payload?.data;
    });
    builder.addCase(loadUpdateAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 8) ====== builders for Income Statement ======
    builder.addCase(loadMainAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadMainAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.mainAccount = action.payload?.data;
    });
    builder.addCase(loadMainAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 9) ====== builders for deleteAccount ======

    builder.addCase(deleteAccount.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.loading = false;

      const filterAccount = state.list.filter(
        (acc) => acc.id !== parseInt(action.payload?.data.id) && acc
      );

      state.list = filterAccount;
    });

    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default accountSlice.reducer;
export const { clearAccount } = accountSlice.actions;
