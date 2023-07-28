<template>
  <div>
    <!-- 筛选项 -->
    <SpSearchPanel
      :loading="loading"
      :searchData="searchData"
      :isResetDefaultData="true"
      @search="search"
    ></SpSearchPanel>
    <!-- 功能栏 -->
    <el-row style="padding-bottom: 24px">
      <el-button @click="handleClickAdd" type="primary"> 新建权益 </el-button>
    </el-row>
    <!-- 表格 -->
    <SpTable
      class="table"
      :data="tableData"
      :columns="columns"
      :paginationSeting="paginationSeting"
      style="width: 100%"
      stripe
      @done="(val) => (tableInstance = val)"
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
      <!-- 操作自定义渲染 -->
      <template v-slot:operation="scope">
        <div class="operation">
          <span
            v-if="scope.row.status === 2"
            class="operation-btn"
            @click="isGrounding(true, scope.row)"
          >
            上架
          </span>
          <span
            v-else
            class="operation-btn"
            @click="isGrounding(false, scope.row)"
          >
            下架
          </span>
          <span class="operation-btn" @click="jumpPage(scope.row, 'edit')">
            编辑
          </span>
          <span class="operation-btn" @click="jumpPage(scope.row, 'detail')">
            查看详情
          </span>
          <span
            v-if="scope.row.status === 2"
            class="operation-btn"
            @click="deleteRow(scope.row)"
          >
            删除
          </span>
        </div>
      </template>
    </SpTable>
  </div>
</template>

<script>
import SpTable from "../searchpannel/index";
import tool from "@/utils/tool";
import { getSpTableMOck } from "@/apis/cus-component";

export default {
  name: "ecologyCategory",
  components: {
    SpTable,
  },
  props: {
    paramTemp: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // SpSearchPanel 属性
      loading: false,
      searchForm: {},
      ecologyType: [],
      ecologyStatus: [
        {
          text: "已上架",
          value: 1,
        },
        {
          text: "未上架",
          value: 2,
        },
      ],
      rightsTypeId: "",
      // sp-table
      tableInstance: null,
      tableData: [],
      columns: [
        {
          prop: "rightsCode",
          label: "权益编码",
          align: "center",
          width: "160px",
        },
        {
          prop: "rightsName",
          label: "权益名称",
          align: "center",
          width: "110px",
        },
        {
          prop: "rightsTypeName",
          label: "所属权益类型",
          align: "center",
          width: "110px",
        },
        {
          prop: "publishTime",
          label: "发布时间",
          align: "center",
          width: "180px",
        },
        {
          prop: "updateTime",
          label: "更新时间",
          align: "center",
          width: "180px",
        },
        {
          prop: "pv",
          label: "浏览量(PV)",
          align: "center",
          width: "110px",
        },
        {
          prop: "uv",
          label: "浏览量(UV)",
          align: "center",
          width: "110px",
        },
        {
          prop: "shareNum",
          label: "分享量",
          align: "center",
          width: "110px",
        },
        {
          prop: "collectNum",
          label: "收藏量",
          align: "center",
          width: "110px",
        },
        {
          scopedSlot: "status",
          label: "权益状态",
          align: "center",
          width: "110px",
        },
        {
          scopedSlot: "operation",
          fixed: "right",
          label: "操作",
          align: "center",
          width: "250px",
        },
      ],
      paginationSeting: {
        pageTotal: 0,
        sizeChange: this.sizeChange,
        currentChange: this.currentChange,
      },
    };
  },
  computed: {
    searchData() {
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
          label: "所属权益类型",
          name: "rightsTypeId",
          defaultValue: this.rightsTypeId,
          data: this.ecologyType,
          type: "select",
        },
        {
          label: "权益状态",
          name: "status",
          data: this.ecologyStatus,
          type: "select",
        },
      ];
    },
  },
  watch: {
    // 是否有筛选条件
    paramTemp: {
      handler(newVal) {
        if (newVal.id) {
          this.rightsTypeId = newVal.id;
          this.search({ rightsTypeId: newVal.id });
        }
      },
      immediate: true,
    },
  },
  created() {
    // 1. 获取权益类型数据
    this.$api.rights
      .getTypeLists({ pageNo: 0, pageSize: 999, jumpType: 1 })
      .then((res) => {
        this.ecologyType = res.map((item) => {
          item.text = item.rightsTypeName;
          item.value = item.id;
          return item;
        });
      });
    // 2. 没有筛选条件的时候，空参数，获取列表数据
    if (!this.paramTemp.id) {
      this.getList();
    }
  },
  mounted() {
    this.$EventBus.$on("news-ecologyrights-list", () => {
      this.getList();
    });
  },
  methods: {
    // 删除权益
    deleteRow(val) {
      this.$confirm("确认删除该权益?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.rights.deleteRights(val.id).then((res) => {
          if (res) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          }
        });
      });
    },
    jumpPage(val, type) {
      if (type === "edit") {
        this.$router.push({
          path: "/news/ecologyrights/add",
          query: {
            id: val.id,
            type: "edit",
          },
        });
      } else {
        this.$router.push({
          path: "/news/ecologyrights/add",
          query: {
            id: val.id,
            type: "detail",
          },
        });
      }
    },
    // 新增权益
    handleClickAdd() {
      this.$router.push({
        path: "/news/ecologyrights/add",
        query: {
          type: "add",
        },
      });
    },
    // 上、下架
    isGrounding(isTop, val) {
      console.log(isTop, "上加下", val);
      let fn = isTop
        ? this.$api.rights.updateRightsListSale
        : this.$api.rights.updateRightsListOffSale;

      fn({ id: val.id }).then((res) => {
        if (res) {
          this.$message.success("操作成功");
          this.getList();
        }
      });
    },
    // 搜索事件
    search(v) {
      v && (this.searchForm = { ...this.searchForm, ...v });

      // 2. 判断搜索条件是否为空
      let isflg = true;
      Object.values(this.searchForm).forEach((e) => {
        if (!tool.isEmpty(e)) {
          isflg = false;
        }
      });
      if (!isflg && this.pageNo > 1) {
        this.pageNo = 1;
      }
      // 3. 请求数据
      this.getList();
    },
    // 获取列表数据
    getList() {
      const params = {
        ...this.searchForm,
        pageNo: this.pageNo || 0,
        pageSize: this.pageSize || 10,
      };
      this.loading = true;
      getSpTableMOck(params)
        .then((res) => {
          this.tableData = res.data.map((item) => {
            return item;
          });
          this.paginationSeting.pageTotal = res.total || 100;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          throw err;
        });
    },
    // 分页事件
    sizeChange(val) {
      console.log("分页大小", val);
      this.pageSize = val;
      this.getList();
    },
    currentChange(val) {
      this.pageNo = val;
      this.getList();
      console.log("跳转页码", val);
    },
  },
  beforeUnmount() {
    this.$EventBus.$off("news-ecologyrights-list");
  },
};
</script>

<style lang="scss" scoped>
.operation {
  display: flex;
  align-items: center;
  justify-content: center;
  &-btn {
    cursor: pointer;
    color: #248dee;
    margin-right: 8px;
  }
}
</style>
