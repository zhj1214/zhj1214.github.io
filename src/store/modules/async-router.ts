/**
 * 向后端请求用户的菜单，动态生成路由
 */
import local from "store";
import { MENU_KEYS } from "@/utils/constant";
import { constantRouterMap } from "@/config/router.config";
import { generatorDynamicRouter } from "@/router/generator-routers";
import { addMenuInfo, updateMenuInfo, deleteMenu } from "@/apis/menu";

export default {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state: AnyObject, routers: any) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
  },
  actions: {
    /**
     * @description: 获取路由列表
     * @param {*} commit
     * @param {*} data 用户信息
     * @author: zhj1214
     */
    GenerateRoutes(context: AnyObject, data: AnyObject) {
      return new Promise<void>((resolve) => {
        const { token } = data;
        generatorDynamicRouter(token).then((routers) => {
          context.commit("SET_ROUTERS", routers);
          resolve();
        });
      });
    },
    /**
     * @description: 添加路由
     * @param {*} param
     * @author: zhj1214
     */
    addRouteMenu(context: AnyObject, param: AnyObject) {
      console.log(param, "----", param.isNetworkOk);
      return new Promise((reslove, reject) => {
        //   请求网络
        addMenuInfo(param)
          .then((res: AnyObject) => {
            console.log("请求成功", res);
            reslove(param);
          })
          .catch((err: AnyObject) => {
            console.log("请求失败", err);
            if (!param.isNetworkOk) {
              // 获取本地网络缓存
              const list = local.get(MENU_KEYS.DATA);
              list.push(param);
              local.set(MENU_KEYS.DATA, list);
            }
            reject(param);
          });
      });
    },

    /**
     * @description: 编辑路由
     * @param {*} param
     * @author: zhj1214
     */
    updateRouteMenu(context: AnyObject, param: AnyObject) {
      return new Promise((reslove, reject) => {
        //   请求网络
        updateMenuInfo(param)
          .then((res: AnyObject) => {
            console.log("请求成功", res);
            reslove(param);
          })
          .catch((err: AnyObject) => {
            console.log("请求失败", err);

            if (!param.isNetworkOk) {
              // 获取本地网络缓存,找到对应的id路由对象,并修改值
              // eslint-disable-next-line no-var
              var list = local.get(MENU_KEYS.DATA);
              list = getEditObj(param.id);
              // 覆盖本地的内容
              local.set(MENU_KEYS.DATA, list);
            }

            function getEditObj(id: any) {
              list = list.map((item: AnyObject) => {
                if (item.id === id) {
                  item = {
                    ...item,
                    ...param,
                    ...param.meta,
                  };
                }
                if (item.children && item.children.length > 0) {
                  return getEditObj(id);
                }
                return item;
              });
              return list;
            }

            reject(param);
          });
      });
    },
    /**
     * @description: 删除路由
     * @author: zhj1214
     */
    deleteRouteMenu(context: AnyObject, param: AnyObject) {
      return new Promise<void>((reslove, reject) => {
        //   请求网络
        deleteMenu({ id: param.id })
          .then((res: AnyObject) => {
            console.log("请求成功", res);
            reslove();
          })
          .catch((err: AnyObject) => {
            console.log("请求失败", err);
            function getEditObj(id: any) {
              list = list.filter((item: AnyObject) => {
                if (item.id === id) {
                  return false;
                }
                if (item.children && item.children.length > 0) {
                  return getEditObj(id);
                }
                return true;
              });
              return list;
            }
            if (!param.isNetworkOk) {
              // 获取本地网络缓存,找到对应的id路由对象,并修改值
              // eslint-disable-next-line no-var
              var list = local.get(MENU_KEYS.DATA);
              list = getEditObj(param.id);
              // 覆盖本地的内容
              // console.log(list, "dddddddd");
              local.set(MENU_KEYS.DATA, list);
            }

            reject();
          });
      });
    },
  },
};
