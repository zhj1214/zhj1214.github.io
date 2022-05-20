<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-12-10 17:56:35
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-16 17:19:15
-->
<template>
  <!-- 头部 -->
  <div class="flex-center" style="justify-content: space-between">
    <h1>three.js第一个示例</h1>
    <!-- 换颜色 -->
    <div class="flex-center">
      <el-color-picker
        @change="colorComplete"
        :show-alpha="false"
        style="width: 140px; height: 42px"
        :predefine="[
          '#FFFFFF',
          '#18A058',
          '#2080F0',
          '#F0A020',
          'rgba(208, 48, 80, 1)',
        ]"
      />
    </div>
    <!-- 鼠标可以控制视角 -->
    <div class="flex-center">
      <n-space>
        <n-switch
          :default-value="true"
          :rail-style="railStyle"
          @update:value="switchOk"
        >
          <template #checked>开启-鼠标控制</template>
          <template #unchecked>关闭-鼠标控制</template>
        </n-switch>
      </n-space>
    </div>
    <!-- 更换材质 -->
    <div class="flex-center">
      <n-button type="info" dashed @click="changeMaterial">更换材质</n-button>
    </div>
    <!-- 动画开关 -->
    <div class="flex-center">
      <div>动画状态：</div>
      <n-button type="primary" dashed @click="startAnimation">开始</n-button>
      <n-button type="error" style="margin-left: 12px" @click="stopAnimation"
        >暂停</n-button
      >
    </div>
  </div>
  <!-- 3d视图 -->
  <div ref="threeDemo"></div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import {
  init,
  createGeometryBox,
  MaterialBox,
  renderScene,
  renderControls,
} from "./touching";

export default defineComponent({
  setup() {
    // 获取dom元素
    const threeDemo = ref(null);
    let material; // 材质对象
    // 关闭、打开鼠标控制
    let isSwitch = true;
    const switchOk = (isOpen) => {
      isSwitch = isOpen;
      console.log(isOpen ? "打开-鼠标控制" : "关闭-鼠标控制");
    };
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
      renderScene((e) => {
        if (isStop) {
          cancelAnimationFrame(e);
        }
      });
    };
    // 更换材质颜色
    const colorComplete = (color) => {
      console.log("selectColor.value", color);
      material.setValues({ color });
    };
    // 更换材质本身
    const changeMaterial = (() => {
      let isChange = false;
      let materialNew;
      return () => {
        if (isChange) {
          const ischangeStyle = !!materialNew;
          materialNew = MaterialBox(ischangeStyle);
          if (ischangeStyle) materialNew = undefined;
        } else {
          const ischangeStyle = !!material;
          material = createGeometryBox(ischangeStyle);
          if (ischangeStyle) material = undefined;
        }
        isChange = !isChange;
      };
    })();
    // 挂载完成
    onMounted(() => {
      // 需要在DOM加载完毕之后才可获取到
      init("demo", threeDemo.value);
      material = createGeometryBox();
      initRenderScene();
      renderControls((controls) => {
        if (isSwitch) {
          if (!controls.enableZoom) controls.enableZoom = true;
          if (!controls.enableRotate) controls.enableRotate = true;
          if (!controls.enablePan) controls.enablePan = true;
          controls.update();
        } else {
          // to disable zoom
          controls.enableZoom = false;
          // to disable rotation
          controls.enableRotate = false;
          // to disable pan
          controls.enablePan = false;
        }
      });
    });

    return {
      changeMaterial,
      colorComplete,
      stopAnimation,
      startAnimation,
      threeDemo,
      switchOk,
      railStyle: ({ focused, checked }) => {
        const style = {};
        if (checked) {
          style.background = "#d03050";
          if (focused) {
            style.boxShadow = "0 0 0 2px #d0305040";
          }
        } else {
          style.background = "#2080f0";
          if (focused) {
            style.boxShadow = "0 0 0 2px #2080f040";
          }
        }
        return style;
      },
    };
  },
});
</script>
