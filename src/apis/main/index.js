import apiClient from "../apiClient";

export const getUserInfo = () => {
	return apiClient.get("/user-info");
};

export const saveQRdata = (id) => {
	return apiClient.post("/save-stamp", {id});
};
