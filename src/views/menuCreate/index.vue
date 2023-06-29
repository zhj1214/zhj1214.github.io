<template>
  <div style="display: flex">
    <!-- 左边菜单展示 -->
    <div class="leftView flex-column">
      <div class="header flex-center" style="justify-content: space-between">
        <div class="leftView-title">菜单列表</div>
        <div class="flex-center">
          <div class="btn" @click="addMenu">新建菜单</div>
          <div class="btn" @click="editMenu">编辑</div>
          <div class="btn" @click="menuDelete">删除</div>
        </div>
      </div>
      <el-tree
        :data="data"
        node-key="id"
        :highlight-current="true"
        :default-expanded-keys="[0]"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
    </div>
    <!-- 右边的内容 -->
    <div class="rightView">
      <div class="header flex-center" style="justify-content: space-between">
        <div class="rightView-title">路由信息</div>
      </div>

      <div style="padding: 0 16px">
        <el-form
          :model="form"
          ref="formRef"
          label-position="left"
          label-width="160px"
          :rules="rules"
          :disabled="updateDisabled"
          :style="{
            maxWidth: '95%',
          }"
        >
          <el-form-item label="路由Name:" prop="name">
            <el-input
              placeholder="name必须唯一，且与父级相关联，如：当前菜单1-2-3，新增二级菜单，则输入2-x，三级菜单：则输入3-x"
              v-model="form.name"
            />
          </el-form-item>
          <el-form-item label="路由Title:" prop="title">
            <el-input placeholder="路由的Title" v-model="form.title" />
          </el-form-item>
          <el-form-item label="路由Component:" prop="component">
            <el-input
              placeholder="请输入constantRouterComponents中的字段,或者RouteView，没有则无法展示页面，一级菜单默认为RouteView"
              v-model="form.component"
            />
          </el-form-item>
          <el-form-item label="路由Redirect:" prop="redirect">
            <el-input
              placeholder="请输入重定向path,可选"
              v-model="form.redirect"
            />
          </el-form-item>
          <el-form-item label="是否在菜单中显示:" prop="switchValue">
            <el-switch v-model="form.switchValue" />
          </el-form-item>
        </el-form>
        <!-- 按钮权限 -->
        <div class="flex-center" style="padding: 0 40px">
          <div style="width: 100px">按钮权限：</div>
          <el-select v-model="btns" multiple>
            <el-option
              v-for="item in btnPermissionArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div>
          <div class="btn-commit" @click="commitDataMenu">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import local from "store";
import { useState } from "@/store/hock/useProperty";
import useMethod from "@/store/hock/useMethod";
import { MENU_KEYS } from "@/utils/constant";
import { app } from "../../mixin";
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
    if (rout.redirect === "null" || rout.redirect === null || !rout.redirect)
      rout.redirect = "";
    subs.push({
      ...rout,
      key: `${paraentName}${paraentName ? "-" : ""}${rout.name}`,
      label: rout.meta.title || "标题",
      children,
    });
  });
  return subs;
}

export default defineComponent({
  setup() {
    const state = useState("permission", ["addRouters"]);
    const [actions] = useMethod("permission", [
      "addRouteMenu",
      "updateRouteMenu",
      "deleteRouteMenu",
    ]);
    console.log("原始路由列表", state.addRouters.value);
    const routers = createListData(state.addRouters.value);
    console.log("路由信息加工后：", routers);

    // 初始化当前选中的节点
    let selectMenu = reactive({});
    const saveMenuStatus = ref(""); // 当前的状态：新增、编辑、删除
    // 初始化表单数据
    const model = ref({
      name: null,
      title: null,
      component: null,
      redirect: null,
      switchValue: true,
      show: false,
    });
    const updateDisabled = ref(true); // 是否禁用表单

    /**
     * @description: 点击tree时
     * @author: zhj1214
     */
    const handleNodeClick = (data) => {
      console.log("我点击了菜单：", data);
      selectMenu = data;
      model.value.name = data.key;
      model.value.title = data.label;
      model.value.component = data.component.name;
      model.value.show = true;
      model.value.redirect = data.parentId === "0" ? data.redirect : "";
      updateDisabled.value = true;
    };

    /**
     * @description: 新增菜单
     * @author: zhj1214
     */

    const getLocalMenu = (key) => {
      if (selectMenu && !selectMenu.name) {
        return app().$message.error("请先选择要操作的树节点");
      }
      return local.get(key || "") || [];
    };

    const addMenu = () => {
      const arr = getLocalMenu(MENU_KEYS.ADD);
      if (arr.length === undefined) return;
      // 重置表单的值
      model.value = {
        name: null,
        title: null,
        component: null,
        redirect: null,
        switchValue: true,
      };
      updateDisabled.value = false;
      saveMenuStatus.value = "add";
    };

    const editMenu = () => {
      const arr = getLocalMenu(MENU_KEYS.EDIT);
      if (arr.length === undefined) return;
      updateDisabled.value = false;
      saveMenuStatus.value = "edit";
    };

    const menuDelete = () => {
      const arr = getLocalMenu(MENU_KEYS.DELETE);
      // 提示
      app()
        .$confirm("你确定删除这个路由吗？", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          saveMenuStatus.value = "delete";
          //   请求网络
          actions
            .deleteRouteMenu(selectMenu)
            .then(() => {
              window.location.reload();
              app().$message.success("删除成功");
            })
            .catch(() => {
              arr.push(selectMenu);
              local.set(MENU_KEYS.DELETE, arr);
              window.location.reload();
            });
        })
        .catch(() => {
          app().$message.error("取消");
        });
    };
    // 表单提交
    const formRef = ref(null);
    const commitDataMenu = () => {
      formRef.value.validate((isok, results) => {
        if (isok) {
          //   校验name
          const leve = selectMenu.key.split("-").length;
          if (
            (leve > 1 && !model.value.name.includes("-")) ||
            (leve <= 1 && model.value.name.includes("-"))
          ) {
            app().$message.success("请确认路由name是否正确，一级菜单忽略");
          }
          //  生成parentId
          const curLeveArr = model.value.name.split("-"); // 级别
          let subsId = `${selectMenu.id}10`; // 默认id
          if (curLeveArr.length - 1 > 0) {
            const num = selectMenu.children ? selectMenu.children.length : 0;
            subsId = `${selectMenu.id || ""}${num + 1}`; // 重新赋值id
          }
          if (saveMenuStatus.value === "add") {
            const arr = getLocalMenu(MENU_KEYS.ADD); // 获取本地要添加的菜单数据
            const param = {
              name:
                curLeveArr.length === 1
                  ? model.value.name
                  : curLeveArr[curLeveArr.length - 1],
              parentId: selectMenu.id || 0,
              id: subsId,
              meta: {
                icon: "dashboard",
                title: model.value.title,
                show: model.value.switchValue,
              },
              component:
                curLeveArr.length === 1 ? "RouteView" : model.value.component,
              redirect: model.value.redirect || "",
            };
            arr.push(param);

            //   请求网络
            actions
              .addRouteMenu(param)
              .then(() => {
                app().$message.success("新增成功");
                window.location.reload();
              })
              .catch(() => {
                //   保存到本地,等待下一次有网络的时候更新
                local.set(MENU_KEYS.ADD, arr);
                window.location.reload();
              });
          } else if (saveMenuStatus.value === "edit") {
            const param = {
              id: selectMenu.id,
              parentId: selectMenu.parentId,
              name:
                curLeveArr.length === 1
                  ? model.value.name
                  : curLeveArr[curLeveArr.length - 1],
              meta: {
                icon: "dashboard",
                title: model.value.title,
                show: model.value.switchValue,
              },
              component:
                curLeveArr.length === 1 ? "RouteView" : model.value.component,
              redirect: model.value.redirect || null,
            };
            let arr = getLocalMenu(MENU_KEYS.EDIT);
            // id重复直接替换
            let isHas = false;
            arr = arr.map((item) => {
              if (item.id === param.id) {
                isHas = true;
                return param;
              }
              return item;
            });
            if (!isHas) arr.push(param);

            //   请求网络
            actions
              .updateRouteMenu(param)
              .then(() => {
                window.location.reload();
              })
              .catch(() => {
                //   保存到本地,等待下一次有网络的时候更新
                local.set(MENU_KEYS.EDIT, arr);
                window.location.reload();
              });
          }
        } else {
          console.log(isok, results);
          app().$message.error("路由信息填写错误");
        }
      });
    };

    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
      //
      btns: ref(["add"]),
      btnPermissionArr: [
        {
          label: "新增",
          value: "add",
          disabled: true,
        },
        {
          label: "编辑",
          value: "edit",
        },
        {
          label: "删除",
          value: "remove",
        },
        {
          label: "查阅",
          value: "Check",
        },
        {
          label: "详情",
          value: "detail",
        },
      ],
      saveMenuStatus,
      formRef,
      selectMenu,
      data: routers,
      defaultExpandedKeys: ref(["index"]),

      //   表单
      updateDisabled, // 是否禁用表单
      form: model,
      rules: {
        name: {
          required: true,
          message: "请输入路由名称",
          trigger: ["input", "blur"],
        },
        title: {
          required: true,
          message: "请输入菜单标题",
          trigger: ["input", "blur"],
        },
        component: {
          required: true,
          message: "请输入组件名称",
          trigger: ["input", "blur"],
        },
      },
      commitDataMenu,
      addMenu,
      editMenu,
      menuDelete,
      handleNodeClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  padding: 12px 24px;
}
.btn {
  padding: 6px 10px;
  margin-left: 10px;
  border: 0.5px solid #8b8b8b;
  &-commit {
    background-color: blue;
    border-radius: 6px;
    width: 80px;
    padding: 10px 0;
    margin: 24px;
    text-align: center;
    color: #fff;
  }
}
.leftView {
  width: 45%;
  &-title {
    font-size: 22px;
    font-weight: 900;
  }
}
.rightView {
  width: 55%;
  border-left: 1px solid red;
  &-title {
    font-size: 22px;
    font-weight: 900;
  }
}
</style>
