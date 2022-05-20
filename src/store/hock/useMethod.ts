/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-26 17:53:12
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 16:22:07
 */

import { mapActions, useStore, mapMutations } from "vuex";

function bindStore(list: any) {
  const store = useStore();
  list.forEach((item: AnyObject) => {
    for (const key in item) {
      item[key] = item[key].bind({ $store: store });
    }
  });
}

export default function (moduleName: any, wrapper?: AnyObject): any[] {
  const store: AnyObject = useStore();

  let options = store._modules?.root._rawModule; // 获取根模块的配置

  if (typeof moduleName === "string") {
    options = options.modules[moduleName]; // 获取子模块的配置
  } else {
    wrapper = moduleName;
  }

  const { mutations = {}, actions = {} } = options;

  const mutation_keys = Object.keys(mutations);

  const action_keys = Object.keys(actions);

  const action_wrapper: any = [];

  const mutation_wrapper: any = [];

  wrapper?.forEach((item: any) => {
    // 过滤掉原始配置中不包含的方法
    if (mutation_keys.includes(item)) {
      mutation_wrapper.push(item);
    }
    if (action_keys.includes(item)) {
      action_wrapper.push(item);
    }
  });

  const aactions =
    typeof moduleName === "string"
      ? mapActions(moduleName, action_wrapper)
      : mapActions(action_wrapper);

  const mmutations =
    typeof moduleName === "string"
      ? mapMutations(moduleName, mutation_wrapper)
      : mapMutations(mutation_wrapper);

  bindStore([aactions, mmutations]); // 不绑定store,vuex执行时会报错

  return [aactions, mmutations];
}
