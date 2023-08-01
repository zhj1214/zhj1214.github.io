/*
 * @Description: 表单混入
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-06-04 09:57:21
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-06-30 16:30:46
 */
import _ from "lodash";
export default {
  data: function () {
    return {
      modeldata: this.modelvalue, // no-mutating-props 单项数据流，防止父子组件数据变更相互影响
      cusData: {
        model: "",
        componentsStyle: {},
      }, // 自定义数据
      attrsCopy: {}, // 组件属性
      ListenersCopy: {}, // 事件对象
    };
  },
  created() {
    // this.$ebs.on(this.type, (param) => {
    //   let reluts = param
    //   // delete reluts.componentsProps 暂时移除
    //   // 创建响应式属性
    //   Object.keys(reluts.data).forEach((key) => {
    //     if (!this[key] || this[key] !== reluts.data[key]) {
    //       this.$set(this.componentData, key, reluts.data[key])
    //     }
    //   })
    // })
  },

  watch: {
    // 拷贝属性和事件
    cusListeners: {
      handler(newVal, value) {
        if (!_.isEqual(newVal, value)) {
          if (_.isEqual(newVal, {})) {
            this.ListenersCopy = value || _.cloneDeep(value);
          } else {
            // 1. 传参this.type
            const fnObj = _.cloneDeep(newVal);
            Object.keys(fnObj).forEach((key) => {
              const fn = fnObj[key];
              fnObj[key] = (...args) => {
                return fn(...args, this.type);
              };
            });
            // 2. 赋值
            this.ListenersCopy = fnObj;
          }
        }
      },
      immediate: true,
    },
    cusAttrs: {
      handler(newVal, value) {
        if (!_.isEqual(newVal, value)) {
          if (_.isEqual(newVal, {})) {
            this.attrsCopy = value; // || _.cloneDeep(value)
          } else {
            // console.log(this.type, '是不是变化了？', newVal)
            this.attrsCopy = newVal; // || _.cloneDeep(newVal)
          }
        }
      },
      immediate: true,
    },
    // 父=>子: 捕获model的变化
    modelvalue: function (newVal, oldVal) {
      console.log(this.type, "---父===>子---", newVal, oldVal);
      if (newVal !== oldVal) {
        this.cusData.model = newVal;
      }
    },

    // 子=>父： 更新父组件-refModel
    "cusData.model": function (newVal, oldVal) {
      console.log(this.type, "---子===>父---", newVal, oldVal);
      if (newVal !== oldVal) {
        let reluts = {};
        reluts[`${this.type}Model`] = newVal;
        this.$emit("modelWatch", reluts);
      }
    },

    // componentData： 自定义数据源发生变化
    "componentData.componentsStyle": function (newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log(this.type, "~~~子组件-样式变化~~", newVal);
      }
    },
    componentData: {
      handler(newVal, value) {
        console.log(this.type, "~~~子组件---componentData---变化~~", newVal);
        if (!_.isEqual(newVal, value)) {
          if (_.isEqual(newVal, {})) {
            this.cusData = value; // || _.cloneDeep(value)
          } else {
            this.cusData = newVal; // || _.cloneDeep(newVal)
          }
        }
      },
      immediate: true,
    },
  },
};
