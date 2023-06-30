<template>
  <div>
    <template v-for="first in menus" :key="first.path">
      <!-- 一级：没有子项菜单 -->
      <el-menu-item
        v-if="!first.children || first.children.length === 0"
        :index="first.path"
      >
        <el-icon>
          <component :is="first.icon" :key="first.id" />
        </el-icon>
        <template #title>{{ first.label }}</template>
      </el-menu-item>
      <!-- 一级子菜单 -->
      <el-sub-menu v-else :index="first.path">
        <!-- 二级：标题插槽 -->
        <template #title>
          <el-icon>
            <component :is="first.icon" :key="first.id" />
          </el-icon>
          <span v-if="!isCollapsed">{{ first.label }}</span>
        </template>
        <!-- 内容 -->
        <template v-for="second in first.children" :key="second.path">
          <!-- 二级：子菜单 -->
          <el-menu-item
            v-if="!second.children || second.children.length === 0"
            :index="second.path"
          >
            {{ second.label }}
          </el-menu-item>
          <!-- 二级：子菜单 -->
          <el-sub-menu v-else :index="second.path">
            <template #title>
              <el-icon>
                <component :is="second.icon" :key="second.id" />
              </el-icon>
              <span v-if="!isCollapsed">{{ second.label }}</span>
            </template>
            <!-- 三级：子菜单 -->

            <el-menu-item
              :teleported="false"
              v-for="third in second.children"
              :key="third.path"
              :index="third.path"
            >
              <div class="third-text">
                {{ third.label }}
              </div>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-sub-menu>
    </template>
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

<style lang="scss" scoped>
.third-text {
  @include multi-line-omit(1);
  display: block !important;
  padding-left: 25px;
}
</style>
