<template>
  <Add/>
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
          label="金额">
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
              @click="editRow(scope.$index,tableData)"
              type="text"
              size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Page :total="total" :page-size="currentPage"/>
</template>

<script>
import {pageBill} from "@/api/billApi";
import Page from "@/components/Page";

export default {
  components: {
    Page
  },
  data() {
    return {
      tableData: [],
      total: 100,
      currentPage: 1,
      size: 10,
    }
  },
  created() {
    this.page(this.currentPage, this.size)
  },
  methods: {
    page(current, size) {
      pageBill(current, size).then(response => {
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.tableData = response.data.data.page.dataList
        this.total = response.data.data.page.count
        this.currentPage = response.data.data.page.size
      })
    },
    getPage(page) {
      this.tableData = []
      this.currentPage = page
      this.page(this.currentPage, this.size)
    },
    direction(row) {
      return row.direction == 0 ? '借' : '贷'
    },
    reload() {
      location.reload()
    },
  },
}
</script>

<style>
.page {
  text-align: center;
  margin-top: 10px;
}
</style>
