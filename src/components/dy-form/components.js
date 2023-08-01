/*
 * @Description: 预设模板组件. 注释：都是例子
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-09-15 14:58:52
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-09-27 15:40:08
 */

export const componentsPreset = [
  {
    type: 'form-el-input',
    label: '',
    data: {
      componentTemplateType: 'base', // 备用值，代表封装了几种输入框样式
      model: '', // 当前组件的v-model - 的回显值
      componentsStyle: {} // width: '253px'
    },
    function: {
      input: (val) => {
        console.log('正在输入', val)
      }
    },
    // 当前组件校验规则
    rules: [
      // {
      //   validator: (rule, value, cb) => {
      //     let len = (value && String(value).trim().length) || 0
      //     if (len > 0 && len !== 11) {
      //       cb(new Error('请输入完整手机号'))
      //     } else {
      //       cb()
      //     }
      //   },
      //   trigger: 'blur'
      // }
    ],
    componentsProps: {
      placeholder: '请输入'
      // clearable: true
    }
  },
  {
    type: 'form-el-date-picker',
    label: '原始线索创建时间:',
    data: {
      model: ''
    },
    function: {
      // change: (a, b) => {
      //   console.log(b, '选择的日期', a, this)
      // }
    },
    componentsProps: {
      // type: 'daterange', // 组件类型
      // 'value-format': 'yyyy-MM-dd',
      // 'range-separator': '至',
      // 'start-placeholder': '开始日期',
      // 'end-placeholder': '结束日期'
    }
  },
  {
    type: 'form-el-select',
    label: '渠道来源:',
    data: {
      componentTemplateType: 'base', // 模板类型
      // prefix: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
      model: '',
      componentsStyle: {},
      selectList: [
        // {
        //   value: '0',
        //   label: '香蕉'
        // },
        // {
        //   value: '1',
        //   disabled: true,
        //   label: '苹果'
        // }
      ]
    },
    function: {
      // change: (val) => {
      //   console.log('当前选择了', val)
      // }
    },
    componentsProps: {
      placeholder: '请选择'
      // filterable: true
    }
  },
  {
    type: 'form-el-cascader',
    label: '意向车型:',
    data: {
      model: '', // 当前组件的v-model
      componentsStyle: {}
    },
    function: {
      // change: (val) => {
      //   console.log('选择节点变化了', val)
      // }
    },
    componentsProps: {
      placeholder: '请选择',
      options: [
        // {
        //   value: 'zhinan',
        //   label: '指南',
        //   children: [
        //     {
        //       value: 'shejiyuanze',
        //       label: '设计原则',
        //       children: [
        //         {
        //           value: 'yizhi',
        //           label: '一致'
        //         },
        //         {
        //           value: 'fankui',
        //           label: '反馈'
        //         },
        //         {
        //           value: 'xiaolv',
        //           label: '效率'
        //         },
        //         {
        //           value: 'kekong',
        //           label: '可控'
        //         }
        //       ]
        //     },
        //     {
        //       value: 'daohang',
        //       label: '导航',
        //       children: [
        //         {
        //           value: 'cexiangdaohang',
        //           label: '侧向导航'
        //         },
        //         {
        //           value: 'dingbudaohang',
        //           label: '顶部导航'
        //         }
        //       ]
        //     }
        //   ]
        // }
      ]
      // 'filter-method': ()=>{},
      // filterable: true
    }
  }
]
