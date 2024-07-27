import axios from "axios";
import storage from "./storage";

const http = axios.create({ baseURL: import.meta.env.VITE_APP_BASE_API_URL });

http.interceptors.request.use(config => {
  const token = storage.local.get("token");
  config.headers.Authorization = token ? `Token ${token}` : "";
  return config;
});

export default http;
