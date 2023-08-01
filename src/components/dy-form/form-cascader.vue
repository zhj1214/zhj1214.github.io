<!--
 * @Description: 多选 基础组件
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-06-02 16:07:15
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-10-14 10:03:26
-->
<template>
  <div class="view">
    <el-cascader v-model="cusData.model" v-bind="attrsCopy" v-on="ListenersCopy" :style="componentData.componentsStyle || {}">
    </el-cascader>
  </div>
</template>

<script>
import { ElCascader } from "element-plus";
import formMixin from "./form-mixins";

export default {
  name: "form-el-checkbox",
  components: {
    ElCascader,
  },
  props: {
    type: String,
    modelvalue: Array,
    cusAttrs: Object,
    cusListeners: Object,
    componentData: Object,
  },
  mixins: [formMixin],
};
</script>
