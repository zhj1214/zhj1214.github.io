/*
 * @Description: 菜单权限控制
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-29 13:46:00
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-16 16:16:29
 */

// import store from "./store";
// import storage from "store";
// import { ACCESS_TOKEN } from "@utils/constant";
// import { i18nRender } from "@locales";
import NProgress from "nprogress"; // progress bar
import "@/components/NProgress/nprogress.scss"; // progress bar custom style
// import notification from "ant-design-vue/es/notification";
import { localStorage } from "@/utils/localStorage";
// import { setDocumentTitle, domTitle } from "@utils/domUtil";
import { STORAGE, MENU_KEYS } from "@/utils/constant";
import store from "@/store/index";
import router from "./router";

const storage = localStorage;
const notification = (content: string, type = "error") => {
  const w: AnyObject = window;
  const { $notifi } = w;
  $notifi[type]({
    title: "错误信息",
    content,
    duration: 3000,
  });
};

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const allowList = ["test", "login", "register", "registerResult"]; // no redirect allowList
const loginRoutePath = "/user/login"; // 登录页面

const syncRouter = async () => {
  return new Promise<void>((resolve) => {
    // 判断本地路由配置是否有变动
    if (storage.getItem(MENU_KEYS.ADD).length > 0) {
      console.log("有新的路由需要提交");
      const arr: any = [];
      let adds = storage.getItem(MENU_KEYS.ADD);
      adds.forEach((item: any) => {
        item = { ...item, isNetworkOk: true };
        arr.push(store.dispatch("permission/addRouteMenu", item));
      });
      Promise.allSettled(arr).then((results) => {
        //  results 是一个params数组
        // { status: 'fulfilled', value: 42 } 成功
        // { status: 'rejected', reason: -1 } 失败
        results.forEach((item) => {
          if (item.status === "fulfilled") {
            adds = adds.filter((e: any) => {
              return e.id !== item.value.id;
            });
            storage.setItem(MENU_KEYS.ADD, adds);
          }
        });
        edit();
      });
    } else if (storage.getItem(MENU_KEYS.EDIT).length > 0) {
      edit();
    } else {
      deletefn();
    }
    function edit() {
      if (storage.getItem(MENU_KEYS.EDIT).length > 0) {
        console.log("有路由内容发生了编辑，需要更新");
        const arr: any = [];
        let edits = storage.getItem(MENU_KEYS.EDIT);
        edits.forEach((item: any) => {
          item = { ...item, isNetworkOk: true };
          arr.push(store.dispatch("permission/updateRouteMenu", item));
        });

        Promise.allSettled(arr).then((results) => {
          results.forEach((item) => {
            if (item.status === "fulfilled") {
              edits = edits.filter((e: any) => {
                return e.id !== item.value.id;
              });
              storage.setItem(MENU_KEYS.EDIT, edits);
            }
          });
          deletefn();
        });
      } else {
        deletefn();
      }
    }
    function deletefn() {
      if (storage.getItem(MENU_KEYS.DELETE).length > 0) {
        console.log("有路由需要删除");
        let deleteArr = storage.getItem(MENU_KEYS.DELETE);
        const arr: any = [];
        deleteArr.forEach((item: any) => {
          item = { ...item, isNetworkOk: true };
          arr.push(store.dispatch("permission/deleteRouteMenu", item));
        });
        Promise.allSettled(arr).then((results) => {
          results.forEach((item) => {
            if (item.status === "fulfilled") {
              deleteArr = deleteArr.filter((e: any) => {
                return e.id !== item.value.id;
              });
              storage.setItem(MENU_KEYS.DELETE, deleteArr);
            }
          });
          resolve();
        });
      } else {
        resolve();
      }
    }
  });
};

router.beforeEach((to: AnyObject, from: AnyObject, next) => {
  NProgress.start(); // start progress bar
  console.log("to:", to);
  console.log("from:", from);
  // to.meta && typeof to.meta.title !== "undefined" && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`);
  /* has token */
  if (storage.getItem(STORAGE.TOKEN)) {
    // check login user.roles is null
    if (store.state.user.roles.length === 0) {
      // request login userInfo
      store
        .dispatch("user/GetInfo")
        .then((res) => {
          console.info("拿到用户信息", res);
          const roles = res.result && res.result.role;
          syncRouter().then(() => {
            // 根据角色获取用户菜单列表动态增加路由
            store.dispatch("permission/GenerateRoutes", { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              // VueRouter@3.5.0+ New API

              store.state.permission.addRouters.forEach((r: any) => {
                router.addRoute(r);
              });
              // url链接中有重定向字段 redirect 时，登录自动重定向到该地址
              const redirect = decodeURIComponent(
                from.query.redirect || to.query.redirect || to.path
              );
              if (to.path === redirect) {
                // set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true });
              } else {
                // 跳转到目的路由
                console.log("URL中包含redirect地址：开始重定向页面", redirect);
                next({ path: redirect });
              }
            });
          });
        })
        .catch((err) => {
          console.error(err);
          notification("请求用户信息失败，请重试");
          // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
          store.dispatch("user/Logout").then(() => {
            next({ path: loginRoutePath, query: { redirect: to.fullPath } });
          });
        });
    } else {
      next();
    }

    // else if (to.path !== "/404") {
    //   next({ path: "/404", query: { redirect: to.fullPath } });
    // }
  } else if (allowList.includes(to.name)) {
    // 在免登录名单，直接进入
    next();
    NProgress.done(); // finish progress bar
  } else {
    next({ path: loginRoutePath, query: { redirect: to.fullPath } });
    NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
