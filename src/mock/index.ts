/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-25 21:36:23
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-14 15:10:59
 */
import tool from "@/utils/tool";
import Mock from "mockjs";

console.log("process.env.ENABLE_LOCAL", process.env);

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
// if (process.env.NODE_ENV !== "production") {
if (tool.isIE()) {
  console.error(
    "[antd-pro] ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV."
  );
}
// 使用同步加载依赖
// 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
console.log("[antd-pro] mock mounting");
export default (async () => {
  await import("./services/menu");
  await import("./services/auth");
  await import("./services/user");
  await import("./services/manage");
  await import("./services/other");
  await import("./services/tagCloud");
  await import("./services/article");
  Mock.setup({
    timeout: 800, // setter delay time
  });
})();

// console.log("[antd-pro] mock mounted");
// }
