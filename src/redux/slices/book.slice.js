import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateFetch } from "../../utils/fetch";
import { FAILED, LOADING, SUCCESS } from "../../utils/status";
import { setSnackbar } from "./snackbar.slice";

export const getBooks = createAsyncThunk(
	"book/getBooks",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const status = "PENDING";
			const limit = 10;
			const page = 1;

			const response = await privateFetch.get(
				`/api/v1/book?status=${status}&limit=${limit}&page=${page}`
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

export const approveBooks = createAsyncThunk(
	"book/approveBooks",
	async (book, { dispatch, rejectWithValue }) => {
		try {
			const response = await privateFetch.patch(
				`/api/v1/book/accept/${book.id}`
			);
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: response.data.message,
				})
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

export const rejectBooks = createAsyncThunk(
	"book/rejectBooks",
	async (book, { dispatch, rejectWithValue }) => {
		try {
			const response = await privateFetch.patch(
				`/api/v1/book/reject/${book.id}`,
				{ rejectionMessage: book.rejectionMessage }
			);
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: response.data.message,
				})
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
		[getBooks.pending]: (state, action) => {
			return { ...state, getStatus: LOADING };
		},
		[getBooks.fulfilled]: (state, { payload }) => {
			return {
				...state,
				getStatus: SUCCESS,
				data: payload.result,
				totalCount: payload.totalCount,
				page: payload.page,
			};
		},
		[getBooks.rejected]: (state, action) => {
			return { ...state, getStatus: FAILED };
		},
		[approveBooks.pending]: (state, action) => {
			return { ...state, acceptStatus: LOADING };
		},
		[approveBooks.fulfilled]: (state, { payload }) => {
			const newData = state.data.filter(
				(book) => book._id !== payload.result._id
			);
			return {
				...state,
				acceptStatus: SUCCESS,
				data: newData,
				totalCount: payload.totalCount,
				page: payload.page,
			};
		},
		[approveBooks.rejected]: (state, action) => {
			return { ...state, acceptStatus: FAILED };
		},
		[rejectBooks.pending]: (state, action) => {
			return { ...state, rejectStatus: LOADING };
		},
		[rejectBooks.fulfilled]: (state, { payload }) => {
			const newData = state.data.filter(
				(book) => book._id !== payload.result._id
			);
			return {
				...state,
				rejectStatus: SUCCESS,
				data: newData,
				totalCount: payload.totalCount,
				page: payload.page,
			};
		},
		[rejectBooks.rejected]: (state, action) => {
			return { ...state, rejectStatus: FAILED };
		},
	},
});

export default bookSlice.reducer;
