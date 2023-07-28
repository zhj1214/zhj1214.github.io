<!--
 * @Description: 路由未匹配到-path: "/:pathMatch(.*)",
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2023-07-28 10:26:03
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-07-28 15:12:40
-->
<template>
  <div class="entry">
    <!-- <router-view /> -->
  </div>
</template>

<script lang="ts">
/**
 * 路由未匹配到基础路由 src/config/router.config.ts
 * 1. 判断是否登录,未登录=> 跳转登录路由；
 * 2. 已登录：获取菜单数据，匹配是否存在这个路由，不存在则跳转 404，否则重定向
 * */
import { STORAGE } from "@/utils/constant";
import { localStorage } from "@/utils/localStorage";
import { getMenuList } from "@/apis/menu";
import { generatorDynamicRouterData } from "@/router/generator-routers.ts";
import { ElNotification } from "element-plus";

export default {
  name: "entry",
  data() {
    return {};
  },
  created() {
    console.log(
      "src/layouts/entry：路由未匹配到基础路由，当前页面地址：",
      window.location.href
    );
    const token = localStorage.getItem(STORAGE.TOKEN);
    // 1. 已登录
    if (token) {
      // 1.1 获取路径path
      let path = "/";
      if (window.location.href.split("/#/")[1]) {
        path += window.location.href.split("/#/")[1];
        // 1.2 获取菜单数据
        getMenuList(token)
          .then((res: any) => {
            console.log("服务端返回菜单原始数据response:", res);
            const routes = generatorDynamicRouterData(res.data);
            let isSame = false;
            routes.forEach((first: any) => {
              if (first.path === path) {
                isSame = true;
              } else if (first.children && first.children.length > 0) {
                first.children.forEach((second: any) => {
                  if (second.path === path) {
                    isSame = true;
                  } else if (second.children && second.children.length > 0) {
                    second.children.forEach((third: any) => {
                      if (third.path === path) {
                        isSame = true;
                      }
                    });
                  }
                });
              }
            });
            // 1.3 根据匹配结果跳转主页，在重定向到目标页面
            if (isSame) {
              this.$router.push({
                path: "/dashboard",
                query: { redirect: path },
              });
            } else {
              this.$router.push({ path: "/404" });
            }
          })
          .catch((err: any) => {
            ElNotification({
              title: "",
              message: "菜单数据获取失败!",
              type: "error",
            });
          });
      } else {
        this.$router.push({ path: "/404" });
      }
    }
    // 2. 未登录
    else {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>
