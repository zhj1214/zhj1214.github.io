<!--
 * @Description: 日期选择基础组件
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-06-02 16:07:15
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-10-14 10:05:10
-->
<template>
  <div class="view">
    <el-date-picker
      v-bind="attrsCopy"
      v-model="modeldata"
      :style="componentData.componentsStyle || {}"
      v-on="ListenersCopy"
    ></el-date-picker>
  </div>
</template>

<script>
import { ElDatePicker } from "element-plus";
import formMixin from "./form-mixins";

export default {
  name: "form-el-date-picker",
  components: {
    ElDatePicker,
  },
  props: {
    type: String,
    modelvalue: String,
    cusAttrs: Object,
    cusListeners: Object,
    componentData: Object,
  },
  mixins: [formMixin],
};
</script>
