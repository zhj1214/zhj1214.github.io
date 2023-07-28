<!--
 * @Description: 筛选条件设置
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-09-15 09:38:01
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-07-28 16:16:21
-->

<template>
  <div class="module">
    <el-button class="operate-btn-border" @click="outerVisible = true"
      >设置筛选</el-button
    >
    <el-dialog
      title="外层 Dialog"
      v-mmodel:visible="outerVisible"
      :before-close="canceFilter"
    >
      <template v-slot:title>
        <div class="title">筛选器管理</div>
      </template>
      <div id="filterdialogid" class="content">
        <el-checkbox-group
          v-model="checkList"
          :min="1"
          text-color="#409EFF"
          fill="#409EFF"
          @change="groupChange"
        >
          <div class="content-item" v-for="(group, i) in filterList" :key="i">
            <div
              class="content-title"
              :style="{ 'margin-top': i === 0 ? '0' : '30px' }"
            >
              {{ group.title }}
            </div>
            <div class="content-box">
              <el-checkbox
                style="margin-top: 30px"
                v-for="item in group.list"
                :key="item.value"
                :value="item.value"
                :label="item.value"
              >
                {{ item.label }}
              </el-checkbox>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      <el-dialog
        width="30%"
        title="提示"
        v-model:visible="innerVisible"
        append-to-body
        >最少选择一个筛选项
        <template v-slot:footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="innerVisible = false"
              >确 定</el-button
            >
          </div>
        </template>
      </el-dialog>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button @click="canceFilter">取 消</el-button>
          <el-button @click="resetFilterData">重 置</el-button>
          <el-button type="primary" @click="commitData">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { filterStaticData } from "../static-data.js";

export default {
  components: {},
  props: {
    filterData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      checkList: [
        "dealerCode",
        "mobile",
        "username",
        "primaryCode",
        "activityCode",
        "carModelCode",
        "collectResult",
      ], // 界面中渲染的结果
      checkListCopy: [
        "dealerCode",
        "mobile",
        "username",
        "primaryCode",
        "activityCode",
        "carModelCode",
        "collectResult",
      ], // 用于取消时回显之前的结果
      filterList: filterStaticData,
      outerVisible: false,
      innerVisible: false,
    };
  },
  watch: {
    /**
     * @description: 初始化配置项
     */
    filterData(newval, oldval) {
      if (newval !== oldval) {
        if (this.filterData && this.filterData.length > 0) {
          console.log(newval, "--filterData--", oldval);
          this.checkList = this.filterData;
          this.checkListCopy = JSON.parse(JSON.stringify(this.filterData));
        } else {
          this.resetFilterData();
        }
      }
    },
  },
  methods: {
    /**
     * @description: 取消
     */
    canceFilter() {
      // 1. 隐藏弹窗
      this.outerVisible = false;
      // 2. 还原值
      this.checkList = JSON.parse(JSON.stringify(this.checkListCopy));
    },
    /**
     * @description: 重置
     */
    resetFilterData() {
      this.checkList = [
        "dealerCode",
        "mobile",
        "username",
        "primaryCode",
        "activityCode",
        "carModelCode",
        "collectResult",
      ];
    },
    /**
     * @description: 确定：保存选择的筛选项
     */
    commitData() {
      // if(this.checkList.length === 0){
      // this.innerVisible = true
      // }
      // 1. 显示loading
      const loading = this.$loading({
        target: "#filterdialogid",
        text: "Loading",
        spinner: "el-icon-loading",
      });
      // 2. 数组去重
      function unique(arr) {
        let arr1 = [];
        for (let i = 0; i < arr.length; i++) {
          if (!arr1.includes(arr[i]) && arr[i]) {
            arr1.push(arr[i]);
          }
        }
        return arr1;
      }
      this.checkList = unique(this.checkList);

      // 2.1 保存筛选设置请求
      this.$api
        .saveFilterInfo({
          conditions: this.checkList,
        })
        .then((res) => {
          loading.close();
          if (res) {
            this.outerVisible = false;
            this.checkListCopy = JSON.parse(JSON.stringify(this.checkList));
            // const arr = this.checkList.map((e) => {
            //   let obj
            //   filterStaticData.forEach((item) => {
            //     if (item.list) {
            //       item.list.forEach((o) => {
            //         if (o.value === e) {
            //           obj = o
            //         }
            //       })
            //     }
            //   })
            //   return obj
            // })
            this.$emit("change", this.checkList);
          }
        })
        .catch(() => {
          loading.close();
        });
    },

    /**
     * @description: 获取选中的结果
     * @param {*} val
     */
    groupChange(val) {
      console.log(this.checkList, "111111", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.operate {
  &-btn-solid {
    background-color: #2f355d;
    color: #fff;
  }
  &-btn-border {
    border-color: #2f355d;
  }
}
.module {
  .title {
    font-size: 20px;
    font-weight: 900;
    padding-bottom: 20px;
    border-bottom: 1px solid #c6c6c6;
    color: #000;
  }
  .content {
    &-item {
    }
    &-title {
      font-size: 17px;
      font-weight: 700;
      color: rgba($color: #000000, $alpha: 0.7);
    }
    &-box {
    }
  }
}
</style>
