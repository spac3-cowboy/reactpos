import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";

const initialState = {
	loading: false,
	data: null,
	error: false,
	errorMassage: "",
};

export const getSetting = createAsyncThunk("data/settingData", async () => {
	try {
		const { data } = await axios.get(`setting`);
		return successHandler(data);
	} catch (error) {
		return errorHandler(error);
	}
});

export const updateSetting = createAsyncThunk(
	"data/updateSetting",
	async (values) => {
		try {
			const { data } = await axios.post(`setting`, values);
			return successHandler(data);
		} catch (error) {
			return errorHandler(error);
		}
	}
);

const settingSlice = createSlice({
	name: "setting",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getSetting.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(getSetting.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload?.data;
		});

		builder.addCase(getSetting.rejected, (state, action) => {
			state.loading = false;
			state.error = true;
			state.errorMassage = action.payload.message;
		});

		builder.addCase(updateSetting.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateSetting.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload?.data;
		});

		builder.addCase(updateSetting.rejected, (state, action) => {
			state.loading = false;
			state.error = true;
			state.errorMassage = action.payload.message;
		});
	},
});

export default settingSlice.reducer;
