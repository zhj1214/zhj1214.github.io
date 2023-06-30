<!--
 * @Description: 时间选择基础组件
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-06-02 16:07:15
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-06-30 15:45:22
-->
<template>
  <div class="view">
    <el-time-select
      v-bind="attrsCopy"
      v-model="modeldata"
      :style="componentData.componentsStyle || {}"
      v-on="ListenersCopy"
    ></el-time-select>
  </div>
</template>

<script>
import formMixin from './form-mixins'

export default {
  name: 'form-el-time-select',
  props: {
    type: String,
    modelvalue: String,
    cusAttrs: Object,
    cusListeners: Object,
    componentData: Object
  },
  mixins: [formMixin]
}
</script>
