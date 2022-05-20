<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-19 23:42:38
 * @LastEditors: zhj1214
 * @LastEditTime: 2021-12-14 17:44:50
-->
<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition :name="getTransitionName" mode="out-in" appear>
        <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "MainView",
  components: {},
  props: {
    notNeedKey: {
      type: Boolean,
      default: false,
    },
    animate: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    // 需要缓存的路由组件 的name
    const keepAliveComponents = computed(() => ["menu", "dashboard"]);

    // 动画效果
    const getTransitionName = computed(() => {
      return "";
    });

    return {
      keepAliveComponents,
      getTransitionName,
    };
  },
});
</script>

<!-- <style lang="less" scoped></style> -->
