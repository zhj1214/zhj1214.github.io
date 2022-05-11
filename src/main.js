/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-15 15:10:02
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-11 16:38:54
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import eventEmitter from "./utils/EventEmitter";
// 自定义事件
eventEmitter.constructor();
// import naive from "naive-ui";
// 通用字体
// import "vfonts/Lato.css";
// 等宽字体
// import "vfonts/FiraCode.css";
import {
  registerMicroApps,
  start,
  addGlobalUncaughtErrorHandler,
} from "qiankun";

const loader = (loading) => {
  console.log(loading, "--loading--");
  eventEmitter.trigger("afterUnmount", true);
};
// .use(naive)
createApp(App).use(store).use(router).mount("#app");

// 在主应用中注册微应用
registerMicroApps(
  [
    {
      name: "my-react", // app name registered
      // entry: "//36.133.84.100:23502/wqd/react/",
      entry: "//zhj1214.gitee.io/wqd-react/", // 这里是重点 gitee
      container: "#contentapp",
      activeRule: "/wqd-react",
      loader,
    },
    {
      name: "my-vue",
      // entry: { scripts: ["//localhost:7100/main.js"] },
      // entry: "//localhost:7000/wqd_main/wqd-vue/", // 这里是重点 开发
      entry: "//zhj1214.gitee.io/wqd-vue/", // 这里是重点 gitee
      container: "#contentapp",
      activeRule: "/wqd-vue",
      loader,
    },
  ],
  {
    beforeLoad: () => {
      console.log("加载前");
    },
    beforeMount: () => {
      console.log("挂载前");
    },
    afterMount: () => {
      console.log("挂在后");
    },
    beforeUnmount: () => {
      console.log("销毁前");
    },
    afterUnmount: (val, b) => {
      console.log(b, "销毁后", val);
      eventEmitter.trigger("afterUnmount", false);
    },
  }
);

// 启动: 增加样式隔离
start({
  sandbox: {
    experimentalStyleIsolation: true,
  },
});

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler((event) => {
  console.error(event);
  const { message } = event;
  // 加载失败时提示

  console.error("子应用加载失败，请检查应用是否可运行", message);
});
