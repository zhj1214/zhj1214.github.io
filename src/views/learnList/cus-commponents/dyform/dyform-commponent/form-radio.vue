<!--
 * @Description: 单选 基础组件
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-06-02 16:07:15
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-09-14 10:06:28
-->
<template>
  <div class="view">
    <div v-if="componentData.componentTemplateType == 'Radio'">
      <el-radio
        v-for="(item, index) in componentData.listRadio"
        :key="index"
        v-bind="attrsCopy"
        v-on="ListenersCopy"
        v-model="modeldata"
        :style="componentData.componentsStyle || {}"
        :label="item.value"
      >
        {{ item.label }}
      </el-radio>
    </div>
    <div v-else>
      <el-radio-group v-model="cusData.model" v-bind="$attrs" v-on="ListenersCopy">
        <el-radio v-for="(item, index) in componentData.listRadio" :key="index" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import formMixin from './form-mixins'

export default {
  name: 'form-el-radio',
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
