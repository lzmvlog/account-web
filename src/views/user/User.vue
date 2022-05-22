<template>
  <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px">新增</el-button>
  <AddUser :dialogFormVisible="dialogFormVisible" @closeDialog="closeDialog" :id="this.tableData.id"/>
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
          label="是否启用">
        <template v-slot="scope">
          <el-switch
              v-model="scope.row.isEnable"
              active-text="启用"
              active-color="#13ce66"
              :active-value="1"
              inactive-text="禁用"
              inactive-color="#ff4949"
              :inactive-value="2"
              @change="disable(scope.row.id)">
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
import {getUserPage, disable} from "../../api/userApi";
import AddUser from "./AddUser";

export default {
  components: {AddUser},
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      data: [],
      meg: false,
      total: 100,
      pageSize: 1,
      size: 10,
    }
  },
  created() {
    this.getPage(this.pageSize, this.size)
  },
  methods: {
    getPage(current, size) {
      getUserPage(current, size).then((response) => {
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.tableData = response.data.data.page.dataList
        this.total = response.data.data.page.count
        this.pageSize = response.data.data.page.size
      })
    },
    disable(id) {
      disable(id).then((response) => {
        if (response.data.code != 200) {
          this.$message.error(response.data.msg);
          return
        }
        this.$message.success("操作成功")
      })
    },
    // 编辑行
    editRow(id) {
      this.tableData.id = id
      this.dialogFormVisible = true
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

