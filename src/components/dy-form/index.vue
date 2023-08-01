<template>
  <div class="view" :style="customStyle">
    <!-- 头部插槽 -->
    <slot name="formHeader"></slot>
    <!-- 表单部分 -->
    <el-form
      v-if="Object.keys(refModel).length > 0"
      :ref="formData.formType"
      :model="refModel"
      :rules="ruleList"
      :label-position="formData.labelPosition"
      :label-width="formData.labelWidth"
      :style="formData.formStyle"
      @validate="validate"
    >
      <el-form-item
        v-for="item in getList"
        :prop="item.componentsPropName"
        :label="item.label"
        :key="item.id || item.componentsPropName"
      >
        <component
          v-if="item.type"
          :is="item.type"
          :type="item.prefixId"
          :modelvalue="refModel[`${item.prefixId}Model`]"
          :cusAttrs="item.componentsProps"
          :cusListeners="item.function"
          :componentData="item.data"
          @modelWatch="modelWatch"
        ></component>
        <slot v-else-if="item.slotType" :name="item.slotType"></slot>
      </el-form-item>
      <!-- 默认底部插槽 -->
      <el-form-item>
        <slot></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Vue from "vue";
// const requireComponents = require.context(
//   "./zhjFormComponents",
//   false,
//   /\.vue$/
// );
import { ElForm, ElFormItem } from "element-plus";

import FormInput from "./form-input.vue";
import FormRadio from "./form-radio.vue";
import FormSelect from "./form-select.vue";
import FormDatePicker from "./form-datePicker.vue";
import FormCheckbox from "./form-checkbox.vue";
import FormTimePicker from "./form-timePicker.vue";
import FormNumber from "./form-number.vue";
import FormCascader from "./form-cascader.vue";

export default {
  name: "dy-form",
  props: {
    // 数据源
    formData: {
      type: Object,
      default: () => ({}),
    },
    // 父组件样式
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    // 表单组件样式
    formStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ElForm,
    ElFormItem,
    "form-el-input": FormInput,
    "form-el-radio": FormRadio,
    "form-el-select": FormSelect,
    "form-el-date-picker": FormDatePicker,
    "form-el-checkbox": FormCheckbox,
    "form-el-time-select": FormTimePicker,
    "form-el-input-number": FormNumber,
    "form-el-cascader": FormCascader,
  },
  computed: {
    /**
     * @description: 对传入的组件数据进行二次加工，返回需要的数据格式
     * @author: zhj1214
     */
    getList() {
      // 1. componentsList数量发生变化
      // this.initData()
      return this.formData.componentsList;
    },
    getRuleList() {
      return this.ruleList;
    },
  },
  data() {
    return {
      refModel: {}, // formData数据源中所有model值的集合对象，用于表单验证功能
      ruleList: {}, // 所有组件校验规则列表
    };
  },

  mounted() {
    // this.initData()
    this.$emit("initDone", this);
  },
  watch: {
    // 'formData.componentsList': function (newval, oldval) {
    //   console.log(newval, 'componentsList-变化了吗?', oldval)

    //   if (newval !== oldval) {
    //     // 1. 重置ruleList、 refModel
    //     this.refModel = {}
    //     this.ruleList = {}
    //     this.initData()
    //   }
    // }
    "formData.componentsList": {
      handler(newVal, oldVal) {
        console.log(newVal, "componentsList-变化了吗?", oldVal);
        if (newVal !== oldVal) {
          // 1. 重置ruleList、 refModel
          this.refModel = {};
          this.ruleList = {};
          this.initData();
        }
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * @description: 动态加载所需组件
     * @author: zhj1214
     */
    mountedComponent() {
      // 遍历出每个组件的路径
      // requireComponents.keys().forEach(fileName => {
      //   // 组件实例
      //   const reqCom = requireComponents(fileName);
      //   // 截取路径作为组件名
      //   const reqComName =
      //     reqCom.name || fileName.replace(/\.\/(.*)\.vue/, "$1");
      //   this.formData.componentsList.forEach(item => {
      //     console.log(reqComName, "000000000", item.type);
      //     if (reqComName.includes(item.type)) {
      //       // 组件挂载
      //       Vue.component(reqComName, reqCom.default || reqCom);
      //     }
      //   });
      // });
    },

    /**
     * @description: 初始化表单数据
     * @author: zhj1214
     */
    initData() {
      // 1. 生成唯一标识
      this.formData.componentsList.forEach((e, idx) => {
        e.prefixId = `${e.type}-${idx}-`;
      });
      // 2. 设置 ruleList、 refModel
      this.formData.componentsList.forEach((el) => {
        let { type } = el;
        if (!type && el.slotType) type = el.slotType;
        if (type) {
          // 组合 form需要的 数据
          const ruleName = `${el.prefixId}Model`;
          this.$set(this.ruleList, ruleName, el.rules || []);
          this.$set(this.refModel, ruleName, (el.data && el.data.model) || "");
          // 拼接 formItem prop
          el.componentsPropName = ruleName;
        }
      });
    },

    /**
     * @description: 初始化封装的基础组件
     * @author: zhj1214
     */
    initComponents() {
      console.log("initComponents:初始化封装的基础组件");

      // const cycleFn = (elArr, componentName, value, typeName) => {
      //   elArr.forEach((item) => {
      //     if (item.$vnode && item.$vnode.componentOptions.tag) {
      //       if (
      //         componentName.includes(item.$vnode.componentOptions.tag) &&
      //         item.$vnode.componentOptions.tag !== componentName
      //       ) {
      //         if (typeName === 'attrs') {
      //           item.$attrs = value

      //           console.log(value, 'elArr1---111111111111111', item)
      //         } else {
      //           item.$listeners = value
      //         }
      //       } else if (item.$children && item.$children.length > 0) {
      //         cycleFn(item.$children, componentName, value, typeName)
      //       }
      //     } else if (item.$children && item.$children.length > 0) {
      //       cycleFn(item.$children, componentName, value, typeName)
      //     }
      //   })
      // }
      this.formData.componentsList.forEach((el) => {
        if (el.type) {
          // 递归查找对应节点: 用组件注册名字  form-el-input 去匹配 饿了么组件el-input
          // this.$children[0].$children[index].$children &&
          //   cycleFn(
          //     this.$children[0].$children[index].$children,
          //     el.type,
          //     JSON.parse(JSON.stringify(el.componentsProps)),
          //     'attrs'
          //   )
          // 递归查找对应节点: 用组件注册名字  form-el-input 去匹配 饿了么组件el-input
          // this.$children[0].$children[index].$children &&
          //   cycleFn(
          //     this.$children[0].$children[index].$children,
          //     el.type,
          //     JSON.parse(JSON.stringify(el.function)),
          //     'function'
          //   )

          this.$ebs.emit(el.prefixId, el); // 第一个参数要与ruleName前半部分一致
        }
      });
      this.$emit("initDone", this);
    },

    validate(val) {
      console.log("表单校验：", val);
      this.$emit("validate", val);
    },

    /**
     * @description: 改变表单，校验 model
     * @param {*} val 需要改变的值  ”对象“
     * @author: zhj1214
     */
    modelWatch(val) {
      // console.log(this.refModel, '是这里吗', val)
      let key = "";
      if (Object.keys(val)[0] in this.refModel) {
        key = Object.keys(val)[0];
      }
      this.$set(
        this.refModel,
        key || Object.keys(val)[0],
        val[key || Object.keys(val)[0]]
      );
      if (key) {
        this.makeCustomData(this.refModel);
      }
    },

    /**
     * @description: 如果数据源中定义了输出字段，则映射以后再输出
     * @param {*} val
     * @return {*} 返回加工后的数据
     */
    makeCustomData(val) {
      // 1. 拷贝
      const param = JSON.parse(JSON.stringify(val));
      // 2. 加工数据
      this.formData.componentsList.forEach((e) => {
        if (e.componentsPropName && e.id) {
          param[e.id] = val[e.componentsPropName];
          delete param[e.componentsPropName];
        }
      });
      // 3. 输出
      this.$emit("modelChange", param);
    },
  },
};
</script>
