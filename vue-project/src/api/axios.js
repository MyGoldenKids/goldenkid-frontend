import axios from "axios";
const { VITE_SERVER_URL } = import.meta.env;

export const instance = axios.create({
    baseURL: VITE_SERVER_URL,
    withCredentials: true,
});

// instance.defaults.headers.common["Authorization"] = "";
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.put["Content-Type"] = "application/json";
