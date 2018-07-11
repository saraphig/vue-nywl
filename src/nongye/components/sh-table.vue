<template>
  <div class="sh-table-box">
    <div class="sh-minwidth-box">
      <div>
        <table class="sh-table">
          <colgroup>
            <col v-for="col in columns"
              width="col.width" />
          </colgroup>
          <slot name="columns">
            <tr class="sh-table-header">
              <th v-for="cloumn in columns">
                <div class="sh-table-cell">{{cloumn.title}}</div>
              </th>
              <th v-if="operate">
                <div class="sh-table-cell ">操作</div>
              </th>

            </tr>
            <tr class="sh-table-row"
              v-for="(row,index) in data.data">
              <td v-for="col in columns"
                @click="clickCell(col.field,row,$event)">
                <!-- ,{'sh-table-cell-left':col.align=='left'} -->
                <div :class="['sh-table-cell']"
                  :title="renderCell(col,row,index)&&renderCell(col,row,index).length>20&&!/<[^>]+>/g.test(renderCell(col,row,index))?renderCell(col,row,index):''"
                  v-html="renderCell(col,row,index)"></div>
              </td>
              <td v-if="operate">
                <div class="sh-table-cell sh-table-edit">
                  <slot name="operate"
                    :row="row"></slot>
                </div>
              </td>
            </tr>
          </slot>
        </table>
      </div>
      <div class="sh-table-empty"
        v-show="!showPagination">暂无数据</div>
    </div>
    <div class="sh-table-pagination"
      v-show="showPagination">
      <sh-pagination :page-index="data.pageNo"
        :total="data.total"
        :page-size="data.pageSize"
        @change="pageChange"></sh-pagination>
    </div>
  </div>

</template>

<script>
import ShPagination from "./sh-pagination";
export default {
  name: "ShTable",
  componentName: "ShTable",
  components: { ShPagination },
  created() {
    if (this.rowNumber === true) {
      this.columns.unshift({
        field: "__rowNumber",
        title: "序号",
        width: 1,
        align: "center"
      });
    }
  },
  props: {
    rowNumber: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Object,
      default() {
        return {
          data: [],
          pageNo: 1,
          pageSize: 10,
          pageTotal: 0,
          total: 0
        };
      }
    },
    operate: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    renderCell(col, row, index) {
      if (col.field === "__rowNumber") {
        return (this.data.pageNo - 1) * this.data.pageSize + index + 1;
      }
      if (col.formatter) {
        return col.formatter(row, col);
      }
      return row[col.field] || "";
    },
    pageChange(index, pageSize) {
      this.$emit("pageChange", index, pageSize);
    },
    clickCell(field, row, event) {
      this.$emit("click-cell", field, row, event);
    }
  },
  computed: {
    showPagination() {
      if (
        !this.data.data ||
        this.data.data == null ||
        this.data.data == undefined
      ) {
        return false;
      }
      return this.data.data.length > 0;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.sh-minwidth-box {
  overflow: auto;
}

.sh-table-box {
  overflow: hidden;
  margin: 0;
  border: 0;
}

.sh-table {
  min-width: 100%;
  border: none;
  border-collapse: collapse;
}

.sh-table, .sh-table td, .sh-table th {
  border-collapse: collapse;
  border: none;
  padding: 0;
  margin: 0;
}

.sh-table-header {
  background-color: #f1f7fa;
}

.sh-table th .sh-table-cell {
  text-align: center;
  padding: 15px 0;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  color: #666666;
  font-weight: bold;
  min-width: 100px;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sh-table-row:hover {
  background-color: #fafcfd;
}

.sh-table-row > td {
  border-bottom: 1px solid #d1d7db;
  line-height: 100%;
}

.sh-table td .sh-table-cell {
  text-align: center;
  font-size: 14px;
  color: #444444;
  padding: 16px 3px;
  min-width: 100px;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sh-table td .sh-table-edit {
  overflow: visible;
}

.sh-table td .sh-table-cell-left {
  text-align: left;
}

.sh-table td .sh-table-cell i {
  font-size: 20px;
  color: #444444;
  cursor: pointer;
}

.sh-table td .sh-table-cell i:hover {
  color: #41a259;
}

.sh-table-pagination {
  padding-top: 30px;
}

.sh-table-empty {
  height: 450px;
  line-height: 450px;
  font-size: 24px;
  color: #888;
  text-align: center;
}
</style>