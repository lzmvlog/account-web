<template>
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
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveSub(form)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

import {getSubList, saveSubject} from "../../api/api";

export default {
  data() {
    return {
      sublist: [],
      dialogFormVisible: false,
      form: {
        id: 6,
        subName: '',
        isEnable: '0',
        direction: '1',
        parentId: ''
      },
    };
  },
  created() {
    this.list()
  },

  methods: {
    list() {
      getSubList().then((response) => {
        console.log(response.data)
        if (response.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.sublist = response.data.data.subject
      })
    },
    saveSub(param) {
      console.log(param)
      saveSubject(param).then((response)=>{
        console.log(response)
        if (response.code == 500) {
          this.$message.error(response.data.msg);
        }
      })
      this.dialogFormVisible = false
    }
  }
};
</script>

