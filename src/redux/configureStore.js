import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookSlice from "./slices/book.slice";
import categorySlice from "./slices/category.slice";
import productSlice from "./slices/product.slice";
import snackbarSlice from "./slices/snackbar.slice";
import unitSlice from "./slices/unit.slice";
import userSlice from "./slices/user.slice";

const reducer = combineReducers({
	user: userSlice,
	category: categorySlice,
	snackbar: snackbarSlice,
	book: bookSlice,
	unit: unitSlice,
	product: productSlice,
});

const store = configureStore({
	reducer,
});

export default store;
