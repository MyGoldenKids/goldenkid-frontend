import axios from "axios";
const { VITE_SERVER_URL } = import.meta.env;

export const instance = axios.create({
    baseURL: VITE_SERVER_URL,
    withCredentials: false, // true로 바뀌야 함
});

// instance.defaults.headers.common["Authorization"] = "";
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.put["Content-Type"] = "application/json";
