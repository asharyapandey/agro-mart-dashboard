import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: { token: localStorage.getItem("token") || "", user: {} },
	reducers: {
		setToken: (state, action) => {
			return { ...state, token: action.payload };
		},
		removeToken: (state, action) => {
			return { ...state, token: "" };
		},
	},
});

export const { setToken, removeToken } = userSlice.actions;

export default userSlice.reducer;
