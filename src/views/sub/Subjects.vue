<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px">新增</el-button>

    <el-dialog title="会计科目" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="科目名称">
          <el-input v-model="form.subName" :clearable="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级科目">
          <el-select v-model="form.parentId" placeholder="请选择">
            <el-option
                v-for="item in sublist"
                :key="item.id"
                :label="item.subName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借贷方向">
          <el-radio v-model="form.direction" label="0">借</el-radio>
          <el-radio v-model="form.direction" label="1">贷</el-radio>
        </el-form-item>
        <el-form-item label="是否停用">
          <el-radio v-model="form.isEnable" label="0">否</el-radio>
          <el-radio v-model="form.isEnable" label="1">是</el-radio>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="saveSub(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>

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
import {getOne, getSubList, pageSub, saveSubject} from "@/api/subApi";
import Page from "@/components/Page";

export default {
  components: {Page},
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
    this.page(this.currentPage, this.size)
  },
  methods: {
    editRow(id) {
      console.log(id)
      getOne(id).then((response) => {
        this.form = response.data.data.subject
      })
      this.dialogFormVisible = true
    },
    list() {
      getSubList().then((response) => {
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.sublist = response.data.data.subject
      })
    },
    page(current, size) {
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
    saveSub(param) {
      saveSubject(param).then((response) => {
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
      })
      this.dialogFormVisible = false
      this.form = ''
      location.reload()
    },
    isEnable(row) {
      return row.isEnable == 0 ? '否' : '是'
    },
    direction(row) {
      return row.direction == 0 ? '借' : '贷'
    },
    reload() {
      location.reload()
    },
    cancel() {
      this.dialogFormVisible = false
      this.form = ''
    }
  }
}
</script>
