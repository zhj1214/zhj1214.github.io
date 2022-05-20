<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-12-10 17:56:35
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 20:31:43
-->
<template>
  <!-- 头部 -->
  <div class="flex-center" style="justify-content: space-between">
    <h1>鼠标控制</h1>
  </div>
  <!-- 3d视图 -->
  <div ref="threeDemo"></div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import { init, createBox, renderScene } from "./two.js";

export default defineComponent({
  setup() {
    // 获取dom元素
    const threeDemo = ref(null);
    // 控制动画的暂停开始
    let isStop = false;
    const stopAnimation = function () {
      isStop = true;
    };
    const startAnimation = function () {
      isStop = false;
      initRenderScene();
    };
    const initRenderScene = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderScene((e) => {
        if (isStop) cancelAnimationFrame(e);
      });
    };
    // 挂载完成
    onMounted(() => {
      // 需要在DOM加载完毕之后才可获取到
      console.log(threeDemo.value);
      init("demo", threeDemo.value);
      createBox();
      initRenderScene();
    });

    return {
      stopAnimation,
      startAnimation,
      threeDemo,
    };
  },
});
</script>

<style></style>
