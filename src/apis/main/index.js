import apiClient from "../apiClient";

export const getUserInfo = () => {
	return apiClient.get("/user-info");
};
