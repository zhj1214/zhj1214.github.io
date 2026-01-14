import axios from "axios";

/**
 * API 基础地址配置
 * - 开发环境：使用 Vite 代理（/api -> localhost:23501）
 * - 生产环境：直接请求 Render 后端
 *
 * 通过环境变量 VITE_API_BASE 配置，支持自定义后端地址
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE || "/api";

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 生产环境 Render 冷启动可能较慢
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
