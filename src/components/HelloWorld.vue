<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-24 15:10:50
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 22:15:41
-->

<template>
  <div class="view">
    <h1>defineProps.msg：{{ msg }}</h1>
    <h2>{{ $local.getItem("zhj") }}</h2>

    <div class="textStyle">
      state.user:
      <div>state.user.name：{{ state.name }}</div>
      <div>getter：{{ getter.info }}</div>
      <div @click="mutations.incrementAge">点击 mutatons.incrementAge 事件</div>
      <div @click="actions.increment">点击 mutatons.increment 事件</div>
    </div>

    <div class="textStyle">
      Root:
      <div>state:{{ rootState.content }}</div>
      <div>getter:{{ rootGetter.getContent }}</div>
      <div @click="rootActions.update">点击 mutatons.update 事件</div>
      <div @click="rootMutations.updateContent('root--->')">
        点击 actions.updateContent 事件
      </div>
    </div>

    <div class="textStyle">
      <n-button type="info" @click="click">点击事件</n-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { app } from "../mixin";
import { useState, useGetter } from "../store/hock/useProperty";
import useMethod from "../store/hock/useMethod";
import request from "../utils/http";

// eslint-disable-next-line no-undef
defineProps({
  msg: String,
});

const count = ref(0);
const bgColor = ref("#384bf7");
const original = reactive({ count: 0 });
console.log("练习响应式--%d--%o", count, original);
// 状态管理获取
const state = useState("userDemo", ["name", "age"]);
const getter = useGetter("userDemo", ["info"]);
const [actions, mutations] = useMethod("userDemo", [
  "incrementAge",
  "increment",
]);

console.log("userDemo-State:", state.name.value);
console.log("userDemo-getter:", getter.info.value);
console.log("userDemo-useMethod:", actions, "----", mutations);

// Root 状态
const rootState = useState(["content"]);
const rootGetter = useGetter(["getContent"]);
const [rootActions, rootMutations] = useMethod(["updateContent", "update"]);
console.log("Root-State:", rootState.content.value);
console.log("Root-Getter:", rootGetter.getContent.value);
console.log("Root-useMethod:", rootActions, "----", rootMutations);
// 获取原型
const instance = app();
// 这里的url是在mock.js中拦截的地址
request({ url: "/mock/news", method: "get", params: {} }).then((res) => {
  console.log(res, "-------"); // 打印一下响应数据
});

// 请求数据
request({
  url: "/api/user/nav",
  method: "get",
  params: {},
})
  .then((res) => {
    console.log("res: ", res);
  })
  .catch((err) => {
    console.log("err: ", err);
  });

console.log("app.$local:", instance); // 输出
onMounted(() => {
  console.info("开始挂载hello world组件");
  instance.$local.setItem("zhj", 11234567);
});
const click = () => {
  console.log(instance.$local); // 输出
};
</script>

<style lang="scss" scoped>
$bg: white;
.view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
a {
  background-color: $bg;
  color: v-bind(bgColor);
}
.textStyle {
  margin: 20px 0;
  text-align: left;
  width: 500px;
}
</style>
