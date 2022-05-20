<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-12-01 21:16:24
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-13 17:29:49
-->
<template>
  <div>
    <div v-if="!meta.keepAlive">
      <router-view />
    </div>
    <div v-else-if="isKeepAlive || meta.keepAlive">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import { app } from "@/mixin";

export default defineComponent({
  name: "RouteView",
  props: {
    keepAlive: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const insetance = app();
    console.log(insetance.$router.currentRoute.value, "insetance.$router");
    let { meta } = insetance.$router.currentRoute.value;
    // eslint-disable-next-line no-prototype-builtins
    if (!meta.hasOwnProperty("keepAlive")) {
      meta.keepAlive = false;
    }

    meta = reactive(meta);
    return {
      isKeepAlive: props.keepAlive,
      meta,
    };
  },
});
</script>
