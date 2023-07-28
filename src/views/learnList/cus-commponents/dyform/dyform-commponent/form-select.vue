<!--
 * @Description: 选择器基础组件
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-06-02 16:07:24
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-06-30 15:46:35
-->
<template>
  <div class="view">
    <el-select
      v-model="cusData.model"
      :style="componentData.componentsStyle || {}"
      v-bind="attrsCopy"
      v-on="ListenersCopy"
    >
      <template v-slot:prefix>
        <img
          v-if="componentData.prefix"
          :src="componentData.prefix"
          style="width: 24px; height: 24px"
        />
      </template>

      <el-option
        v-for="item in componentData.selectList"
        :value="item.value"
        :label="item.label"
        :key="item.value"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </el-option>
    </el-select>
  </div>
</template>

<script>
import formMixin from "./form-mixins";
export default {
  name: "form-el-select",
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

<style></style>
