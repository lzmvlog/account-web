<template>
  <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px">新增</el-button>

  <el-dialog title="会计科目" v-model="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="科目名称">
        <el-input v-model="form.subName" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="消费金额">
        <el-input v-model="form.amount" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备 注">
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
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        subName: '',
        ammount: '',
        remark: ''
      },
    };
  },
}
</script>
