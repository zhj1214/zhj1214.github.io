/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-26 17:50:13
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 16:23:25
 */

import { mapState, mapGetters, useStore, createNamespacedHelpers } from "vuex";
import { computed } from "vue";

const storeState = function (storeStateFns: AnyObject): AnyObject {
  // 对数据进行转换
  const storeStateValue: AnyObject = {};
  // 使用computed将状态包裹一层再返回
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: useStore() }); // 不绑定store,vuex执行时会报错
    storeStateValue[fnKey] = computed(fn);
  });
  return storeStateValue;
};

/**
 * 对store导出数据做封装
 */
export const useState = (moduleName: any, wrapper: AnyObject) => {
  let mapFn = mapState;
  if (typeof moduleName === "string") {
    mapFn = createNamespacedHelpers(moduleName).mapState; // 访问子模块的状态
  } else wrapper = moduleName;
  return storeState(mapFn(wrapper));
};

/**
 * 对getters做封装
 */
export const useGetter = (moduleName: any, wrapper: AnyObject) => {
  let mapFn = mapGetters;
  if (typeof moduleName === "string") {
    mapFn = createNamespacedHelpers(moduleName).mapGetters; // 访问子模块的getter
  } else wrapper = moduleName;

  return storeState(mapFn(wrapper));
};
