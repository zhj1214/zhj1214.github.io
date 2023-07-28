<template>
  <div class="userLoginLayout">
    <router-view />
  </div>
</template>

<script>
/**
 * 登录页面外层布局（暂时没有用到）
 * */
export default {
  name: "userLoginLayout",
  data() {
    return {};
  },
  created() {
    console.log("----", window.location.href);
  },
  mounted() {
    // 动态的给-body-添加-样式
    document.body.classList.add("userLoginLayoutBg");
  },
  beforeUnmount() {
    // 动态删除样式
    document.body.classList.remove("userLoginLayoutBg");
  },
};
</script>

<style lang="scss" scoped>
.userLoginLayout {
}
</style>
<style>
.userLoginLayoutBg {
  margin: 0;
}
</style>
