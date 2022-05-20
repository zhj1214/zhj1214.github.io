<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-25 21:36:23
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 20:20:50
-->
<template>
  <div
    status="403"
    title="403"
    sub-title="Sorry, you don't have access to this page."
  >
    <n-button type="primary" @click="toHome"> Back Home </n-button>
  </div>
</template>

<script>
// name: "Exception403",
export default {
  methods: {
    toHome() {
      // this.$router.push({ path: "/" });
    },
  },
};
</script>
