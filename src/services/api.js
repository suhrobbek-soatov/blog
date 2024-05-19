import http from "axios";

import { getStorage } from "../utils/utils";
import { BASE_API_URL } from "../utils/constants";

http.defaults.baseURL = BASE_API_URL;

http.interceptors.request.use(config => {
  const token = getStorage("token");
  const authorization = token ? `Token ${token}` : "";
  config.headers.Authorization = authorization;

  return config;
});

export default http;
