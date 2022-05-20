<template>
  <div>
    <div v-for="menu in menus" :key="menu.path">
      <!-- 没有子项菜单 -->
      <el-menu-item
        v-if="!menu.children || menu.children.length === 0"
        :index="menu.path"
      >
        <el-icon>
          <component :is="menu.icon" :key="menu.id" />
        </el-icon>
        <template #title>{{ menu.label }}</template>
      </el-menu-item>
      <!-- 有子菜单 -->
      <el-sub-menu v-else :index="menu.path">
        <template #title>
          <el-icon>
            <component :is="menu.icon" :key="menu.id" />
          </el-icon>
          <span v-if="!isCollapsed">{{ menu.label }}</span>
        </template>
        <!-- 子菜单 -->
        <el-menu-item
          v-for="sub in menu.children"
          :key="sub.path"
          :index="sub.path"
          >{{ sub.label }}</el-menu-item
        >
      </el-sub-menu>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, toRefs } from "vue";
import { useState } from "@/store/hock/useProperty";

/**
 * @description: 构造tree的加载数据
 * @param {*} arr
 * @param {*} paraentName
 * @author: zhj1214
 */
function createListData(arr, paraentName = "") {
  const subs = [];
  arr.forEach((rout) => {
    if (rout.children && rout.children.length > 0) {
      var children = createListData(rout.children, rout.name) || [];
    }

    subs.push({
      ...rout,
      key: `${paraentName}${paraentName ? "-" : ""}${rout.name}`,
      label: rout.meta.title || "标题",
      icon: rout.meta.icon,
      children,
    });
  });
  return subs;
}

export default defineComponent({
  props: {
    // 侧边栏菜单是否收起
    collapsed: {
      type: Boolean,
    },
  },
  setup(props) {
    // 析构，响应式属性collapsed
    const { collapsed } = toRefs(props);
    // 菜单列表
    const menus = ref([]);
    // 当前路由
    const routerState = useState("permission", ["addRouters"]);
    const routers = routerState.addRouters.value[0].children;
    console.log("原始路由列表", routerState.addRouters.value);

    /**
     * @description: 将要渲染的菜单
     * @author: zhj1214
     */
    function updateMenu() {
      const routersList = createListData(routers);
      menus.value = routersList;
      console.log("将要渲染的菜单：", routersList);
    }

    onMounted(() => {
      updateMenu();
    });

    return {
      activeKey: ref(null),
      menus,
      isCollapsed: collapsed,
    };
  },
});
</script>
