<template>
  <el-dialog title="账号管理" :model-value="dialogFormVisible" width="25%" center :before-close="cancel">
    <el-form :model="form">
      <el-form-item label="账号名称">
        <el-input v-model="form.userName" :clearable="true" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="账号密码">
        <el-input v-model="form.password" :clearable="true" show-password autocomplete="off" :minlength="6"></el-input>
      </el-form-item>
      <el-form-item>
        <el-switch
            v-model="form.isEnable"
            active-text="启用"
            active-color="#13ce66"
            :active-value="1"
            inactive-text="禁用"
            inactive-color="#ff4949"
            :inactive-value="2"
            change="">
        </el-switch>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="editUser(form)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

import {register, getOne, editUser} from "../../api/userApi";

export default {
  props: ['dialogFormVisible', 'id'],
  data() {
    return {
      form: {
        userName: '',
        password: '',
        isEnable: 1
      }
    };
  },
  watch: {
    // 当监听到id 发生变化就获取数据
    id: function (id) {
      this.getOneUser(id)
    }
  },
  methods: {
    editUser(param) {
      if (param.id == undefined) {
        register(param).then((response) => {
          if (response.data.code != 200) {
            this.$message.error(response.data.msg);
            return
          }
          this.$message.success("新增成功")
        })
      } else {
        editUser(param).then((response) => {
          if (response.data.code != 200) {
            this.$message.error(response.data.msg);
            return
          }
          this.$message.success("修改成功")
        })
      }
      // location.reload()
      // 父级传递
      this.$emit('closeDialog')

    },
    getOneUser(id) {
      getOne(id).then((response) => {
        this.form = response.data.data.user
      })
    },
    // 取消按钮
    cancel() {
      this.form.userName = ''
      this.form.password = ''
      this.$emit('closeDialog')
    },
  }
};
</script>

