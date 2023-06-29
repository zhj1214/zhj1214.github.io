// eslint-disable-next-line
// import HelloWorld from "@/components/HelloWorld.vue";
import { defineAsyncComponent, markRaw } from "vue";
import { UserLayout } from "@/layouts";
import Vuex from "@/views/vuexView.vue";

const _Axios = defineAsyncComponent(() => import("@/views/axios.vue"));

// const login = defineAsyncComponent(() => import("@/views/user/Login.vue"), {
//   delay: 200,
//   timeout: 3000,
//   errorComponent: ErrorComponent,
//   loadingComponent: LoadingComponent,
// });

// const RouteView = {
//   name: "RouteView",
//   render: h => h("router-view"),
// };

export const asyncRouterMap = [];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: "/",
    name: "index",
    redirect: "/dashboard",
  },
  {
    path: "/vuex",
    name: "vuex",
    component: Vuex,
  },
  {
    path: "/axios",
    name: "Axios",
    component: _Axios,
  },
  {
    path: "/user",
    component: markRaw(UserLayout),
    redirect: "/user/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",

        component: () => import("@/views/user/loginPage.vue"),
      },
      // {
      //   path: "register",
      //   name: "register",
      //   component: () => import("@/views/user/Register.vue"),
      // },
      // {
      //   path: "register-result",
      //   name: "registerResult",
      //   component: () => import("@/views/user/RegisterResult.vue"),
      // },
      // {
      //   path: "recover",
      //   name: "recover",
      //   component: undefined,
      // },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/exception/status-404.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];
