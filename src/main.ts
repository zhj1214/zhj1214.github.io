import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
// UI组件库
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import lazyPlugin from "./directive/imgLazy/index";
import p from "./mock";
import * as MITO from "@supaur/qdjk-web";

const app = createApp(App);
// 注入 饿了么组件icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus, {
  locale: zhCn,
});
// 加载状态管理
app.use(store);
// 加载路由
app.use(router);
// 加载监控插件
console.log("MITO--", MITO);

app.use(MITO.MitoVue as any);
MITO.init({
  apikey: "zhj1214-12346",
  trackKey: "zhj1214-12346",
  debug: true,
  useImgUpload: false,
  silentConsole: true,
  maxBreadcrumbs: 20,

  appOnShow: (data: any) => {
    console.log("appOnShow-data-", data);
  },
  appOnLaunch: (data: any) => {
    console.log("appOnLaunch-data-", data);
  },
  beforeAppAjaxSend: (data: any) => {
    console.log("beforeAppAjaxSend-data-", data);
  },
  configReportWxRequest: (data: any) => {
    console.log("configReportWxRequest-data-", data);
  },
  configReportXhr: (request: any, data: any) => {
    console.log("configReportXhr-data-", data);
  },
  backTrackerId: () => {
    return "123456";
  },
  
  // beforePushBreadcrumb: (breadcrumb: any, hint: any) => {
  //   console.log("beforePushBreadcrumb-breadcrumb-", breadcrumb);
  //   console.log("beforePushBreadcrumb-hint-", hint);
  //   return breadcrumb; // 返回数据=会导致Breadcrumb无限嵌套自己
  // },
  // configReportUrl: "http://localhost:2021/errors/upload", // 上报到服务端的地址
  // trackDsn: "http://localhost:2021/errors/upload",
  dsn: "http://localhost:7001/errors/upload",
});
// 加载图片懒加载插件
app.use(lazyPlugin, {
  // 添加一些配置参数
});
p.then(async () => {
  await import("./permission");
  app.mount("#app");
});
