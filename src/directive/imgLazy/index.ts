/*
 * @Description: 懒加载指令
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-12-14 13:47:34
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-14 15:37:28
 */

import Lazy from "./lazy";

const lazyPlugin = {
  install(app: any, options: any) {
    const lazy = new Lazy(options);

    app.directive("lazy", {
      mounted: lazy.add.bind(lazy),
      remove: lazy.remove.bind(lazy),
      update: lazy.update.bind(lazy),
    });
  },
};

export default lazyPlugin;
