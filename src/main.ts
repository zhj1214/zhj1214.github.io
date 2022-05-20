import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// UI组件库
import "./styles/element/index.scss"; // 必须写在UI组件之前，避免以避免 sass 混合变量的问题（官方）https://element-plus.org/zh-CN/guide/theming.html#%E5%A6%82%E4%BD%95%E8%A6%86%E7%9B%96%E5%AE%83%EF%BC%9F
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
