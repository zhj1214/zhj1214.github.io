<template>
  <div class="module">
    <!-- 筛选项 -->
    <SpSearchpannel
      :loading="pageData.loading"
      :searchData="searchData"
      :isResetDefaultData="true"
      @search="searchFn"
    ></SpSearchpannel>
    <!-- 表格 -->
    <SpTable
      class="table"
      :data="pageData.tableData"
      :columns="pageData.columns"
      :paginationSeting="pageData.paginationSeting"
      style="width: 100%"
      max-height="450"
      stripe
      @done="(val:any) => (pageData.tableInstance = val)"
    >
      <!-- 状态 -->
      <template v-slot:status="scope">
        <div>
          {{
            scope.row.status === 1
              ? "已上架"
              : scope.row.status === 2
              ? "未上架"
              : "-"
          }}
        </div>
      </template>
      <!-- 时间 -->
      <template v-slot:time="scope">
        <div>
          <!-- {{scope.row.data.time}} -->
          {{ tool.getTimeFormat(scope.row.data.time, "YYYY-MM-DD HH:mm:ss") }}
        </div>
      </template>
      <!-- 描述 -->
      <template v-slot:desc="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="scope.row.data.message"
          placement="top-start"
        >
          <div class="ellipsis">
            {{ scope.row.data.message }}
          </div>
        </el-tooltip>
      </template>
      <!-- 栈信息 -->
      <template v-slot:stack="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="scope.row.data.stack"
          placement="top-start"
        >
          <div class="ellipsis">
            {{ scope.row.data.stack }}
          </div>
        </el-tooltip>
      </template>
      <!-- 操作自定义渲染 -->
      <template v-slot:operation="scope">
        <div class="operation">
          <span class="operation-btn" @click="jumpPage(scope.row, 'detail')">
            查看详情
          </span>
          <span class="operation-btn" @click="deleteRow(scope.row)">
            删除
          </span>
        </div>
      </template>
    </SpTable>
  </div>
</template>

<script setup lang="ts" name="logAnalysis">
import SpTable from "@/components/sp-table/sp-table.vue";
import SpSearchpannel from "@/components/searchpannel/index.vue";
import { ref, reactive, computed, onMounted, onBeforeMount } from "vue";
import tool from "@/utils/tool";
import { getErrorsList } from "@/apis/errors";
import { app } from "@/mixin";

const self = app();
/****** 筛选 ******/
const searchFn = (val: any) => {
  val && (pageData.searchForm = { ...pageData.searchForm, ...val });

  // 2. 判断搜索条件是否为空
  let isflg = true;
  Object.values(pageData.searchForm).forEach((e) => {
    if (!tool.isEmpty(e)) {
      isflg = false;
    }
  });
  if (!isflg && pageData.pageNo > 1) {
    pageData.pageNo = 1;
  }
  // 3. 请求数据
  getList();
};
const searchData = computed(() => {
  return [
    {
      label: "权益编码",
      name: "rightsCode",
      type: "input",
    },
    {
      label: "权益名称",
      name: "rightsName",
      type: "input",
    },
    {
      label: "权益状态",
      name: "status",
      data: [],
      type: "select",
    },
  ];
});
/****** 表格 ******/
const getList = () => {
  const params = {
    ...pageData.searchForm,
    pageNo: pageData.pageNo || 0,
    pageSize: pageData.pageSize || 10,
  };
  pageData.loading = true;
  getErrorsList(params)
    .then((res: any) => {
      console.log("res--", res);
      pageData.tableData = res.data.map((item: any) => {
        return item;
      });
      pageData.paginationSeting.pageTotal = res.total || 100;
      pageData.loading = false;
    })
    .catch((err) => {
      pageData.loading = false;
      throw err;
    });
};
// 分页事件
const sizeChange = (val: any) => {
  console.log("分页大小", val);
  pageData.pageSize = val;
  getList();
};
const currentChange = (val: any) => {
  pageData.pageNo = val;
  getList();
  console.log("跳转页码", val);
};
/****** 页面属性 ******/
const pageData = reactive({
  loading: false,
  searchForm: {},
  tableData: [],
  paginationSeting: {
    pageTotal: 0,
    sizeChange: sizeChange,
    currentChange: currentChange,
  },
  columns: [
    {
      fixed: true,
      prop: "_id",
      label: "错误ID",
      align: "center",
      width: "160px",
    },
    {
      prop: "data.name",
      label: "错误名称",
      align: "center",
      width: "110px",
    },
    {
      prop: "rightsTypeName",
      label: "类型",
      align: "center",
      width: "110px",
    },
    {
      prop: "data.level",
      label: "级别",
      align: "center",
      width: "80px",
    },
    {
      scopedSlot: "desc",
      prop: "data.message",
      label: "描述",
      align: "center",
      width: "180px",
    },
    {
      scopedSlot: "stack",
      prop: "data.stack",
      label: "栈信息",
      align: "center",
      width: "180px",
    },
    {
      scopedSlot: "time",
      prop: "data.time",
      label: "上报时间",
      align: "center",
      width: "180px",
    },
    {
      prop: "pv",
      label: "报警次数",
      align: "center",
      width: "100px",
    },
    {
      prop: "tag",
      label: "标签",
      align: "center",
      width: "80px",
    },
    {
      scopedSlot: "status",
      label: "状态",
      align: "center",
      width: "70px",
    },
    {
      scopedSlot: "operation",
      fixed: "right",
      label: "操作",
      align: "center",
      width: "250px",
    },
  ],
  tableInstance: null,
  pageNo: 1,
  pageSize: 10,
});
/******  生命周期 ******/
onBeforeMount(() => {
  getList();
  console.log("tool--", tool);
});
// 页面跳转
const jumpPage = (val: any, type: string) => {
  if (type === "edit") {
    self.$router.push({
      path: "/news/ecologyrights/add",
      query: {
        id: val.id,
        type: "edit",
      },
    });
  } else {
    self.$router.push({
      path: "/news/ecologyrights/add",
      query: {
        id: val.id,
        type: "detail",
      },
    });
  }
};
// 删除权益
const deleteRow = (val: any) => {
  self
    .$confirm("确认删除该权益?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    .then(() => {
      self.$message({
        type: "success",
        message: "删除成功!",
      });
      // self.$api.rights.deleteRights(val.id).then((res: any) => {
      //   if (res) {
      //     self.$message({
      //       type: "success",
      //       message: "删除成功!",
      //     });
      //     getList();
      //   }
      // });
    });
};
</script>

<style lang="scss" scoped>
.ellipsis {
  @include multi-line-omit(2);
}
</style>
