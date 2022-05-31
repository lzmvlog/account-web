<template>

  <div style="display: flex;justify-content: left;margin-bottom: 10px;text-align: center">
    <sapn style="width: 80px;margin-top: 5px">科目名称</sapn>
    <el-input placeholder="科目名称" v-model="subName" class="input-width"></el-input>

    <el-button type="info" style="margin-left: 10px" @click="getPage(1,10)">搜索</el-button>
  </div>
  <el-button type="primary" @click="this.dialogFormVisible = true" style="margin-bottom: 10px" plain> 新增</el-button>

  <AddSubject :sublist="sublist" :dialogFormVisible="dialogFormVisible" :id="this.tableData.id"
              @closeDialog="closeDialog"/>
  <div class="subject">
    <el-table
        :data="tableData"
        border
        style="width: 100%;"
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
        :page-size="size"
        :current-page="pageSize"
        @prev-click="prev"
        @next-click="next"
        @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import {disable, getSubList, pageSub} from "../../api/subApi";
import AddSubject from "@/views/sub/AddSubject";

export default {
  components: {AddSubject},
  data() {
    return {
      tableData: [],
      data: [],
      meg: false,
      total: 100,
      pageSize: 1,
      size: 10,
      dialogFormVisible: false,
      sublist: '',
      subName: '',
    }
  },
  // 生命周期函数
  created() {
    this.list()
    this.getPage(this.pageSize, this.size)
  },
  methods: {
    // 编辑行
    editRow(id) {
      this.tableData.id = id
      this.dialogFormVisible = true
    },
    // 获取列表
    list() {
      getSubList().then((response) => {
        if (response.data.code != 200) {
          this.$message.error(response.data.msg);
        }
        this.sublist = response.data.data.subject
      })
    },
    // 分页插叙
    getPage(current, size) {
      pageSub(current, size, this.subName).then((response) => {
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.tableData = response.data.data.records
        this.total = response.data.data.total
        this.pageSize = response.data.data.current
        this.size = response.data.data.size
      })
    },
    direction(row) {
      return row.direction == 1 ? '借' : '贷'
    },
    // 重新加载当前页面
    reload() {
      location.reload()
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogFormVisible = false
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
    prev(pageSize) {
      this.getPage(pageSize, this.size)
    },
    next(pageSize) {
      this.getPage(pageSize, this.size)
    },
    currentChange(pageSize) {
      this.getPage(pageSize, this.size)
    }
  }
}
</script>
<style>
.input-width {
  width: 200px;
}
</style>
