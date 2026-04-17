import axios from "axios";
import { clearAuthStorage, getStoredToken } from "../../utils/auth.js";

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
	const token = getStoredToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;

		if (status === 401 || status === 403) {
			clearAuthStorage();

			if (window.location.pathname !== "/login") {
				window.location.replace("/login");
			}
		}

		return Promise.reject(error);
	},
);

export default api;
