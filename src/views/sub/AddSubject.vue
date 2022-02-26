<template>
  <el-dialog title="会计科目" :model-value="dialogFormVisible" :show-close=false>
    <el-form :model="form">
      <el-form-item label="科目名称">
        <el-input v-model="form.subName" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级科目">
        <el-select v-model="form.parentId" placeholder="请选择" no-data-text="无数据">
          <el-option
              v-for="item in sublist"
              :key="item.id"
              :label="item.subName"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="借贷方向">
        <el-radio v-model="form.direction" :label="0">借</el-radio>
        <el-radio v-model="form.direction" :label="1">贷</el-radio>
      </el-form-item>
      <el-form-item >
        <el-switch
            v-model="form.isEnable"
            active-text="启用"
            active-color="#13ce66"
            :active-value="0"
            inactive-text="禁用"
            inactive-color="#ff4949"
            :inactive-value="1">
        </el-switch>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="editSub(form)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {getOne, saveSubject} from "@/api/subApi";
import {editSubject} from "@/api/subApi";

export default {
  props: ['sublist', 'dialogFormVisible', 'id'],
  data() {
    return {
      form: {
        subName: '',
        isEnable: 0,
        direction: 1,
        parentId: '',
      },
    };
  },
  watch: {
    // 当监听到id 发生变化就获取数据
    id: function (id) {
      this.getOneSUb(id)
    }
  },
  methods: {
    // 保存
    editSub(param) {
      if (param.id == undefined) {
        saveSubject(param).then((response) => {
          if (response.data.code == 500) {
            this.$message.error(response.data.msg);
          }
          this.$message.success("新增成功")
        })
      } else {
        editSubject(param).then((response) => {
          if (response.data.code == 500) {
            this.$message.error(response.data.msg);
          }
          this.$message.success("修改成功")
        })
      }
      this.$emit('changeDialog')
      location.reload()
    },
    // 编辑
    getOneSUb(id) {
      getOne(id).then((response) => {
        this.form = response.data.data.subject
        if (this.form.parentId == 0) {
          this.form.parentId = null
        }
      })
    },
    // 取消按钮
    cancel() {
      this.form.parentId = null
      this.form.subName = ''
      this.form.isEnable = 0
      this.form.direction = 1
      // 父级传递
      this.$emit('changeDialog')
    },
  }
};
</script>

