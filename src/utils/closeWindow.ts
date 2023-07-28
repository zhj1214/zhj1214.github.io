import { STORAGE } from "@/utils/constant";
let beforeUnload_time = 0; // 间隔时间

export const beforeunloadFn = function (e: any) {
  e = e || window.event;
  // 兼容IE8和Firefox 4之前的版本
  localStorage.setItem("e", JSON.stringify(e));
  if (e) {
    e.returnValue = "关闭提示111"; // 目前都无法自定义提示内容
  }
  // 记录时间
  beforeUnload_time = new Date().getTime();
};

export const beforeonunload = function () {
  const gap_time = new Date().getTime() - beforeUnload_time;
  localStorage.setItem("gap_time_close", `${gap_time}`);
  // 判断是窗口关闭还是刷新，小于5代表关闭，否则就是刷新。
  if (gap_time <= 5) {
    localStorage.removeItem(STORAGE.TOKEN); // 如果是登录状态，关闭窗口前，移除用户 ,必须发送同步请求
  }
};
