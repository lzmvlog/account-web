<template>
  <el-dialog title="账号管理" :model-value="dialogFormVisible" width="15%">
    <el-form :model="form">
      <el-form-item label="账号名称">
        <el-input v-model="form.userName" :clearable="true" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="账号密码">
        <el-input v-model="form.password" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item >
        <el-switch
            v-model="form.isEnable"
            active-text="启用"
            active-color="#13ce66"
            :active-value="0"
            inactive-text="禁用"
            inactive-color="#ff4949"
            :inactive-value="1"
            change="">
        </el-switch>
      </el-form-item>
    </el-form>
    <div>
      <el-button >取 消</el-button>
      <el-button type="primary" @click="editSub(form)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

import {saveSubject} from "@/api/subApi";

export default {
  props: ['dialogFormVisible'],
  data() {
    return {
      form: {
        userName: '',
        password: '',
        isEnable: 0
      }
    };
  },
  methods: {
    editUser(param) {
      console.log(param)
      saveSubject(param).then((response) => {
        console.log(response)
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
      })
      // this.$parent.reload()
      this.form = ''
    }
  }
};
</script>

