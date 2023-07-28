<template>
  <div class="module">
    没有兼容 vue3
    <!-- 条件筛选 -->
    <div v-if="false">
      <template v-if="formData.componentsList.length > 0">
        <DyForm
          class="customView"
          :ref="formData.formType"
          :formData="formData"
          @initDone="(val) => (this.dyFormSelfe = val)"
          @modelChange="modelChange"
        ></DyForm>
      </template>

      <!-- 功能按钮 -->
      <div class="items-center operate">
        <div class="items-center">
          <!-- 新增 -->
          <AddClueView
            style="margin-right: 10px"
            @refresh="submitForm"
          ></AddClueView>
          <!-- 导入 -->
          <!-- <ImportFile
            style="margin-right: 10px"
            @updateList="submitForm"
          ></ImportFile> -->
          <el-button class="operate-btn-solid" @click="exportClueListRequest"
            >导出</el-button
          >
          <div class="operate-btn-a">
            <router-link
              style="color: #2f355d !important"
              :to="{ name: 'leadmanagementimport' }"
            >
              导入历史
            </router-link>
          </div>
        </div>
        <div class="items-center">
          <FilterView
            class="operate-dialog"
            :filterData="getFilterData"
            @change="updateSeting"
          ></FilterView>
          <el-button class="operate-btn-border" @click="resetForm"
            >重置</el-button
          >
          <el-button class="operate-btn-solid" @click="submitForm"
            >搜索</el-button
          >
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table">table 组件</div>
    <!-- 导出 -->
    <el-dialog title="成功" v-model:visible="dialogVisibleExport" width="20%">
      <span
        >导出成功，请前往
        <a :href="getExportUrl" target="_blank">下载中心</a> 下载</span
      >
      <template v-slot:footer>
        <div
          class="dialog-footer items-center"
          style="justify-content: flex-end"
        >
          <el-button @click="dialogVisibleExport = false">关 闭</el-button>
          <div
            class="operate-btn-a"
            style="background-color: #2f355d; border: none"
            @click="dialogVisibleExport = false"
          >
            <a
              :href="getExportUrl"
              target="_blank"
              style="color: #fff !important"
              >前 往</a
            >
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { columns, formDataPreset, filterStaticData } from "./static-data.js";
import { componentsPreset } from "./dyform-commponent/components.js";
import _ from "lodash";
import FilterView from "./filter-seting/index";
import AddClueView from "./add-clue-origin/index";
// import ImportFile from "../components/Importi-file/index.vue";
import DyForm from "./dyform-commponent/index";
import moment from "moment";

export default {
  name: "KeepAliveClueIndex",
  components: { DyForm, FilterView, AddClueView },
  data() {
    return {
      // dy 表单
      dyFormSelfe: {}, // 表单实例
      formData: {
        formType: "formTypeBase", // form的ref，也代表模板类型
        labelPosition: "right", // 表单label对齐方式
        labelWidth: "140px",
        formStyle: {
          display: "flex",
          "flex-wrap": "wrap",
          "justify-content": "flex-start",
        },
        componentsList: [],
      },
      // 列表
      columns,
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
      tableData: [],
      // 导出
      dialogVisibleExport: false,
      // 搜索参数
      searchParam: {},
    };
  },
  computed: {
    getFilterData() {
      return this.formData.componentsList.map((e) => e.value || e.id);
    },
    getExportUrl() {
      return this.$store.state.exporturl || "";
    },
  },
  created() {
    // this.init();
  },
  methods: {
    /**
     * @description: 初始化筛选条件，表格数据
     */
    init() {
      // 1. 获取筛选条件
      const ids = formDataPreset.map((e) => {
        return e.id;
      });
      this.getComponentsData(ids);
      this.formData.componentsList = formDataPreset;
      // 2. 获取没有筛选条件的列表数据
      this.getClueListRequest({});
    },

    /**
     * @description: 根据组件类型，获取组件网络数据
     */
    getComponentsData(val) {
      return val.map((e) => {
        let obj;
        filterStaticData.forEach((item) => {
          if (item.list) {
            item.list.forEach((o) => {
              if (o.value === e) {
                obj = o;
                // 1.1.1 获取各各下拉选择组件：列表数据
                if (e === "dealerCode") {
                  this.getTypeInfoRequest("dealerCode", true);
                } else if (e === "primaryCode") {
                  this.getTypeInfoRequest("primaryCode", true);
                } else if (e === "activityCode") {
                  this.getTypeInfoRequest("activityCode", true);
                } else if (e === "carModelCode") {
                  this.getTypeInfoRequest("carModelCode", false);
                } else if (e === "collectResult") {
                  this.getTypeInfoRequest("collectResult", false);
                } else if (e === "leadStatus") {
                  this.getTypeInfoRequest("leadStatus", false);
                } else if (e === "mobileValid") {
                  this.getTypeInfoRequest("mobileValid", false);
                } else if (e === "demandValid") {
                  this.getTypeInfoRequest("demandValid", false);
                }
              }
            });
          }
        });
        return obj;
      });
    },
    /**
     * @description: 重新渲染搜索条件
     * @param {Array} list [{label: "经销商名称",type: "form-el-input",value: "dealerCode"}]
     */
    updateSeting(list, isInit) {
      console.log(isInit ? "第一次初始化：" : "更新筛选条件：", list);
      if (!isInit) {
        list = this.getComponentsData(list);
      }

      // 配置表单渲染数据
      this.formData.componentsList = list.map((item, idx) => {
        let obj;
        componentsPreset.forEach((element) => {
          if (element.type === item.type) {
            obj = _.cloneDeep({ ...element, ...item });
            obj.sort = item.sort; // 按照sotr值，进行排序
            obj.id = item.value; // 唯一标识
            obj.label = `${item.label}:`; // 设置表单项名称
            if (item.type === "form-el-input") {
              obj.data.componentsStyle = { width: "253px !important" }; // 设置输入框宽度
              obj.componentsProps.clearable = true; // 增加输入框清除icon
              if (item.value === "mobile") {
                obj.rules = {
                  validator: (rule, value, cb) => {
                    console.log("校验手机号");

                    let len = (value && String(value).trim().length) || 0;
                    if (len > 0 && len !== 11) {
                      cb(new Error("请输入完整手机号"));
                    } else {
                      cb();
                    }
                  },
                  trigger: "blur",
                };
              }
            } else if (item.type === "form-el-date-picker") {
              obj.data.componentsStyle = { width: "435px !important" }; // 设置输入框宽度
              let selectTime; // 当前选择的时间
              obj.componentsProps = {
                clearable: true,
                type: "daterange", // 组件类型
                "value-format": "yyyy-MM-dd",
                "range-separator": "至",
                "unlink-panels": true,
                "start-placeholder": "开始日期",
                "end-placeholder": "结束日期",
                "picker-options": {
                  disabledDate: (time) => {
                    if (!selectTime) {
                      if (time.getTime() > Date.now()) {
                        return true;
                      }
                      return false;
                    }
                    return (
                      time.getTime() > Date.now() ||
                      time.getTime() > selectTime + 60 * 60 * 24 * 365 * 1000 ||
                      time.getTime() < selectTime - 60 * 60 * 24 * 365 * 1000
                    );
                  },
                  onPick: (val) => {
                    if (!val.minDate || !val.maxDate) {
                      selectTime =
                        (val.minDate && val.minDate.getTime()) ||
                        (val.maxDate && val.maxDate.getTime());
                    } else {
                      selectTime = 0;
                    }
                  },
                },
              };
            } else if (item.type === "form-el-select") {
              obj.data.componentsStyle = { width: "253px !important" }; // 设置输入框宽度
              obj.componentsProps.filterable = true;
              obj.componentsProps.clearable = true;

              // 布尔值选项，初始化默认值
              if (item.value === "isCall") {
                obj.data.selectList = [
                  {
                    value: "0",
                    label: "否",
                  },
                  {
                    value: "1",
                    label: "是",
                  },
                ];
                // 因为已经存在 form-el-select 组件了，所以在更改data属性已经不起作用了，后续可以尝试-父子传值-：data 的变化来处理
                this.$nextTick(() => {
                  this.$ebs.emit(obj.prefixId, obj);
                });
              }
            } else if (item.type === "form-el-cascader") {
              obj.data.componentsStyle = { width: "253px !important" }; // 设置输入框宽度
              obj.data.model = [];
              obj.componentsProps.filterable = true;
              obj.componentsProps.clearable = true;
            }
          }
        });
        return obj;
      });

      this.formData.componentsList = this.formData.componentsList.sort(
        (a, b) => {
          return a.sort - b.sort;
        }
      );
      console.log("配置结果：", this.formData);
    },
    /**
     * @description: 获取各各组件所需数据源
     * @param {*} type 请求字段（唯一标识）
     * @param {*} isProps 使用那种方式传递值： true属性传递  false通知传递
     */
    getTypeInfoRequest(type, isProps) {
      let request = "";
      if (type === "dealerCode") {
        request = "getDealerInfo";
      } else if (type === "primaryCode") {
        request = "getChannelInfo";
      } else if (type === "activityCode") {
        request = "getActivityCascaderInfo";
      } else if (type === "carModelCode") {
        request = "getCarTypeInfo";
      } else if (type === "collectResult") {
        request = "getCollectResultsInfo";
      } else if (type === "leadStatus") {
        request = "getClueStatusInfo";
      } else if (type === "mobileValid") {
        request = "getMobileValidInfo";
      } else if (type === "demandValid") {
        request = "getDemandValidInfo";
      }

      if (request) {
        // this.$api[request]().then((res) => {
        // console.log("接口：", request, "-数据：", res);
        this.formData.componentsList.forEach((e, idx) => {
          if (e.id === type) {
            if (isProps) {
              e.componentsProps.options = [];
            } else {
              e.data.selectList = [];
              this.$ebs.emit(`${e.type}-${idx}-`, e);
            }
          }
        });
        // });
      }
    },
    /**
     * @description: 导出
     */
    exportClueListRequest() {
      let self = this;
      this.submitForm(false, (param) => {
        self.$api.exportClueList(param).then((res) => {
          if (res) self.dialogVisibleExport = true;
        });
      });
    },
    /**
     * @description: 获取列表数据
     */
    getClueListRequest(param) {
      // 1. 重置-搜索参数-状态
      this.isChangeSearchParam = false;
      // 2. 赋值数据源
      this.pageTotal = 0;
      this.tableData = [];
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.submitForm();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.submitForm();
    },

    /**
     * @description: form 中model发生改变会被触发
     */
    modelChange(val) {
      console.log(this.formData, "--收到dyFrom组件数据变化--", val);
      // 1. 赋值搜索参数
      this.searchParam = val;
      // 2. 是否变更了搜索参数
      this.isChangeSearchParam = true;
    },

    /**
     * @description: 搜索
     * @param {*} isReset 是否是重置
     * @param {*} call 回调请求参数
     */
    submitForm(isReset, call) {
      console.log("this.dyFormSelfe.$refs", this.dyFormSelfe.$refs);

      this.dyFormSelfe.$refs[`${this.formData.formType}`].validate((valid) => {
        if (valid) {
          let param;
          // 重置所有条件
          if (isReset === true) {
            param = {};
            this.currentPage = 1;
            this.pageSize = 10;
          } else {
            // 搜索参数是否发生变更，变更则重新搜搜第一页数据
            if (this.isChangeSearchParam) {
              this.currentPage = 1;
              this.pageSize = 10;
            }
            param = _.cloneDeep(this.searchParam);
            // 渠道来源
            if (
              this.searchParam.primaryCode &&
              this.searchParam.primaryCode.length > 0
            ) {
              param.channelGroupCode = this.searchParam.primaryCode[0];
              param.primaryCode = this.searchParam.primaryCode[1];
              param.secondaryCode = this.searchParam.primaryCode[2];
            }
            // 活动来源
            if (
              this.searchParam.activityCode &&
              this.searchParam.activityCode.length > 0
            ) {
              param.activityGroupCode = this.searchParam.activityCode[0];
              param.activityCode = this.searchParam.activityCode[1];
            }
            // 经销商
            if (
              this.searchParam.dealerCode &&
              this.searchParam.dealerCode.length > 0
            ) {
              param.dealerCode =
                this.searchParam.dealerCode[
                  this.searchParam.dealerCode.length - 1
                ];
            }
            // 原始线索创建时间
            if (
              this.searchParam.createTime &&
              this.searchParam.createTime.length > 0
            ) {
              param.createStartTime = new Date(
                `${this.searchParam.createTime[0]} 00:00:00`
              ).getTime();
              param.createEndTime = new Date(
                `${this.searchParam.createTime[1]} 23:59:59`
              ).getTime();
            }
            // 原始线索-报名-时间
            if (
              this.searchParam.applyTime &&
              this.searchParam.applyTime.length > 0
            ) {
              param.applyStartTime = new Date(
                `${this.searchParam.applyTime[0]} 00:00:00`
              ).getTime();
              param.applyEndTime = new Date(
                `${this.searchParam.applyTime[1]} 23:59:59`
              ).getTime();
            }
            if (param.isCall !== "" && param.isCall !== undefined) {
              param.isCall = param.isCall === "1";
            } else {
              delete param.isCall;
            }
            // 删除数据中不标准的字段值，以便后端请求参数校验通过
            if (typeof param.primaryCode === "object") {
              delete param.primaryCode;
            }
            if (typeof param.activityCode === "object") {
              delete param.activityCode;
            }
            if (typeof param.dealerCode === "object") {
              delete param.dealerCode;
            }
            if (typeof param.createTime === "object") {
              delete param.createTime;
            }
            if (typeof param.applyTime === "object") {
              delete param.applyTime;
            }
          }
          console.log(
            this.searchParam.applyTime,
            "请求",
            isReset,
            "参数：",
            param
          );
          if (call) {
            call(param);
          } else {
            this.getClueListRequest(param);
          }
        } else {
          console.log("表单验证失败", valid);
          return false;
        }
      });
    },
    /**
     * @description: 重置
     */
    resetForm() {
      this.dyFormSelfe.$refs[`${this.formData.formType}`].resetFields();
      // console.log('重置以后：ruleForm--', this.dyFormSelfe.refModel)
      this.submitForm(true);
    },
  },
};
</script>
<style lang="scss">
.table {
  .el-table__empty-block {
    width: initial !important;
  }
}
</style>
<style lang="scss" scoped>
.module {
  .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    &-item {
      &-comwidth {
        width: 253px;
      }
    }
  }
  .operate {
    justify-content: space-between;
    &-dialog {
      margin-right: 10px;
    }
    &-btn-solid {
      background-color: #2f355d;
      color: #fff;
    }
    &-btn-border {
      border-color: #2f355d;
    }

    &-btn-a {
      margin-left: 10px;
      width: 90px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 3px;
      border: 1px solid #2f355d;
    }
  }
  .table {
    margin-top: 24px;
    &-page {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
