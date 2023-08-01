<template>
  <div class="module">
    <el-button type="primary" @click="outerVisible = true">新增</el-button>
    <!-- 弹窗 -->
    <el-dialog
      width="1250px"
      v-model:visible="outerVisible"
      :before-close="handleClose1"
    >
      <template v-slot:title>
        <div class="title">新增原始线索</div>
      </template>

      <div id="filterdialogid1" class="content">
        <div class="top">
          <div class="content-title">规则说明：</div>
          <div>
            <template
              v-if="
                formData.componentsList && formData.componentsList.length > 0
              "
            >
              <DyForm
                class="customView"
                :ref="formData.formType"
                :formData="formData"
                @initDone="(val) => (this.dyFormSelfe = val)"
                @modelChange="modelChange"
              ></DyForm>
            </template>
          </div>
        </div>
        <div class="bottom">
          <div>注：</div>
          <div>
            1、所有带 “<span style="color: red">*</span>” 的信息为必填项
          </div>
          <div>2、手机号和座机号选一项填写即可</div>
          <div>
            3、若未填写经销商名称或者省市区，原始线索将进入线索清洗进行外呼清洗
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button :disabled="btnLoading" @click="handleClose1"
            >取 消</el-button
          >
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="addClueInfoRequest"
            >新 增</el-button
          >
        </div>
      </template>
    </el-dialog>
    <!-- 结果 -->
    <el-dialog
      width="700px"
      title="提示"
      v-model:visible="innerVisible"
      :before-close="handleClose2"
    >
      <template v-slot:title>
        <div class="title">新增原始线索</div>
      </template>

      <div class="content" id="filterdialogid2">
        <div class="finish-top">
          <el-steps :active="1" finish-status="success">
            <el-step title="新增成功"></el-step>
            <el-step :title="addResultsName"></el-step>
          </el-steps>
        </div>
        <div v-if="collectResult || username">
          <!-- 表头 -->
          <div class="items-center column">
            <div class="column-title">原始线索姓名</div>
            <template v-if="addResultsName === '已归集'">
              <div class="column-title">经销商名称</div>
              <div class="column-title">归集结果</div>
            </template>
            <div class="column-title" v-else>新增结果</div>
          </div>
          <!-- 内容 -->
          <!-- <div class="items-center" v-for="(item, index) in addDetails" :key="index"> -->
          <div class="items-stretch">
            <div class="column-item">{{ username }}</div>
            <template v-if="addResultsName === '已归集'">
              <div class="column-item">{{ dealerName }}</div>
              <div class="column-item">{{ collectResult }}</div>
            </template>
            <div class="column-item" style="color: #71bdf7" v-else>
              <div>原始线索无经销商信息，进入线索清洗</div>
              <div>查看路径：线索-线索清洗</div>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleClose2">关 闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import DyForm from "@/components/dy-form/index.vue";
import { addClueFormPreset } from "../static-data";
import _ from "lodash";

export default {
  name: "addclueorigin",
  components: { DyForm },
  data() {
    return {
      // 新增弹框
      outerVisible: false,
      // 结果弹窗
      innerVisible: false,
      // 表单数据
      dyFormSelfe: {}, // 表单实例
      formData: {
        formType: "formTypeBase", // form的ref，也代表模板类型
        labelPosition: "right", // 表单label对齐方式
        labelWidth: "140px",
        formStyle: {
          display: "flex",
          "flex-wrap": "wrap",
          "justify-content": "space-between",
        },
        componentsList: this.inputRule(),
      },
      // 表单传值
      dyResults: {},
      // 新增结果
      btnLoading: false,
      addResultsName: "",
      collectResult: "",
      dealerName: "",
      username: "",
      addDetails: [],
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      // 1. 渠道来源，赋值数据源
      this.$api.getChannelInfo({ status: 1 }).then((res) => {
        console.log("渠道来源列表：", res);
        this.formData.componentsList.forEach((e) => {
          if (e.id === "primaryCode") {
            e.componentsProps.options = res;
          }
        });
      });
      // 2. 活动来源
      this.$api.getActivityCascaderInfo({ status: 1 }).then((res) => {
        console.log("活动来源-列表：", res);
        this.formData.componentsList.forEach((e) => {
          if (e.id === "activityCode") {
            e.componentsProps.options = res;
          }
        });
      });
      // 3. 意向车型
      this.$api.getCarTypeInfo().then((res) => {
        console.log("意向车型-列表：", res);
        this.formData.componentsList.forEach((e) => {
          if (e.id === "carModelCode") {
            e.data.selectList = res;
          }
        });
      });
      // 4. 经销商
      this.$api.getDealerInfo({ status: 1 }).then((res) => {
        console.log("经销商-列表：", res);
        this.formData.componentsList.forEach((e) => {
          if (e.id === "dealerCode") {
            e.componentsProps.options = res;
          }
        });
      });
      // 5. 获取省份数据，根据省份数据可以获取市一级别
      this.$api.getProvinceCityDistrictInfo().then((res) => {
        console.log("省-列表：", res);
        this.formData.componentsList.forEach((e) => {
          if (e.id === "provinceCode") {
            e.data.selectList = res.map((e) => {
              return {
                label: e.name,
                value: e.code,
              };
            });
          }
        });
      });
    },
    /**
     * @description: 单独~处理校验手机号和座机号的规则
     */
    inputRule() {
      addClueFormPreset[0].rules = [
        {
          required: true,
          validator: (rule, value, cb) => {
            let len = (value && String(value).trim().length) || 0;
            // 1. 先判断是不是为空
            if (len === 0) {
              if (
                this.dyResults.telephone &&
                this.dyResults.telephone.includes("-") &&
                /^([08]\d{2,3}(-)?\d{7,8})/.test(this.dyResults.telephone)
              ) {
                cb();
              } else {
                cb(new Error("请输入正确的手机号"));
              }
            } else {
              // 2. 在分情况考虑
              if (
                len !== 11 ||
                !/^1([3478]\d|5[^4]|6[2567]|9[^4])\d{8}$/.test(value)
              ) {
                cb(new Error("请输入正确的手机号"));
              } else {
                cb();
              }
            }
          },
          trigger: "blur",
        },
      ];
      addClueFormPreset[1].rules = [
        {
          required: true,
          validator: (rule, value, cb) => {
            // console.log(rule, '--source--', this.dyResults)
            if (value.length === 0) {
              if (
                this.dyResults.mobile &&
                /^1([3478]\d|5[^4]|6[2567]|9[^4])\d{8}$/.test(
                  this.dyResults.mobile
                )
              ) {
                cb();
              } else {
                cb(new Error("请输入正确的座机号"));
              }
            } else {
              if (
                !value.includes("-") ||
                !/^([08]\d{2,3}(-)?\d{7,8})/.test(value)
              ) {
                cb(new Error("请输入正确的座机号"));
              } else {
                cb();
              }
            }
          },
          trigger: "blur",
        },
      ];
      return addClueFormPreset;
    },

    /**
     * @description: 确定：保存选择的筛选项
     */
    addClueInfoRequest() {
      this.dyFormSelfe.$refs[`${this.formData.formType}`].validate((valid) => {
        if (valid) {
          const param = _.cloneDeep(this.dyResults);
          // 渠道来源
          if (
            this.dyResults.primaryCode &&
            this.dyResults.primaryCode.length > 0
          ) {
            param.channelGroupCode = this.dyResults.primaryCode[0];
            param.primaryCode = this.dyResults.primaryCode[1];
            param.secondaryCode = this.dyResults.primaryCode[2];
          }
          // 活动来源
          if (
            this.dyResults.activityCode &&
            this.dyResults.activityCode.length > 0
          ) {
            param.activityGroupCode = this.dyResults.activityCode[0];
            param.activityCode = this.dyResults.activityCode[1];
          }
          // 经销商
          if (
            this.dyResults.dealerCode &&
            this.dyResults.dealerCode.length > 0
          ) {
            param.dealerCode =
              this.dyResults.dealerCode[this.dyResults.dealerCode.length - 1];
          }
          // 删除多余参数
          if (typeof param.activityCode === "object") {
            delete param.activityCode;
          }
          if (typeof param.dealerCode === "object") {
            delete param.dealerCode;
          }
          if (typeof param.primaryCode === "object") {
            delete param.primaryCode;
          }

          //
          console.log(this.dyResults, "请求参数：", param);
          this.btnLoading = true;
          const loading = this.$loading({
            target: "#filterdialogid1",
            text: "Loading",
            spinner: "el-icon-loading",
          });
          this.$api
            .addClueInfo(param)
            .then((res) => {
              loading.close();
              this.btnLoading = false;
              console.log("新增线索res:", res);
              if (res.handleResult) {
                this.outerVisible = false;
                this.innerVisible = true;

                this.addResultsName = res.handleResult; // 归集结果（已归集/待外呼）
                this.collectResult = res.collectResult || ""; // 原始线索姓名
                this.dealerName = res.dealerName || ""; // 经销商名称
                this.username = res.username || ""; // 归集结果
                this.$emit("refresh");
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "新增失败",
                });
              }
            })
            .catch(() => {
              loading.close();
              this.btnLoading = false;
            });
        }
      });
    },
    // 新增关闭前-事件
    handleClose1() {
      if (!this.btnLoading) {
        // 1. 隐藏弹框
        this.outerVisible = false;
        // 2. 重置状态
        this.dyFormSelfe.$refs[`${this.formData.formType}`].resetFields();
      }
    },
    handleClose2() {
      this.innerVisible = false;
      this.$nextTick(this.handleClose1);
    },

    /**
     * @description: form 中model发生改变会被触发
     */
    modelChange(val) {
      // console.log('表单的值改变了111111111111111111111111111111111111111111', val)
      this.dyResults = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.module {
  .content {
    .finish-top {
      width: 400px;
      margin: 0 auto;
    }
    &-item {
    }
    &-title {
      font-size: 17px;
      font-weight: 700;
      color: rgba($color: #000000, $alpha: 0.7);
    }
    &-box {
    }
    .customView {
      margin-top: 20px;
    }
  }
}
.title {
  font-size: 20px;
  font-weight: 900;
  padding-bottom: 20px;
  border-bottom: 1px solid #c6c6c6;
  color: #000;
}
.column {
  margin-top: 20px;
  &-title {
    width: 100%;
    line-height: 36px;
    text-align: center;

    font-size: 18px;
    font-weight: 600;
    background-color: #e9e9e9;
    border-right: 2px solid #fff;
  }
  &-item {
    width: 100%;
    line-height: 44px;
    text-align: center;
    background-color: #f7f7f7;
    font-size: 16px;
    border-top: 2px solid #fff;
    border-right: 2px solid #fff;
  }
}
</style>
