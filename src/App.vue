<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { beforeunloadFn, beforeonunload } from "./utils/closeWindow.ts"; // 关闭窗口提示

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    onMounted(() => {
      window.addEventListener("beforeunload", beforeunloadFn);
      window.addEventListener("unload", beforeonunload);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("beforeunload", beforeunloadFn);
      window.removeEventListener("unload", beforeonunload);
    });

    return {
      locale: zhCn,
    };
  },
});
</script>

<style lang="scss">
@import url("./styles/common.scss");
</style>
