import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookSlice from "./slices/book.slice";
import categorySlice from "./slices/category.slice";
import snackbarSlice from "./slices/snackbar.slice";
import userSlice from "./slices/user.slice";

const reducer = combineReducers({
	user: userSlice,
	category: categorySlice,
	snackbar: snackbarSlice,
	book: bookSlice,
});

const store = configureStore({
	reducer,
});

export default store;
