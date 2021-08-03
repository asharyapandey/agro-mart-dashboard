import Axios from "axios";
import BASE_URL from "./baseUrl";

export const publicFetch = Axios.create();

export const privateFetch = Axios.create({
	baseURL: BASE_URL,
	headers: {
		authorization: "Bearer " + localStorage.getItem("token"),
	},
});
