<template>
  <el-button type="primary" @click="openSave" style="margin-bottom: 10px">新增</el-button>

  <el-dialog title="账单" v-model="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="科目名称">
        <el-select v-model="form.subName" placeholder="请选择" @change="saveSub">
          <el-option
              v-for="item in sublist"
              :key="item.id"
              :label="item.subName"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消费金额">
        <el-input v-model="form.amount" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="账单备注">
        <el-input v-model="form.remark" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveBill(form)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {saveBill} from "../../api/billApi";
import {getSubList} from "../../api/subApi";

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        subId: '',
        subName: '',
        direction: '',
        amount: '',
        remark: '',
        createDate: '',
      },
      sublist: [],
    };
  },
  methods: {
    // 保存账单
    saveBill(param) {
      this.form.createDate = new Date()
      console.log(param)
      saveBill(param).then(response => {
        if (response.data.code == 200) {
          this.$message.success(response.data.msg);
        }
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
      })
      this.dialogFormVisible = false
      this.$parent.reload()
    },
    openSave() {
      this.dialogFormVisible = true
      getSubList().then((response) => {
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.sublist = response.data.data.subject
      })
    },
    // 选择账单类型时构建账单信息
    saveSub(param) {
      this.form.subId = param.id
      this.form.subName = param.subName
      this.form.direction = param.direction
    }
  }
}
</script>
