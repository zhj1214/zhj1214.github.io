/*
 * @Description: 状态管理
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-25 10:13:24
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 16:18:18
 */

import { createStore } from "vuex";
import userDemo from "./modules/userDemo";
import user from "./modules/user";
import permission from "./modules/async-router";

export default createStore<RootState>({
  state: {
    isLogin: false,
    statusBarHeight: 0,
    isLoading: false, // 全局按钮loading状态
    content: "hello guy",
  },
  getters: {
    getContent(state) {
      // 字符串颠倒
      return state.content.split("").reverse().join("");
    },
  },
  mutations: {
    updateContent(state, payload) {
      if (typeof payload === "object") {
        payload = "welcome";
      }
      state.content = `hello ${payload}`;
    },
  },
  actions: {
    update({ state, commit }) {
      console.log("update:", state);
      commit("updateContent", "world");
    },
  },

  modules: {
    user,
    permission,
    userDemo,
  },
});
