<template>
  <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px">新增</el-button>
  <AddSubject :sublist="sublist" :dialogFormVisible="dialogFormVisible" :id="this.form.id"
              @changeDialog="changeDialog"/>
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
          label="是否启用">
        <template v-slot="scope">
          <el-switch
              v-model="scope.row.isEnable"
              active-text="启用"
              active-color="#13ce66"
              :active-value="0"
              inactive-text="禁用"
              inactive-color="#ff4949"
              :inactive-value="1">
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
import {getSubList, pageSub} from "@/api/subApi";
import Page from "@/components/Page";
import AddSubject from "@/views/sub/AddSubject";

export default {
  components: {Page, AddSubject},
  data() {
    return {
      tableData: [],
      data: [],
      meg: false,
      total: 100,
      currentPage: 1,
      size: 10,
      dialogFormVisible: false,
      form: {
        id: '',
        subName: '',
        isEnable: 0,
        direction: 1,
        parentId: ''
      },
      sublist: '',
    }
  },
  // 生命周期函数
  created() {
    this.list()
    this.getpage(this.currentPage, this.size)
  },
  methods: {
    // 编辑行
    editRow(id) {
      this.form.id = id
      this.dialogFormVisible = true
    },
    // 获取列表
    list() {
      getSubList().then((response) => {
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.sublist = response.data.data.subject
      })
    },
    // 分页插叙
    getpage(current, size) {
      pageSub(current, size).then((response) => {
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
    // 重新加载当前页面
    reload() {
      location.reload()
    },
    // 关闭弹窗
    changeDialog() {
      this.dialogFormVisible = false
    }
  }
}
</script>
