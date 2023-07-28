<template>
  <div class="search-panel-container">
    <el-form
      :model="formData"
      ref="form"
      labelPosition="left"
      @submit.prevent
      label-width="100px"
    >
      <el-row :gutter="24">
        <el-col
          :lg="v.isBlock ? 24 : 8"
          :md="v.isBlock ? 24 : 12"
          :sm="24"
          v-for="(v, index) in searchData"
          :key="index"
          v-show="open || Number(index) < 8"
        >
          <el-form-item :label="v.label" :prop="v.name" :rules="v.rules || []">
            <el-input
              v-if="v.type === 'input'"
              v-model="formData[v.name]"
              :placeholder="v.placeholder || `请输入${v.label}`"
              :maxlength="v.length || 200"
              :clearable="v.clearable === false ? false : true"
              :disabled="v.disabled"
              :show-word-limit="v.showlimit"
            ></el-input>
            <el-select
              v-if="v.type === 'select'"
              v-model="formData[v.name]"
              :clearable="v.clearable === false ? false : true"
              filterable
              :disabled="v.disabled"
              :placeholder="v.placeholder || `请选择${v.label}`"
              @change="handleSelectChange(v.name, v.autoSearch)"
              style="width: 100%"
            >
              <el-option
                v-for="option in v.data"
                :label="option.text"
                :value="option.value"
                :key="option.value"
              ></el-option>
            </el-select>
            <el-cascader
              v-if="v.type === 'cascader'"
              v-model="formData[v.name]"
              :options="v.data"
              placeholder="请选择"
              :props="v.props"
              style="width: 100%"
            ></el-cascader>
            <!-- 选择输入框 -->
            <el-select
              v-if="v.type === 'input-select'"
              v-model="formData[v.name]"
              v-el-select-scroll="handleScroll"
              filterable
              :loading="loadStatus"
              :placeholder="v.placeholder || `请选择${v.label}`"
              :clearable="v.clearable"
              :filter-method="getSomeThingPage"
              @visible-change="getSomeThing"
              style="width: 100%"
            >
              <el-option
                v-for="option in v.data"
                :key="option.text"
                :label="option.text"
                :value="option.value"
              ></el-option>
            </el-select>
            <el-radio-group
              v-if="v.type === 'radio-button'"
              v-model="formData[v.name]"
              :disabled="v.disabled"
              @change="handleSelectChange(v.name, v.autoSearch)"
              style="white-space: nowrap; vertical-align: top"
            >
              <el-radio-button
                v-for="option in v.data"
                :label="option.value"
                :key="option.value"
                >{{ option.text }}
              </el-radio-button>
            </el-radio-group>
            <el-radio-group
              v-if="v.type === 'radio'"
              v-model="formData[v.name]"
              :disabled="v.disabled"
              @change="handleSelectChange(v.name, v.autoSearch)"
            >
              <el-radio
                v-for="option in v.data"
                :label="option.value"
                :key="option.value"
                >{{ option.text }}</el-radio
              >
            </el-radio-group>
            <el-date-picker
              v-if="v.type === 'date'"
              v-model="formData[v.name]"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :disabled="v.disabled"
              style="width: 100%"
              type="date"
              :clearable="v.clearable === false ? false : true"
              placeholder="请选择日期"
              @change="handleSelectChange(v.name, v.autoSearch)"
            >
            </el-date-picker>
            <el-date-picker
              v-if="v.type === 'dateRange'"
              v-model="dateData[index].value"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="handleSelectChange([v.name1, v.name2], v.autoSearch)"
              :disabled="v.disabled"
              :clearable="v.clearable === false ? false : true"
              style="width: 100%"
              :pickerOptions="v.pickerOptions || null"
            ></el-date-picker>
            <el-date-picker
              v-if="v.type === 'dateTimeRange'"
              v-model="dateData[index].value"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="handleSelectChange([v.name1, v.name2], v.autoSearch)"
              :disabled="v.disabled"
              :clearable="v.clearable === false ? false : true"
              style="width: 100%"
              :pickerOptions="v.pickerOptions || null"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          :lg="
            open || searchDataLength < 8
              ? searchDataLength % 3 === 0
                ? 24
                : searchDataLength % 3 === 1
                ? 16
                : 8
              : 8
          "
          :md="
            open || searchDataLength < 8
              ? searchDataLength % 2 === 0
                ? 24
                : 12
              : 24
          "
          :sm="24"
        >
          <el-form-item class="sp-align-r" label-width="0">
            <el-button type="primary" @click="search" :loading="loading"
              >搜索</el-button
            >
            <el-button @click="resetForm" :loading="loading">重置</el-button>
            <!-- <el-button type="text" v-if="searchDataLength > 8 && !open" @click="open = true">展开</el-button>
            <el-button type="text" v-if="open" @click="open = false">收起</el-button> -->
            <el-button
              type="primary"
              style="margin-left: 30px"
              v-if="hasExport"
              @click="exportEvent"
              :loading="exportLoad"
              >导出</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpSearchPanel',
  data() {
    const dateData = []
    const formData = {}
    this.searchData.map((v, i) => {
      if (v.type === 'dateRange' || v.type === 'dateTimeRange') {
        dateData[i] = {
          name1: v.name1,
          name2: v.name2,
          value: v.defaultValue
        }
        formData[v.name1] = undefined
        formData[v.name2] = undefined
        if (Array.isArray(v.defaultValue)) {
          formData[v.name1] = v.defaultValue[0]
          formData[v.name2] = v.defaultValue[1]
        } else {
          formData[v.name1] = undefined
          formData[v.name2] = undefined
        }
      } else {
        formData[v.name] = undefined
        if (v.defaultValue !== undefined) {
          formData[v.name] = v.defaultValue
        } else {
          formData[v.name] = undefined
        }
      }
    })
    return {
      formData: formData,
      dateData,
      height: undefined,
      width: undefined,
      open: false,
      pageNo: 1,
      filterData: ''
    }
  },
  props: {
    // 表单数据
    searchData: {
      type: Array,
      default: () => []
    },
    // 导出按钮标识
    hasExport: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    exportLoad: {
      type: Boolean,
      default: false
    },
    getSomeThingList: {
      type: Function
    },
    loadStatus: {
      type: Boolean
    },
    total: {
      type: Number,
      default: 0
    },
    // 原本的重置按钮无法重置（默认）数据.这里用这个字段来做重置
    isResetDefaultData: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    searchDataLength() {
      let isBlockLen = this.searchData.filter(item => item.isBlock).length
      return this.searchData.length - isBlockLen
    }
  },
  methods: {
    init(value) {
      if (value) {
        this.searchData.map(v => {
          if (typeof v.render === 'function') {
            v.render()
          }
        })
      }
      this.resetForm()
    },
    dataProcess() {
      this.dateData.map(v => {
        if (v.value && v.value.length === 0) {
          v.value = null
        } else {
          this.formData[v.name1] = v.value ? v.value[0] : null
          this.formData[v.name2] = v.value ? v.value[1] : null
        }
      })
      this.$forceUpdate()
    },
    transFormData() {
      let formData = {}
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dataProcess()
          Object.keys(this.formData).forEach(key => {
            if (
              typeof this.formData[key] === 'string' &&
              this.formData[key] !== undefined
            ) {
              formData[key] =
                this.formData[key].replace(/(^\s*)|(\s*$)/g, '') || undefined
            } else {
              formData[key] = this.formData[key]
            }
          })
        } else {
          formData = false
        }
      })
      return formData
    },
    search() {
      let formData = this.transFormData()
      if (!formData) {
        return
      }
      this.$emit('search', formData)
    },
    exportEvent() {
      let formData = this.transFormData()
      if (!formData) {
        return
      }
      this.$emit('export', formData)
    },
    resetForm() {
      this.$refs.form.resetFields()
      this.dateData.map(v => {
        v.value = null
      })
      if (this.isResetDefaultData) {
        this.searchData.map((v, i) => {
          if (v.defaultValue !== undefined) {
            Object.keys(this.formData).forEach(key => {
              if (key === v.name) {
                this.formData[key] = undefined
              }
            })
          }
        })
      }

      this.search()
    },
    handleSelectChange(name, autoSearch) {
      if (autoSearch) {
        this.search()
      } else if (Array.isArray(name)) {
        this.dataProcess()
      }
      let data = {}
      if (Array.isArray(name)) {
        data[name[0]] = String(this.formData[name[0]])
          ? this.formData[name[0]]
          : undefined
        data[name[1]] = String(this.formData[name[1]])
          ? this.formData[name[1]]
          : undefined
      } else {
        data[name] = String(this.formData[name])
          ? this.formData[name]
          : undefined
      }
      this.$emit('selectChange', data)
    },
    handleScroll(param) {
      /*
       * 处理滚动行为
       * param: 滚动行为
       *  true 向下滚动
       *  false 向上滚动
       */
      // console.log(param)
      // 此处判断 !this.queryKeyword 是防止在搜索关键词的结果上追加数据
      // 在后台判断关键词长度，至少要输入2个关键字，才可搜索
      // 否则，还是会出现查询时间长的情况
      if (param && !this.queryKeyword) {
        // 请求下一页数据
        if (this.pageNo * 10 < this.total) {
          this.pageNo++
          this.getSomeThingList('current', {
            pageNo: this.pageNo,
            pageSize: 10,
            filterData: this.filterData || ''
          })
        }
      }
    },
    getSomeThingPage(v) {
      this.filterData = v
      this.pageNo = 1
      this.getSomeThingList('search', {
        pageNo: this.pageNo,
        pageSize: 10,
        filterData: this.filterData || ''
      })
    },
    getSomeThing() {
      this.pageNo = 1
      this.getSomeThingList('search', {
        pageNo: this.pageNo,
        pageSize: 10,
        filterData: this.filterData || ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-panel-container {
  padding: 20px 0 0;
}
</style>
