/*
 * @Description: 本地存储封装
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-08-10 11:42:45
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 13:48:53
 */

/** **************** local基本存储操作 ***************** */

export const localStorage = {
  setItem(key: any, val: any) {
    if (key) window.localStorage.setItem(key, JSON.stringify(val));
  },
  getItem(key: any) {
    const value = window.localStorage.getItem(key) || "";
    if (value && value !== "undefined" && value !== "null") {
      return JSON.parse(value) || "";
    }
    return value;
  },
  removeItem(key: any) {
    if (key) window.localStorage.removeItem(key);
  },
};

/** **************** 封装操作sessionStorage本地存储的方法 ***************** */
export const sessionStorage = {
  // 存储
  setItem(key: any, value: any) {
    if (key) window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  // 取出数据
  getItem(key: any) {
    const value = window.sessionStorage.getItem(key) || "";
    if (value && value !== "undefined" && value !== "null") {
      return JSON.parse(value);
    }
    return value;
  },
  // 删除数据
  removeItem(key: any) {
    if (key) window.sessionStorage.removeItem(key);
  },
};
