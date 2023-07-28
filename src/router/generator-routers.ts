import { markRaw } from "vue";
import { MENU_KEYS } from "@/utils/constant";
import local from "store";
// import * as loginService from "@/apis/login";
import { getMenuList } from "@/apis/menu";
import { BasicLayout, RouteView } from "@/layouts";
// import { BasicLayout, BlankLayout, PageView, RouteView } from "@/layouts";

/**
 * @description:  前端路由表
 * 定义的key：Workplace 这个对应创建菜单的路由Component值
 *
 * @author: zhj1214
 */
const constantRouterComponents: AnyObject = {
  // 基础页面 layout 必须引入
  BasicLayout: markRaw(BasicLayout),
  //   BlankLayout,
  RouteView: markRaw(RouteView),
  // PageView,
  // 创建菜单页面
  Menu: () => import("@/views/menuCreate/index.vue"),
  /******************** exception ********************/
  Exception403: () => import("@/views/exception/status-403.vue"),
  Exception404: () => import("@/views/exception/status-404.vue"),
  //   Exception500: () => import(/* webpackChunkName: "fail" */ "@/views/exception/500"),
  /******************** 学习 ********************/
  // 基础
  bfc: () => import("@/views/learnList/base/bfc.vue"),
  promise: () => import("@/views/learnList/base/promise.vue"),
  centerview: () => import("@/views/learnList/base/centerView.vue"),
  // 组件
  dyform: () => import("@/views/learnList/base/bfc.vue"),
  spTable: () => import("@/views/learnList/cus-commponents/sp-table/demoPage.vue"),
  /******************** 仪表盘 ********************/
  Workplace: () => import("@/views/dashboard/Workplace.vue"),
  Analysis: () => import("@/views/dashboard/Analysis.vue"),
  // three.js示例
  touching: () => import("@/views/threejs/one/touching.vue"),
  two: () => import("@/views/threejs/two/index.vue"),
  three: () => import("@/views/threejs/three/index.vue"),
  four: () => import("@/views/threejs/three/index.vue"),
  ykg: () => import("@/views/threejs/share-ykg/one/index.vue"),
  panorama: () => import("@/views/threejs/panorama/index.vue"),
  //   // form
  //   BasicForm: () => import("@/views/form/basicForm"),
  //   StepForm: () => import("@/views/form/stepForm/StepForm"),
  //   AdvanceForm: () => import("@/views/form/advancedForm/AdvancedForm"),
  //   // result
  //   ResultSuccess: () => import(/* webpackChunkName: "result" */ "@/views/result/Success"),
  //   ResultFail: () => import(/* webpackChunkName: "result" */ "@/views/result/Error"),
  //   // account
  //   AccountCenter: () => import("@/views/account/center"),
  //   AccountSettings: () => import("@/views/account/settings/Index"),
  //   BasicSetting: () => import("@/views/account/settings/BasicSetting"),
  //   SecuritySettings: () => import("@/views/account/settings/Security"),
  //   CustomSettings: () => import("@/views/account/settings/Custom"),
  //   BindingSettings: () => import("@/views/account/settings/Binding"),
  //   NotificationSettings: () => import("@/views/account/settings/Notification"),
  //   TestWork: () => import(/* webpackChunkName: "TestWork" */ '@/views/dashboard/TestWork')
};

// 前端未找到页面路由（固定不用改）
// const notFoundRouter = {
//   path: "*",
//   redirect: "/404",
//   hidden: true,
// };

// 根级菜单
const rootRouter: AnyObject = {
  key: "",
  name: "index",
  path: "/",
  id: 0, // 这里不能改，用于新增菜单的校验
  component: "BasicLayout",
  redirect: "/dashboard",
  meta: {
    title: "首页",
  },
  children: [],
};

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
//  {
//   name: "monitor",
//   path: "https://www.baidu.com/",
//   parentId: 1,
//   id: 3,
//   meta: {
//     title: "监控页（外部）",
//     target: "_blank",
//     show: true,
//   },
// },
const listToTree = (list: AnyObject, tree: AnyObject, parentId: any) => {
  list.forEach((item: AnyObject) => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child: AnyObject = {
        ...item,
        key: item.key || item.name,
        children: [],
      };
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id);
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children;
      }
      // 加入到树中
      tree.push(child);
    }
  });
};

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 * @param routerMap
 * @param parent
 * @returns {*}
 */

export const generator = function (
  routerMap: AnyObject,
  parent?: AnyObject
): any {
  return routerMap.map((item: AnyObject) => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } =
      item.meta || {};
    const currentRouter: AnyObject = {
      //  保留这个字段后面用于解决前后端路由表同步问题
      id: item.id,
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ""}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || "",
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      parentId: item.parentId,
      component:
        constantRouterComponents[item.component || item.key] ||
        (() => import(`../views/${item.component}`)),

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title,
        icon: icon || undefined,
        hiddenHeaderContent,
        target,
        permission: item.name,
      },
    };
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true;
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true;
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith("http")) {
      currentRouter.path = currentRouter.path.replace("//", "/");
    }
    // 重定向
    if (item.redirect === "null" || item.redirect === null || !item.redirect)
      item.redirect = "";
    item.redirect && (currentRouter.redirect = item.redirect);
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter);
    }
    return currentRouter;
  });
};

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouterData = (result: AnyObject) => {
  const menuNav = [];
  const childrenNav: AnyObject = [];
  //      后端数据, 根级树数组,  根级 PID
  listToTree(result, childrenNav, "0");
  rootRouter.children = childrenNav;
  menuNav.push(rootRouter);
  console.log("生成原始菜单路由表", menuNav);
  const routers = generator(menuNav);
  // routers.push(notFoundRouter);
  console.log("过滤后，真实加载的路由表routers", routers);
  return routers;
};

export const generatorDynamicRouter = (token: any) => {
  return new Promise((resolve, reject) => {
    let result: any;
    getMenuList(token)
      .then((res: AnyObject) => {
        console.log("服务端返回菜单原始数据response:", res);

        if (!res.data || res.data.length < 1) {
          result = local.get(MENU_KEYS.DATA); // 保存接口信息到本地作为网络异常的数据备份
        } else {
          local.set(MENU_KEYS.DATA, res.data); // 保存接口信息到本地作为网络异常的数据备份
          result = res.data;
        }
        resolve(generatorDynamicRouterData(result));
      })
      .catch((err: any) => {
        console.error("菜单数据获取失败:", err);
        if (process.env.NODE_ENV === "development") {
          result = local.get(MENU_KEYS.DATA) || [
            {
              name: "menu",
              parentId: 0,
              id: 9999,
              meta: {
                icon: "Grid",
                title: "菜单",
                show: true,
              },
              component: "Menu",
            },
          ]; // 保存接口信息到本地作为网络异常的数据备份
          console.log("本地获取菜单原始数据response:", result);
          resolve(generatorDynamicRouterData(result));
        } else {
          reject(err);
        }
      });
  });
};
