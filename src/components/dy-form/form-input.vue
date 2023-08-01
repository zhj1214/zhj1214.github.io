<!--
 * @Description: 输入框基础组件
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-06-02 16:07:15
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-10-14 10:08:42
-->
<template>
  <div class="view">
    <el-input v-model="cusData.model" v-bind="attrsCopy" v-on="ListenersCopy" :style="componentData.componentsStyle || {}">
    </el-input>
  </div>
</template>

<script>
import { ElInput } from "element-plus";
import formMixin from "./form-mixins";

export default {
  name: "form-el-input",
  components: {
    ElInput,
  },
  props: {
    type: String,
    modelvalue: String,
    cusAttrs: Object,
    cusListeners: Object,
    componentData: Object,
  },
  inheritAttrs: false, // 防止tag上出现 多余属性继续传递
  mixins: [formMixin],
};
</script>
