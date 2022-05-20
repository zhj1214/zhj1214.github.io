<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-11-25 21:36:23
 * @LastEditors: zhj1214
 * @LastEditTime: 2021-11-29 21:18:43
-->
<template>
  <!-- <a-result status="500" title="500" sub-title="Sorry, the server is reporting an error.">
    <template #extra>
      <a-button type="primary" @click="toHome">
        Back Home
      </a-button>
    </template>
  </a-result> -->
  <n-button type="primary" @click="toHome"> Back Home </n-button>
</template>

<script>
export default {
  // name: 'Exception500',
  methods: {
    toHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
