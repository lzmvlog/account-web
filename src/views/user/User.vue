<template>
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
          prop="userName"
          label="用户名称">
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
        layout="size, prev, pager, next"
        :page-size="size"
        :current-page="currentPage"
        @current-change="getPage"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {getUserPage} from "../../api/userApi";

export default {
  data() {
    return {
      tableData: [],
      data: [],
      meg: false,
      total: 100,
      currentPage: 1,
      size: 10,
    }
  },
  created() {
    this.getUserPages(this.currentPage, this.size)
  },
  methods: {
    getUserPages(current, size){
      getUserPage(current, size).then((response)=>{
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.tableData = response.data.data.page.dataList
        this.total = response.data.data.page.count
      })
    },
    getPage(page) {
      this.tableData = []
      this.currentPage = page
      this.page(this.currentPage, this.size)
    },
    isEnable(row) {
      return row.isEnable == 0 ? '否' : '是'
    },
  },

}
</script>

