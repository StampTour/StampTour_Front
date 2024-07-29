import apiClient from "../apiClient";

export const getUserInfo = () => {
	return apiClient.get("/userinfo");
};

export const saveQRdata = (id) => {
	return apiClient.post("/savestamp", {id});
};
