import axios from "axios";

const http = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    if (config.headers) {
      if (!config.headers["x-app-code"]) {
        config.headers["x-app-code"] = "brand";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 0) {
      return Promise.reject(new Error(res.message || "Error"));
    }
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
