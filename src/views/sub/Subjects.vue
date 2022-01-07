<template>
  <Add
      v-bind:sublist="data"
  />
  <div class="subject">
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="89vh">
      <el-table-column
          fixed
          prop="id"
          label="排序">
      </el-table-column>
      <el-table-column
          prop="subName"
          label="科目名称">
      </el-table-column>
      <el-table-column
          prop="direction"
          label="借贷方向"
          :formatter="direction">
      </el-table-column>
      <el-table-column
          prop="isEnable"
          label="是否启用"
          :formatter="isEnable">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template v-slot="scope">
          <el-button
              @click="editRow(scope.$index,tableData)"
              type="text"
              size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <el-pagination
        background
        layout="prev, pager, next"
        :current-change="getPage"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {getSubList, pageSub} from "../../api/subApi";
import Add from "./Add";

export default {
  components: {
    Add
  },
  data() {
    return {
      tableData: [],
      data:[],
      meg: false,
      total: 100,
      current: 1,
      size: 10,
    }
  },
  created() {
    this.list()
    this.getPage(this.current, this.size)
  },
  methods: {
    editRow(index, rows) {
      rows.splice(index, 1);
      console.log(index)
    },
    list() {
      getSubList().then((response) => {
        if (response.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.data = response.data.data.subject
      })
    },
    getPage(current, size) {
      pageSub(current, size).then((response) => {
        if (response.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.tableData = response.data.data.page.dataList
        this.total = response.data.data.page.count
      })
    },
    isEnable(row) {
      return row.isEnable == 0 ? '否' : '是'
    },
    direction(row) {
      return row.direction == 0 ? '借' : '贷'
    },
    reload() {
      location.reload()
    }
  }
}
</script>


<style>
.page {
  text-align: center;
  margin-top: 10px;
}
</style>
