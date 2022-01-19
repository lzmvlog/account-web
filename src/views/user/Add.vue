<template>
  <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px">新增</el-button>

  <el-dialog title="新增账号" v-model="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="账号名称">
        <el-input v-model="form.userName" :clearable="true" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="账号密码">
        <el-input v-model="form.password" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveSub(form)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

import {saveSubject} from "../../api/subApi";

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        subName: '',
        isEnable: '0',
        direction: '1',
        parentId: ''
      },
    };
  },
  methods: {
    saveSub(param) {
      console.log(param)
      saveSubject(param).then((response) => {
        console.log(response)
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
      })
      this.dialogFormVisible = false
      this.$parent.reload()
      this.form = ''
    }
  }
};
</script>

