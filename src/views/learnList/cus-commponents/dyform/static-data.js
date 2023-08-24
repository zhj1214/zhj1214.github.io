// import Vue from 'vue'
// 原始线索表单：表头
export const columns = [
  { title: '原始线索ID', width: 200, key: 'originId' },
  { title: '客户ID', width: 200, key: 'customerId' },
  { title: '唯一线索ID', width: 200, key: 'uniqueId' },
  { title: '原始线索报名时间', width: 200, key: 'applyTime' },
  { title: '原始线索创建时间', width: 200, key: 'createTime' },
  { title: '原始线索姓名', width: 200, key: 'username' },
  { title: '原始线索手机号', width: 200, key: 'mobile' },
  { title: '原始线索座机号', width: 200, key: 'telephone' },
  { title: '归集结果', width: 200, key: 'collectResultDesc' },
  { title: '意向车型', width: 200, key: 'carModelName' },
  { title: '经销商名称', width: 200, key: 'dealerName' },
  { title: '渠道来源', width: 200, key: 'channel' },
  { title: '活动来源', width: 200, key: 'activity' },
  { title: '线索状态', width: 200, key: 'leadStatusDesc' },
  {
    title: '操作',
    width: 100,
    fixed: 'right',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

/**
 * @description: 动态表单-静态数据-默认筛选条件
 * @types { String } 输入框： form-el-input  单选：form-el-radio  选择器：form-el-select 日期选择：form-el-date-picker
 * 多选：form-el-checkbox  时间：form-el-time-select 计数器：form-el-input-number 插槽1：customLabel
 * @author: zhj1214
 */
export const formDataPreset = [
  {
    type: 'form-el-cascader',
    label: '经销商名称:',
    sort: 4,
    id: 'dealerCode',
    data: {
      componentTemplateType: 'base', // 模板类型
      model: [],
      componentsStyle: {
        width: '253px !important'
      }
    },
    rules: [],
    function: {
      change: (val) => {
        console.log('选择节点变化了', val)
      }
    },
    componentsProps: {
      clearable: true,
      placeholder: '请选择',
      options: [],
      'filter-method': (node, keyword) => {
        if (!node.children || node.children.length === 0) {
          const isok = node.data.label.includes(keyword)
          console.log(keyword, '--node--', node.data.label, '---', isok)
          return isok
        }
      },
      filterable: true
    }
  },
  {
    type: 'form-el-input',
    label: '原始线索手机号:',
    sort: 5,
    id: 'mobile',
    data: {
      componentTemplateType: 'base', // 备用值，代表封装了几种输入框样式
      model: '', // 当前组件的v-model - 的回显值
      componentsStyle: {
        width: '253px !important'
      }
    },
    function: {
      input: (val) => {
        console.log('正在输入', val)
      }
    },
    // 当前组件校验规则
    rules: [
      {
        validator: (rule, value, cb) => {
          let len = (value && String(value).trim().length) || 0
          if (len > 0 && len !== 11) {
            cb(new Error('请输入完整手机号'))
          } else {
            cb()
          }
        },
        trigger: 'blur'
      }
    ],
    componentsProps: {
      placeholder: '请输入',
      clearable: true
    }
  },
  {
    type: 'form-el-input',
    label: '原始线索姓名:',
    sort: 7,
    id: 'username',
    data: {
      componentTemplateType: 'base', // 备用值，代表封装了几种输入框样式
      model: '', // 当前组件的v-model - 的回显值
      componentsStyle: {
        width: '253px !important'
      }
    },
    componentsProps: {
      placeholder: '请输入',
      clearable: true
    }
  },
  {
    type: 'form-el-cascader',
    label: '渠道来源:',
    sort: 8,
    id: 'primaryCode',
    data: {
      componentTemplateType: 'base', // 模板类型
      model: [],
      componentsStyle: {
        width: '253px !important'
      }
    },
    function: {
      change: (val) => {
        console.log('选择节点变化了', val)
      }
    },
    componentsProps: {
      clearable: true,
      placeholder: '请选择',
      options: [],
      'filter-method': (node, keyword) => {
        if (!node.children || node.children.length === 0) {
          const isok = node.data.label.includes(keyword)
          console.log(keyword, '--node--', node.data.label, '---', isok)
          return isok
        }
      },
      filterable: true
    }
  },
  {
    type: 'form-el-cascader',
    label: '活动来源:',
    sort: 9,
    id: 'activityCode',
    data: {
      componentTemplateType: 'base', // 模板类型
      model: [],
      componentsStyle: {
        width: '253px !important'
      }
    },
    function: {
      change: (val) => {
        console.log('选择节点变化了', val)
      }
    },
    componentsProps: {
      clearable: true,
      placeholder: '请选择',
      options: [],
      'filter-method': (node, keyword) => {
        if (!node.children || node.children.length === 0) {
          const isok = node.data.label.includes(keyword)
          console.log(keyword, '--node--', node.data.label, '---', isok)
          return isok
        }
      },
      filterable: true
    }
  },
  {
    type: 'form-el-select',
    label: '意向车型:',
    sort: 12,
    id: 'carModelCode', // integer
    data: {
      componentTemplateType: 'base', // 模板类型
      model: '',
      componentsStyle: {
        width: '253px !important'
      },
      selectList: []
    },
    function: {},
    componentsProps: {
      placeholder: '请选择',
      clearable: true,
      filterable: true
    }
  },
  {
    type: 'form-el-select',
    label: '归集结果:',
    sort: 12,
    id: 'collectResult', // integer
    data: {
      componentTemplateType: 'base', // 模板类型
      model: '',
      componentsStyle: {
        width: '253px !important'
      },
      selectList: []
    },
    function: {},
    componentsProps: {
      clearable: true,
      placeholder: '请选择',
      filterable: true
    }
  }
]

// 筛选管理：所有的筛选项
export const filterStaticData = [
  {
    title: '关联信息',
    list: [
      {
        sort: 1,
        label: '客户ID',
        value: 'customerId',
        type: 'form-el-input'
      },
      {
        sort: 2,
        label: '原始线索ID',
        value: 'originId',
        type: 'form-el-input'
      },
      {
        sort: 3,
        label: '唯一线索ID',
        value: 'uniqueId',
        type: 'form-el-input'
      },
      {
        sort: 4,
        label: '经销商名称',
        value: 'dealerCode',
        type: 'form-el-cascader'
      }
    ]
  },
  {
    title: '基础信息',
    list: [
      {
        sort: 5,
        label: '原始线索手机号',
        value: 'mobile',
        type: 'form-el-input'
      },
      {
        sort: 6,
        label: '原始线索座机号',
        value: 'telephone',
        type: 'form-el-input'
      },
      {
        sort: 7,
        label: '原始线索姓名',
        value: 'username',
        type: 'form-el-input'
      },
      {
        sort: 8,
        label: '渠道来源',
        value: 'primaryCode',
        type: 'form-el-cascader'
        // value: 'secondaryCode'
      },
      {
        sort: 9,
        label: '活动来源',
        value: 'activityCode',
        type: 'form-el-cascader'
      },
      {
        sort: 10,
        label: '意向车型',
        value: 'carModelCode',
        type: 'form-el-select'
      }
    ]
  },
  {
    title: '处理信息',
    list: [
      {
        sort: 11,
        label: '是否外呼',
        value: 'isCall', // boolean
        type: 'form-el-select'
      },
      {
        sort: 12,
        label: '归集结果',
        value: 'collectResult', // integer
        type: 'form-el-select'
      },
      {
        sort: 13,
        label: '线索状态',
        value: 'leadStatus', // integer
        type: 'form-el-select'
      },
      {
        sort: 14,
        label: '号码有效性',
        value: 'mobileValid', // boolean
        type: 'form-el-select'
      },
      {
        sort: 15,
        label: '需求有效性',
        value: 'demandValid', // boolean
        type: 'form-el-select'
      },
      {
        sort: 16,
        label: '原始线索创建时间',
        value: 'createTime',
        type: 'form-el-date-picker'
      },
      {
        sort: 17,
        label: '原始线索报名时间',
        value: 'applyTime',
        type: 'form-el-date-picker'
      }
    ]
  }
]

/**
 * @description: 新增原始线索的静态数据
 */
export const addClueFormPreset = [
  {
    type: 'form-el-input',
    label: '原始线索手机号:',
    id: 'mobile',
    data: {
      componentTemplateType: 'base', // 备用值，代表封装了几种输入框样式
      model: '', // 当前组件的v-model - 的回显值
      componentsStyle: {
        width: '253px'
      }
    },
    function: {
      input: (val) => {
        console.log('正在输入', val)
      }
    },
    // 当前组件校验规则
    rules: [],
    componentsProps: {
      placeholder: '请输入',
      clearable: true
    }
  },
  {
    type: 'form-el-input',
    label: '原始线索座机号:',
    id: 'telephone',
    data: {
      componentTemplateType: 'base', // 备用值，代表封装了几种输入框样式
      model: '', // 当前组件的v-model - 的回显值
      componentsStyle: {
        width: '253px'
      }
    },
    function: {},
    // 当前组件校验规则
    rules: [],
    componentsProps: {
      placeholder: '请输入',
      clearable: true
    }
  },
  {
    type: 'form-el-input',
    label: '原始线索姓名:',
    id: 'username',
    data: {
      componentTemplateType: 'base', // 备用值，代表封装了几种输入框样式
      model: '', // 当前组件的v-model - 的回显值
      componentsStyle: {
        width: '253px'
      }
    },
    componentsProps: {
      placeholder: '请输入',
      maxlength: 16,
      clearable: true
    }
  },
  {
    type: 'form-el-date-picker',
    label: '原始线索报名时间:',
    id: 'applyTime',
    data: {
      componentsStyle: {
        width: '253px'
      },
      model: ''
    },
    function: {
      change: (a, b) => {
        console.log(b, '原始线索报名时间:', a)
      }
    },
    rules: [{ required: true, message: '请选择', trigger: 'blur' }],
    componentsProps: {
      clearable: true,
      type: 'date',
      placeholder: '选择日期',
      format: 'yyyy 年 MM 月 dd 日',
      'value-format': 'timestamp',
      'picker-options': {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3 * 30 * 24 * 60 * 60 * 1000 || time.getTime() > Date.now()
        }
      }
    }
  },
  {
    type: 'form-el-cascader',
    label: '渠道来源:',
    id: 'primaryCode',
    data: {
      componentTemplateType: 'base', // 模板类型
      model: [],
      componentsStyle: {
        width: '253px !important'
      }
    },
    rules: [
      {
        required: true,
        validator: (rule, value, callback) => {
          setTimeout(() => {
            addClueFormPreset.forEach((e, idx) => {
              if (e.id === 'primaryCode') {
                if (!e.data.model || e.data.model.length === 0) {
                  return callback(new Error('请选择'))
                } else {
                  callback()
                }
              }
            })
          }, 0)
        },
        trigger: 'change'
      }
    ],
    function: {
      change: (val) => {
        console.log('选择节点变化了', val)
      }
    },
    componentsProps: {
      clearable: true,
      placeholder: '请选择',
      options: [],
      'filter-method': (node, keyword) => {
        if (!node.children || node.children.length === 0) {
          const isok = node.data.label.includes(keyword)
          console.log(keyword, '--node--', node.data.label, '---', isok)
          return isok
        }
      },
      filterable: true
    }
  },
  {
    type: 'form-el-cascader',
    label: '活动来源:',
    id: 'activityCode',
    data: {
      componentTemplateType: 'base', // 模板类型
      model: [],
      componentsStyle: {
        width: '253px'
      }
    },
    rules: [],
    function: {
      change: (val) => {
        console.log('选择节点变化了', val)
      }
    },
    componentsProps: {
      clearable: true,
      placeholder: '请选择',
      options: [],
      'filter-method': (node, keyword) => {
        if (!node.children || node.children.length === 0) {
          const isok = node.data.label.includes(keyword)
          console.log(keyword, '--node--', node.data.label, '---', isok)
          return isok
        }
      },
      filterable: true
    }
  },
  {
    type: 'form-el-cascader',
    label: '经销商名称:',
    id: 'dealerCode',
    data: {
      componentTemplateType: 'base', // 模板类型
      model: [],
      componentsStyle: {
        width: '253px'
      }
    },
    rules: [],
    function: {
      change: (val) => {
        console.log('选择节点变化了', val)
      }
    },
    componentsProps: {
      clearable: true,
      placeholder: '请选择',
      options: [],
      'filter-method': (node, keyword) => {
        if (!node.children || node.children.length === 0) {
          const isok = node.data.label.includes(keyword)
          console.log(keyword, '--node--', node.data.label, '---', isok)
          return isok
        }
      },
      filterable: true
    }
  },

  {
    type: 'form-el-select',
    label: '意向车型:',
    id: 'carModelCode',
    data: {
      componentTemplateType: 'base', // 模板类型
      model: '',
      componentsStyle: {
        width: '253px',
        'margin-right': '405px'
      },
      selectList: []
    },
    function: {},
    componentsProps: {
      clearable: true,
      placeholder: '请选择',
      filterable: true
    }
  },
  {
    type: 'form-el-select',
    label: '省:',
    id: 'provinceCode',
    data: {
      componentTemplateType: 'base', // 模板类型
      // prefix: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
      model: '',
      componentsStyle: {
        width: '253px'
      },
      selectList: []
    },
    function: {
      change: (val, comId) => {
        console.log(addClueFormPreset, '省份：', val, '======', comId)
        if (val) {
          // Vue.prototype.$api
          //   .getProvinceCityDistrictInfo({
          //     parentCode: val
          //   })
          //   .then((res) => {
          //     console.log('市-列表：', res)
          //     addClueFormPreset.forEach((e, idx) => {
          //       if (e.id === 'cityCode') {
          //         e.data.selectList = res.map((e) => {
          //           return {
          //             label: e.name,
          //             value: e.code
          //           }
          //         })
          //         // 通知组件进行修改 data 数据
          //         e.data.model = ''
          //         // Vue.prototype.$ebs.emit(`${e.type}-${idx}-`, e)
          //       } else if (e.id === 'regionCode') {
          //         e.data.selectList = []
          //         e.data.model = ''
          //         // 通知组件进行修改 data 数据
          //         // Vue.prototype.$ebs.emit(`${e.type}-${idx}-`, e)
          //       }
          //     })
          //   })
        } else {
          addClueFormPreset.forEach((e, idx) => {
            if (e.id === 'cityCode') {
              e.data.selectList = []
              // 通知组件进行修改 data 数据
              e.data.model = ''
              // Vue.prototype.$ebs.emit(`${e.type}-${idx}-`, e)
            } else if (e.id === 'regionCode') {
              e.data.selectList = []
              e.data.model = ''
              // 通知组件进行修改 data 数据
              // Vue.prototype.$ebs.emit(`${e.type}-${idx}-`, e)
            }
          })
        }
      }
    },
    componentsProps: {
      clearable: true,
      placeholder: '请选择',
      filterable: true
    }
  },
  {
    type: 'form-el-select',
    label: '市:',
    id: 'cityCode',
    data: {
      componentTemplateType: 'base', // 模板类型
      // prefix: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
      model: '',
      componentsStyle: {
        width: '253px'
      },
      selectList: []
    },
    function: {
      change: (val, comId) => {
        console.log(addClueFormPreset, '市份：', val, '======', comId)
        if (val) {
          // Vue.prototype.$api
          //   .getProvinceCityDistrictInfo({
          //     parentCode: val
          //   })
          //   .then((res) => {
          //     console.log('市-列表：', res)
          //     addClueFormPreset.forEach((e, idx) => {
          //       if (e.id === 'regionCode') {
          //         e.data.selectList = res.map((e) => {
          //           return {
          //             label: e.name,
          //             value: e.code
          //           }
          //         })
          //         // 通知组件进行修改 data 数据
          //         e.data.model = ''
          //         // Vue.prototype.$ebs.emit(`${e.type}-${idx}-`, e)
          //       }
          //     })
          //   })
        } else {
          addClueFormPreset.forEach((e, idx) => {
            if (e.id === 'regionCode') {
              e.data.selectList = []
              // 通知组件进行修改 data 数据
              e.data.model = ''
              // Vue.prototype.$ebs.emit(`${e.type}-${idx}-`, e)
            }
          })
        }
      }
    },
    componentsProps: {
      clearable: true,
      placeholder: '请选择',
      filterable: true
    }
  },
  {
    type: 'form-el-select',
    label: '区:',
    id: 'regionCode',
    data: {
      componentTemplateType: 'base', // 模板类型
      // prefix: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
      model: '',
      componentsStyle: {
        width: '253px'
      },
      selectList: []
    },
    function: {},
    componentsProps: {
      clearable: true,
      placeholder: '请选择',
      filterable: true
    }
  }
]
