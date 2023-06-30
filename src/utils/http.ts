import axios from "axios";
import { localStorage } from "@/utils/localStorage";
import { STORAGE } from "@/utils/constant";
import useMethod from "@/store/hock/useMethod";
import VueAxios from "./axios";
import { ElNotification } from "element-plus";

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL || "",
  timeout: 6000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error: AnyObject) => {
  if (error.response) {
    const { data } = error.response;
    // 从 localstorage 获取 token
    const token = localStorage.getItem(STORAGE.TOKEN);
    if (error.response.status === 403) {
      ElNotification({
        title: "",
        message: data.message,
        type: "error",
      });
    }
    if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
      ElNotification({
        title: "",
        message: "Authorization verification failed",
        type: "error",
      });
      if (token) {
        const [logout] = useMethod(["Logout"]);
        logout().then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      }
    }
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config: AnyObject) => {
  const token = localStorage.getItem(STORAGE.TOKEN);
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers["Access-Token"] = token;
  }
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response) => {
  const { code } = response.data;
  // 1. 成功
  if (code === 10000 || code === 200) {
    return response.data;
  }
  // 2. 失败提示
  if (response.data && response.data.msg) {
    ElNotification({
      title: "",
      message: response.data.msg,
      type: "error",
    });
  } else {
    console.error("请求失败", response.data);
  }
  // 3. 失败code处理
  // if (code === 401) {

  // }
  return response.data;
}, errorHandler);

const installer = {
  vm: {},
  install(app: any) {
    app.use(VueAxios, request);
  },
};

export default request;

export { installer as VueAxios, request as axios };
