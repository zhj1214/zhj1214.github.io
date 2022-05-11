<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-15 15:10:02
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-10 17:48:46
-->
<template>
  <div id="nav" class="view">
    <div class="left">菜单</div>
    <div class="right">
      <div class="header">
        头部
        <div>
          <button type="warning" style="margin: 20px 100px" @click="jump(true)">
            React
          </button>
          <button type="error" @click="jump(false)">Vue</button>
        </div>
      </div>
      <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
      <div class="contentView" v-show="$route.name"><router-view /></div>
      <!-- 子应用渲染区，用于挂载子应用节点 -->
      <div class="contentView" v-show="!$route.name" id="contentapp"></div>
      <div class="footer">备案号信息</div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    // const message = useMessage();
    const show = ref(true);

    return {
      show,
      handleUpdateValue(key, item) {
        console.log(key, item);
        // message.info("[onUpdate:value]: " + JSON.stringify(key));
        // message.info("[onUpdate:value]: " + JSON.stringify(item));
      },
    };
  },
  methods: {
    jump(val) {
      console.log("val", val);
      if (!val) this.$router.push("/wqd_main/wqd-vue/");
      else this.$router.push("/wqd-react");
    },
  },
});
</script>
<style scoped lang="less">
.view {
  display: flex;
  height: 100vh;
  .left {
    width: 100px;
    background-color: aqua;
  }
  .right {
    width: calc(100vw - 100px);

    background-color: blue;
    .header {
      height: 100px;
      background-color: red;
    }
    .contentView {
      height: calc(100% - 200px);
      overflow-y: scroll;
    }
    .footer {
      height: 100px;
      background-color: blueviolet;
    }
  }
}
</style>
