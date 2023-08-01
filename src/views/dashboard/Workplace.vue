<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-12-03 09:06:29
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-07-28 18:00:12
-->
<template>
  <el-card>
    <div class="view flex-center">
      <div class="imgView" v-for="(item, index) in imgList" :key="index">
        <img class="avatar" v-lazy="item.pic" />
      </div>
    </div>
  </el-card>
</template>

<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Work-place",
  setup() {
    const imgList = reactive([
      {
        title: "主人的狗狗",
        pic: "https://t7.baidu.com/it/u=2135039318,3787247340&fm=193&f=GIF",
      },
      {
        title: "主人的狗狗",
        pic: "https://t7.baidu.com/it/u=1786381748,3397208996&fm=193&f=GIF",
      },
      {
        title: "主人的狗狗",
        pic: "https://t7.baidu.com/it/u=798210589,1061508347&fm=193&f=GIF",
      },
      {
        title: "主人的狗狗",
        pic: "https://t7.baidu.com/it/u=1095758031,3155763856&fm=193&f=GIF",
      },
      {
        title: "主人的狗狗",
        pic: "https://t7.baidu.com/it/u=993148823,2753824759&fm=193&f=GIF",
      },
      {
        title: "主人的狗狗",
        pic: "https://t7.baidu.com/it/u=228112714,3478470625&fm=193&f=GIF",
      },
    ]);

    return {
      imgList,
    };
  },
});
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  flex-wrap: wrap;
  .imgView {
    display: block;
    width: calc((100% - 100px) / 3);
    margin: 10px 16px;
    .avatar {
      width: 100%;
    }
  }
}
</style>
