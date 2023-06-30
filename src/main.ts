import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// UI组件库
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import lazyPlugin from "./directive/imgLazy/index";
import p from "./mock";

const app = createApp(App);
// 注入 饿了么组件icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(store).use(router);
app.use(lazyPlugin, {
  // 添加一些配置参数
});
p.then(async () => {
  await import("./permission");
  app.mount("#app");
});
