<template>
  <div class="view">
    <h1>404</h1>
    <el-button type="primary" @click="backPage"> Back Home </el-button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useState } from "@/store/hock/useProperty";
import { app } from "@/mixin";

export default defineComponent({
  setup() {
    // 刷新了页面就不存在这个动态添加的路由了
    const state = useState("permission", ["addRouters"]);
    /**
     * @description: 返回
     * @author: zhj1214
     */
    const instance = app();
    const backPage = () => {
      if (state && state.addRouters.value[0]) {
        instance.$router.push({ path: "/dashboard" });
      } else {
        instance.$router.push({ path: "/user" });
      }
    };
    return {
      backPage,
    };
  },
});
</script>
<style scoped>
.view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
</style>
