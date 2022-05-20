/*
 * @Description: 混入工具函数
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-27 14:19:53
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-16 15:21:41
 */
import { getCurrentInstance } from "vue";
// 全局Vue绑定的属性对象
let interance: any;
/**
 * @description: 获取绑定在Vue上的全局对象
 * @author: zhj1214
 */
export const app = () => {
  if (interance) {
    return interance.appContext.config.globalProperties;
  } else {
    interance = getCurrentInstance();
    return interance ? interance.appContext.config.globalProperties : this;
  }
};
