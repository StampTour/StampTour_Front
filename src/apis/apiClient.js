import axios from "axios";
import config from "./config";
import {Cookies} from "react-cookie";

const cookies = new Cookies();

const apiClient = axios.create({
	baseURL: config.API_URL,
	timeout: 2000,
});

apiClient.interceptors.request.use(async (config) => {
	const accessToken = cookies.get("token");

	if (accessToken) {
		config.headers[
			"Authorization"
		] = `Bearer ${accessToken}`;
	}

	return config;
});

export default apiClient;
