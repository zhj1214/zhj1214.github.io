<template>
  <div class="moduleView">log-detail</div>
</template>
<script lang="ts" setup name="logDetail">
import { reactive, computed } from "vue";

// 页面参数
const props = defineProps({
  // id
  id: {
    type: String,
    default: "",
  },
});
console.log("页面参数：", props);
// 页面属性
const pageData = reactive({
  abs: "",
});
</script>
<style lang="scss" scoped>
.moduleView {
}
</style>
