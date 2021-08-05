import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPrivateFetch } from "../../utils/fetch";
import { setSnackbar } from "../../redux/slices/snackbar.slice";

export const getProducts = createAsyncThunk(
	"products/getProducts",
	async (_, { dispatch, rejectWithValue, getState }) => {
		try {
			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.get(
				`/api/v1/products?page=1&limit=10`
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

export const addNewProduct = createAsyncThunk(
	"product/addNewProduct",
	async (product, { rejectWithValue, dispatch, getState }) => {
		try {
			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.post("/api/v1/product", {
				...product,
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

export const editProduct = createAsyncThunk(
	"product/editProduct",
	async (product, { dispatch, rejectWithValue, getState }) => {
		try {
			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.put(
				`/api/v1/product/${product.id}`,
				{
					...product,
				}
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

export const deleteProduct = createAsyncThunk(
	"product/deleteProduct",
	async (product, { dispatch, rejectWithValue, getState }) => {
		try {
			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.delete(
				`/api/v1/product/${product.id}`
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

const productSlice = createSlice({
	name: "product",
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
		[getProducts.pending]: (state, action) => {
			state.status = "LOADING";
		},
		[getProducts.fulfilled]: (state, { payload }) => {
			state.data = payload.result;
			state.totalCount = payload.total;
			state.page = payload.page;
			state.status = "SUCCESS";
		},
		[getProducts.rejected]: (state, action) => {
			state.status = "FAILED";
			console.log(action);
		},
		[addNewProduct.pending]: (state, action) => {
			state.addStatus = "LOADING";
		},
		[addNewProduct.fulfilled]: (state, { payload }) => {
			state.data = [...state.data, payload.result];
			state.totalCount += 1;
			state.addStatus = "SUCCESS";
		},
		[addNewProduct.rejected]: (state, action) => {
			state.addStatus = "FAILED";
			console.log(action);
		},
		[editProduct.pending]: (state, action) => {
			state.editStatus = "LOADING";
		},
		[editProduct.fulfilled]: (state, { payload }) => {
			state.data = state.data.map((data) => {
				if (data._id === payload.result._id) return payload.result;
				else return data;
			});
			state.editStatus = "SUCCESS";
		},
		[editProduct.rejected]: (state, action) => {
			state.editStatus = "FAILED";
			console.log(action);
		},
		[deleteProduct.pending]: (state, action) => {
			state.deleteStatus = "LOADING";
		},
		[deleteProduct.fulfilled]: (state, { payload }) => {
			state.data = state.data.filter((data) => {
				if (data._id === payload.result._id) return false;
				else return true;
			});
			state.deleteStatus = "SUCCESS";
		},
		[deleteProduct.rejected]: (state, action) => {
			state.deleteStatus = "FAILED";
			console.log(action);
		},
	},
});

export default productSlice.reducer;
