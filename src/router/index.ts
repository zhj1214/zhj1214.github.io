// RouteRecordRaw
import { createRouter, createWebHashHistory } from "vue-router";
import { constantRouterMap } from "@/config/router.config";
// import HomeView from "../views/HomeView.vue";

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     name: "home",
//     component: HomeView,
//   },
//   {
//     path: "/about",
//     name: "about",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
//   },
// ];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap,
  // routes,
});

export default router;
