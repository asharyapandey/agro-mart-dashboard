import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateFetch } from "../../utils/fetch";
import { setSnackbar } from "../../redux/slices/snackbar.slice";

export const getCategories = createAsyncThunk(
	"category/getCategories",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await privateFetch.get(
				`/api/v1/categories?page=1&limit=10`
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

export const addNewCategory = createAsyncThunk(
	"category/addNewCategory",
	async (newCategory, { rejectWithValue, dispatch }) => {
		try {
			const imageResponse = await privateFetch.post("/api/v1/upload", {
				data: newCategory.image,
			});
			const image = imageResponse.data.url;
			const categoryResponse = await privateFetch.post(
				"/api/v1/category",
				{
					category: newCategory.category,
					slug: newCategory.slug,
					image,
				}
			);
			const data = categoryResponse.data;
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

export const editCategory = createAsyncThunk(
	"category/editCategory",
	async (category, { dispatch, rejectWithValue }) => {
		try {
			let image = category.image;
			if (!category.sameImage) {
				const imageResponse = await privateFetch.post(
					"/api/v1/upload",
					{
						data: category.image,
					}
				);
				image = imageResponse.data.url;
			}
			const categoryResponse = await privateFetch.put(
				`/api/v1/categories/${category.id}`,
				{
					category: category.category,
					slug: category.slug,
					image,
				}
			);
			const data = categoryResponse.data;
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

export const deleteCategory = createAsyncThunk(
	"category/deleteCategory",
	async (category, { dispatch, rejectWithValue }) => {
		try {
			const categoryResponse = await privateFetch.delete(
				`/api/v1/categories/${category.id}`
			);
			const data = categoryResponse.data;
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

const categorySlice = createSlice({
	name: "category",
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
		[getCategories.pending]: (state, action) => {
			state.status = "LOADING";
		},
		[getCategories.fulfilled]: (state, { payload }) => {
			state.data = payload.result;
			state.totalCount = payload.total;
			state.page = payload.page;
			state.status = "SUCCESS";
		},
		[getCategories.rejected]: (state, action) => {
			state.status = "FAILED";
			console.log(action);
		},
		[addNewCategory.pending]: (state, action) => {
			state.addStatus = "LOADING";
		},
		[addNewCategory.fulfilled]: (state, { payload }) => {
			state.data = [...state.data, payload.result];
			state.totalCount += 1;
			state.addStatus = "SUCCESS";
		},
		[addNewCategory.rejected]: (state, action) => {
			state.addStatus = "FAILED";
			console.log(action);
		},
		[editCategory.pending]: (state, action) => {
			state.editStatus = "LOADING";
		},
		[editCategory.fulfilled]: (state, { payload }) => {
			state.data = state.data.map((data) => {
				if (data._id === payload.result._id) return payload.result;
				else return data;
			});
			state.editStatus = "SUCCESS";
		},
		[editCategory.rejected]: (state, action) => {
			state.editStatus = "FAILED";
			console.log(action);
		},
		[deleteCategory.pending]: (state, action) => {
			state.deleteStatus = "LOADING";
		},
		[deleteCategory.fulfilled]: (state, { payload }) => {
			state.data = state.data.filter((data) => {
				if (data._id === payload.result._id) return false;
				else return true;
			});
			state.deleteStatus = "SUCCESS";
		},
		[deleteCategory.rejected]: (state, action) => {
			state.deleteStatus = "FAILED";
			console.log(action);
		},
	},
});

export default categorySlice.reducer;
