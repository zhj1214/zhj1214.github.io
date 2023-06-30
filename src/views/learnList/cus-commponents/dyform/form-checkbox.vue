<!--
 * @Description: 多选 基础组件
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-06-02 16:07:15
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-06-30 15:45:38
-->
<template>
  <div class="view">
    <div v-if="componentData.componentTemplateType == 'Radio'">
      <el-checkbox
        v-for="(item, index) in componentData.listRadio"
        :key="index"
        v-bind="attrsCopy"
        v-on="ListenersCopy"
        v-model="modeldata"
        :style="componentData.componentsStyle || {}"
        :label="item.value"
      >
        {{ item.label }}
      </el-checkbox>
    </div>
    <div v-else>
      <el-checkbox-group v-model="cusData.model" v-bind="$attrs" v-on="ListenersCopy">
        <el-checkbox v-for="(item, index) in componentData.listRadio" :key="index" :label="item.value">
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import formMixin from "./form-mixins";

export default {
  name: "form-el-checkbox",
  components: {
    ElCheckboxGroup,
    ElCheckbox,
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
