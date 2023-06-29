import axios from "axios";
import { localStorage } from "@/utils/localStorage";
import { STORAGE } from "@/utils/constant";
import useMethod from "@/store/hock/useMethod";
import VueAxios from "./axios";
import { ElNotification } from "element-plus";
import { BuildPropType } from "element-plus/lib/utils";

const notificationFn = (
  message: string,
  type:
    | BuildPropType<
        StringConstructor,
        "" | "success" | "warning" | "info" | "error",
        unknown
      >
    | undefined = "error"
) => {
  ElNotification({
    title: "Error",
    message,
    type,
  });
};

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
      notificationFn(data.message);
    }
    if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
      notificationFn("Authorization verification failed");
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
