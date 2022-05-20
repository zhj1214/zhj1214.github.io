/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-27 13:59:25
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 11:25:43
 */

export default {
  namespaced: true,
  state: {
    name: "hello world",
    age: 18,
  },
  getters: {
    info(state: any) {
      return state.name + state.age;
    },
  },
  mutations: {
    incrementAge(state: any, param: any) {
      console.log(param, "param");
      state.age = param || 30;
    },
  },
  actions: {
    increment(context: AnyObject) {
      context.commit("incrementAge", 35);
    },
  },
};
