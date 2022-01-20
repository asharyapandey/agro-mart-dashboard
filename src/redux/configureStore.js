import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postSlice from "./slices/post.slice";
import categorySlice from "./slices/category.slice";
import productSlice from "./slices/product.slice";
import snackbarSlice from "./slices/snackbar.slice";
import unitSlice from "./slices/unit.slice";
import userSlice from "./slices/user.slice";

const reducer = combineReducers({
	user: userSlice,
	category: categorySlice,
	snackbar: snackbarSlice,
	post: postSlice,
	unit: unitSlice,
	product: productSlice,
});

const store = configureStore({
	reducer,
});

export default store;
