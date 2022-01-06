<template>
  <el-container>
    <div>
      <el-main>
        <el-form :model="form" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账户">
            <el-input type="text" v-model="form.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(form)">提交</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import {login} from "../../api/loginApi";

export default {
  data() {
    return {
      form: {
        userName: '',
        password: '',
      },
    }
  },
  methods: {
    submitForm(data) {
      login(data).then(response => {
        if (response.data.code == 200) {
          localStorage.setItem("token", response.data.data.token)
          this.$message.success(response.data.msg);
          this.$router.push('/home')
        }
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
      })
    },
  }
}
</script>
