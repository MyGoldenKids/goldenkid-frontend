import axios from "axios";
const { VITE_SERVER_URL } = import.meta.env;

export const fileInstance = axios.create({
    baseURL: VITE_SERVER_URL,
    withCredentials: false, // true로 바뀌야 함
});

// instance.defaults.headers.common["Authorization"] = "";
fileInstance.defaults.headers.post["Content-Type"] = "multipart/form-data";
