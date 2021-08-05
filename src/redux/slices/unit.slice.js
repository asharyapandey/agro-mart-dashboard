import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPrivateFetch } from "../../utils/fetch";
import { setSnackbar } from "../../redux/slices/snackbar.slice";

export const getUnits = createAsyncThunk(
	"unit/getUnits",
	async (_, { dispatch, rejectWithValue, getState }) => {
		try {
			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.get(
				`/api/v1/unit?page=1&limit=10`
			);
			return response.data;
		} catch (error) {
			console.log(error);
			const responseMessage = error.response.data.message;
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: responseMessage,
				})
			);
			return rejectWithValue(responseMessage);
		}
	}
);

export const addUnit = createAsyncThunk(
	"unit/addUnit",
	async (unit, { rejectWithValue, dispatch, getState }) => {
		try {
			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.post("/api/v1/unit", {
				...unit,
			});
			const data = response.data;
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: data.message,
				})
			);
			return data;
		} catch (error) {
			const responseMessage = error.response.data.message;
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: responseMessage,
				})
			);
			return rejectWithValue(responseMessage);
		}
	}
);

export const editUnit = createAsyncThunk(
	"unit/editUnit",
	async (unit, { dispatch, rejectWithValue, getState }) => {
		try {
			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.put(`/api/v1/unit/${unit.id}`, {
				...unit,
			});
			const data = response.data;
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: data.message,
				})
			);
			return data;
		} catch (error) {
			console.log(error);
			const responseMessage = error.response.data.message;
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: responseMessage,
				})
			);
			return rejectWithValue(responseMessage);
		}
	}
);

export const deleteUnit = createAsyncThunk(
	"unit/deleteUnit",
	async (unit, { dispatch, rejectWithValue, getState }) => {
		try {
			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.delete(
				`/api/v1/unit/${unit.id}`
			);
			const data = response.data;
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: data.message,
				})
			);
			return data;
		} catch (error) {
			console.log(error);
			const responseMessage = error.response.data.message;
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: responseMessage,
				})
			);
			return rejectWithValue(responseMessage);
		}
	}
);

const unitSlice = createSlice({
	name: "unit",
	initialState: {
		data: [],
		totalCount: 0,
		page: 0,
		status: "",
		addStatus: "",
		editStatus: "",
		deleteStatus: "",
		message: "",
	},
	extraReducers: {
		[getUnits.pending]: (state, action) => {
			state.status = "LOADING";
		},
		[getUnits.fulfilled]: (state, { payload }) => {
			state.data = payload.result;
			state.totalCount = payload.total;
			state.page = payload.page;
			state.status = "SUCCESS";
		},
		[getUnits.rejected]: (state, action) => {
			state.status = "FAILED";
			console.log(action);
		},
		[addUnit.pending]: (state, action) => {
			state.addStatus = "LOADING";
		},
		[addUnit.fulfilled]: (state, { payload }) => {
			state.data = [...state.data, payload.result];
			state.totalCount += 1;
			state.addStatus = "SUCCESS";
		},
		[addUnit.rejected]: (state, action) => {
			state.addStatus = "FAILED";
			console.log(action);
		},
		[editUnit.pending]: (state, action) => {
			state.editStatus = "LOADING";
		},
		[editUnit.fulfilled]: (state, { payload }) => {
			state.data = state.data.map((data) => {
				if (data._id === payload.result._id) return payload.result;
				else return data;
			});
			state.editStatus = "SUCCESS";
		},
		[editUnit.rejected]: (state, action) => {
			state.editStatus = "FAILED";
			console.log(action);
		},
		[deleteUnit.pending]: (state, action) => {
			state.deleteStatus = "LOADING";
		},
		[deleteUnit.fulfilled]: (state, { payload }) => {
			state.data = state.data.filter((data) => {
				if (data._id === payload.result._id) return false;
				else return true;
			});
			state.deleteStatus = "SUCCESS";
		},
		[deleteUnit.rejected]: (state, action) => {
			state.deleteStatus = "FAILED";
			console.log(action);
		},
	},
});

export default unitSlice.reducer;
