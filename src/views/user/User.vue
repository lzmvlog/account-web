<template>
  <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px">新增</el-button>
  <AddUser :dialogFormVisible="dialogFormVisible"/>
  <div>
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
          prop="createDate"
          label="创建时间">
      </el-table-column>
      <el-table-column
          label="是否启用" >
        <template v-slot="scope">
          <el-switch
              v-model="scope.row.isEnable"
              active-text="启用"
              active-color="#13ce66"
              :active-value="0"
              inactive-text="禁用"
              inactive-color="#ff4949"
              :inactive-value="1"
              @change="updateEnable(scope.row.id)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template v-slot="scope">
          <el-button
              @click="editRow(scope.row.id)"
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
import {getUserPage} from "@/api/userApi";
import Page from "@/components/Page";
import AddUser from "./AddUser";

export default {
  components: {Page, AddUser},
  data() {
    return {
      dialogFormVisible: false,
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
    getUserPages(current, size) {
      getUserPage(current, size).then((response) => {
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
    updateEnable(id){
      console.log(id)
      console.log(this.tableData.isEnable)
    }
  },

}
</script>

