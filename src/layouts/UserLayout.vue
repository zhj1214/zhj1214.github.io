<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLayout",
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    document.body.classList.add("userLayout");
  },
  beforeUnmount() {
    document.body.classList.remove("userLayout");
  },
};
</script>

<style lang="scss" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url("@/assets/background.svg") no-repeat 50%;
    background-size: 100%;
    position: relative;

    .user-layout-lang {
      width: 100%;
      height: 40px;
      line-height: 44px;
      text-align: right;

      .select-lang-trigger {
        cursor: pointer;
        padding: 12px;
        margin-right: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        vertical-align: middle;
      }
    }
  }
}
</style>
