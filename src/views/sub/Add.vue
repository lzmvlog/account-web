<template>
  <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px">新增</el-button>

  <el-dialog title="会计科目" v-model="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="科目名称">
        <el-input v-model="form.subName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级科目">
        <el-select v-model="form.parentId" placeholder="请选择">
          <el-option
              v-for="item in sublist"
              :key="item.id"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="借贷方向" >
          <el-radio v-model="form.direction" label="0">借</el-radio>
          <el-radio v-model="form.direction" label="1">贷</el-radio>
      </el-form-item>
      <el-form-item label="是否停用" >
        <el-radio v-model="form.isEnable" label="0">否</el-radio>
        <el-radio v-model="form.isEnable" label="1">是</el-radio>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        subName:'',
        isEnable:'0',
        direction:'1',
      },
    };
  }
};
</script>

