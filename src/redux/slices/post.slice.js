import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateFetch } from "../../utils/fetch";
import { FAILED, LOADING, SUCCESS } from "../../utils/status";
import { setSnackbar } from "./snackbar.slice";

export const getPosts = createAsyncThunk(
	"post/getPosts",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const status = "PENDING";
			const limit = 10;
			const page = 1;

			const response = await privateFetch.get(
				`/api/v1/posts?status=${status}&limit=${limit}&page=${page}`
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

const bookSlice = createSlice({
	name: "book",
	initialState: {
		data: [],
		totalCount: 0,
		page: 0,
		getStatus: "",
		rejectStatus: "",
		acceptStatus: "",
	},
	extraReducers: {
		[getPosts.pending]: (state, action) => {
			return { ...state, getStatus: LOADING };
		},
		[getPosts.fulfilled]: (state, { payload }) => {
			return {
				...state,
				getStatus: SUCCESS,
				data: payload.result,
				totalCount: payload.totalCount,
				page: payload.page,
			};
		},
		[getPosts.rejected]: (state, action) => {
			return { ...state, getStatus: FAILED };
		},
	},
});

export default bookSlice.reducer;
