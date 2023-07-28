<template>
  <div>
    <!-- 表格 -->
    <el-table v-bind="$attrs" row-key="id" ref="refTable">
      <template v-for="(col, index) in columns">
        <el-table-column v-if="!col.scopedSlot" v-bind="col" :key="index">
        </el-table-column>
        <el-table-column v-else :key="col.prop" v-bind="col">
          <template #header="scope">
            <slot
              v-if="col.isSlotHeader"
              :name="`${col.scopedSlot}Header`"
              v-bind="{ col: col, column: scope.column }"
            >
            </slot>
            <div v-else>{{ scope.column.label }}</div>
          </template>
          <template #default="scope">
            <slot :name="col.scopedSlot" v-bind="{ col: col, row: scope.row }">
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页组件: 外层样式解决低版本浏览器样式问题 -->
    <el-row style="text-align: right; padding-top: 24px">
      <el-pagination
        v-if="paginationSeting && paginationSeting.pageTotal"
        v-bind="paginationOptions"
        class="pagination"
        :class="paginationSeting.class"
        :style="paginationSeting.style"
        :total="paginationSeting.pageTotal"
        :current-page="paginationOptions.currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="paginationOptions.prevClick"
        @next-click="paginationOptions.nextClick"
      >
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "spTable",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    paginationSeting: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // 分页组件默认属性设置
      paginationOptions: {
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        background: true,
        pageSizes: [10, 20, 50, 100],
        layout: "total, sizes, prev, pager, next, jumper",
        prevClick: () => ({}),
        nextClick: () => ({}),
      },
    };
  },
  created() {
    // 0. 合并分页组件参数
    this.paginationOptions = {
      ...this.paginationOptions,
      ...(this.paginationSeting || {}),
    };
  },
  mounted() {
    // 0. 返回表格实例对象
    if (this.$refs.refTable) this.$emit("done", this.$refs.refTable);
  },
  methods: {
    /**
     * @description: 分页组件
     * @author: zhj1214
     */
    handleSizeChange(val) {
      this.pageSize = val;
      this.paginationOptions.sizeChange(val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.paginationOptions.currentChange(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  position: relative;
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
// 总页码在左侧
// ::v-deep {
//   .el-pagination__total {
//     position: absolute !important;
//     left: 0 !important;
//   }
// }
</style>
