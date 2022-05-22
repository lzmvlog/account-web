<template>
  <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px" plain> 新增</el-button>
  <AddBill :dialogFormVisible="dialogFormVisible" :id="this.tableData.id"
           @closeDialog="closeDialog"/>
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
          label="支出名称">
      </el-table-column>
      <el-table-column
          prop="direction"
          label="收入/支出"
          :formatter="direction">
      </el-table-column>
      <el-table-column
          prop="amount"
          label="金额(RMB)">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="创建时间">
      </el-table-column>
      <el-table-column
          prop="remark"
          label="备注">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template v-slot="scope">
          <el-button
              @click="editRow(scope.row.id)"
              type="button"
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
        layout=" prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :page-sizes="size"
        @prev-click="prev"
        @next-click="next"
        @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import {pageBill} from "../../api/billApi";
import AddBill from "./AddBill";

export default {
  components: {
    AddBill,
  },
  data() {
    return {
      tableData: [],
      total: 10,
      pageSize: 1,
      size: 10,
      dialogFormVisible: false,
    }
  },
  created() {
    this.getPage(this.pageSize, this.size)
  },
  methods: {
    // 编辑行
    editRow(id) {
      this.tableData.id = id
      this.dialogFormVisible = true
    },
    getPage(current, size) {
      pageBill(current, size).then(response => {
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.tableData = response.data.data.page.dataList
        this.total = response.data.data.page.count
        this.pageSize = response.data.data.page.size
      })
    },
    direction(row) {
      return row.direction == 1 ? '收入' : '支出'
    },
    reload() {
      location.reload()
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogFormVisible = false
    },
    prev(pageSize) {
      this.getPage(pageSize, this.size)
    },
    next(pageSize) {
      this.getPage(pageSize , this.size)
    },
    currentChange(pageSize){
      this.getPage(pageSize , this.size)
    }
  },
}
</script>
