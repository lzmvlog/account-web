<template>
  <el-dialog title="账单" :model-value="dialogFormVisible" width="28%" center :before-close="cancel">
    <el-form :model="form">
      <el-form-item label="科目">
        <el-select v-model="form.subId" placeholder="请选择">
          <el-option
              v-for="item in sublist"
              :key="item.id"
              :label="item.subName"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="金额">
        <el-input v-model="form.amount" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
            v-model="form.createDate"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="saveBill(form)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {saveBill} from "../../api/billApi";
import {getOne} from "../../api/billApi";
import {getSubList} from "../../api/subApi";
import {updateBill} from "../../api/billApi";

export default {
  props: ['dialogFormVisible', 'id'],
  data() {
    return {
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
  created() {
    this.openSave()
  },
  watch: {
    // 当监听到id 发生变化就获取数据
    id: function (id) {
      this.getOneBill(id)
    }
  },
  methods: {
    // 保存账单
    saveBill(param) {
      if (param.id == undefined) {
        saveBill(param).then(response => {
          if (response.data.code != 200) {
            this.$message.error(response.data.msg);
            return
          }
          this.$message.success("新增成功")
        })
      } else {
        updateBill(param).then(response => {
          if (response.data.code != 200) {
            this.$message.error(response.data.msg);
            return
          }
          this.$message.success("修改成功")
        })
      }
      this.$parent.reload()
    },
    openSave() {
      getSubList().then((response) => {
        if (response.data.code == 500) {
          this.$message.error(response.data.msg);
        }
        this.sublist = response.data.data.subject
      })
    },
    getOneBill(id) {
      getOne(id).then((response) => {
        this.form = response.data.data.bill
      })
    },
    // 取消按钮
    cancel() {
      this.form.subId = ''
      this.form.amount = ''
      this.form.remark = ''
      this.$emit('closeDialog')
    },
  }
}
</script>
