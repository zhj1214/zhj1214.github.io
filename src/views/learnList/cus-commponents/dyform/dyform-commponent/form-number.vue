<!--
 * @Description:  基础组件
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-06-02 16:07:15
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-10-14 10:51:49
-->
<template>
  <div class="view">
    <el-input-number
      v-bind="attrsCopy"
      v-model="modeldata"
      :style="componentData.componentsStyle || {}"
      v-on="ListenersCopy"
    ></el-input-number>
  </div>
</template>

<script>
import { ElInputNumber } from "element-plus";
import formMixin from "./form-mixins";

export default {
  name: "formelinputnumber",
  components: {
    ElInputNumber,
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
