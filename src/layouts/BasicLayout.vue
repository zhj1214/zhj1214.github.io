<template>
  <div class="view">
    <el-container>
      <el-aside style="width: auto">
        <div class="left">
          <!-- 菜单开关 -->
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="true">收起</el-radio-button>
            <el-radio-button :label="false">展开</el-radio-button>
          </el-radio-group>
          <div style="width: 100%">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              unique-opened
              :collapse="isCollapse"
              @open="handleOpen"
              @close="handleClose"
              @select="selectMenu"
            >
              <AsideMenu :collapsed="isCollapse" />
            </el-menu>
          </div>
        </div>
      </el-aside>
      <el-container class="right">
        <el-header>
          <div class="header">
            <div class="title">{{ meta.title }}</div>
          </div>
        </el-header>
        <el-main>
          <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
          <div class="contentView" v-show="$route.name">
            <MainView></MainView>
          </div>
          <!-- 子应用渲染区，用于挂载子应用节点 -->
          <div class="contentView" v-show="!$route.name" id="contentapp"></div>
        </el-main>
        <!-- <el-footer>
          <div class="footer">备案号信息</div>
        </el-footer> -->
      </el-container>
    </el-container>

    <!-- 右边内容 -->
    <!-- <div></div> -->
  </div>
</template>
<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, ref, reactive, watch } from "vue";
import AsideMenu from "./components/Menu/index.vue";
import MainView from "./components/Main/index.vue";
import { computed } from "@vue/reactivity";

export default defineComponent({
  name: "BasicLayout",
  components: {
    AsideMenu,
    MainView,
  },
  setup() {
    // 当前路由信息
    const currentRoute = useRoute();
    // console.log("currentRoute:", currentRoute.meta);
    const meta = reactive(currentRoute.meta);
    // 展开状态
    const isCollapse = ref(false);
    // 菜单展开的最小宽度
    const contentW = computed(() => {
      return !isCollapse.value ? "185px" : "initial";
    });
    const router = useRouter(); // 当前路由
    /**
     * @description: 菜单展开事件
     * @author: zhj1214
     */
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log("展开-菜单:", key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log("收起-菜单:", key, keyPath);
    };
    /**
     * @description: 选择了哪个菜单
     * @author: zhj1214
     */
    const selectMenu = (
      key: string,
      keyPath: string[],
      item: any,
      routeResult: any
    ) => {
      console.log(
        "selectMenu:",
        key,
        "--",
        keyPath,
        "--",
        item,
        "*---",
        routeResult,
        "--"
      );

      if (/http(s)?:/.test(key)) {
        window.open(key, item.meta.target || "_blank");
      } else {
        router.push({ path: key });
      }
    };

    watch(
      () => currentRoute.meta,
      (newVal, oldval) => {
        console.log(newVal.title, "--跳转--", oldval.title);
        meta.title = newVal.title;
      }
    );

    return {
      selectMenu,
      isCollapse,
      handleClose,
      handleOpen,
      meta,
      contentW,
    };
  },
});
</script>
<style scoped lang="scss">
.view {
  display: flex;
  // width: 100vw;
  height: 100vh;
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    min-width: v-bind("contentW");
    padding-top: 16px;
    // overflow-y: scroll;
    .layout-sider {
      min-height: 100vh;
      box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
      position: relative;
      z-index: 13;
      transition: all 0.2s ease-in-out;
    }
  }
  .right {
    // width: calc(100vw - v-bind("contentW"));
    // width: calc(100% - 185px);
    width: 100%;
    max-width: 100%;
    height: 100vh;
    .header {
      height: 64px;
      box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
      transition: all 0.2s ease-in-out;
      width: 100%;
      // box-sizing: border-box;

      .title {
        padding: 0 24px;
        font-size: 22px;
        font-weight: 900;
        line-height: 64px;
      }
    }
    .contentView {
      height: calc(100% - 64px);
      overflow-y: scroll;
      padding: 24px;
    }
    .footer {
      height: 64px;
      box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
      transition: all 0.2s ease-in-out;
      width: 100%;
    }
  }
}
</style>
<style>
body {
  margin: 0;
}
/* 使用class = contentView 隐藏滚动条 */
.contentView::-webkit-scrollbar {
  width: 0;
}

.hideScrollBar {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
</style>
