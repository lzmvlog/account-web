<template>
  <div class="page">
    <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    // 总条数
    total: {
      type: Number,
      default: 2
    },
    // 每页显示的条数
    pageSize: {
      type: Number,
      default: 10
    }
  }
}
</script>

<style>
.page {
  text-align: center;
  margin: 20px;
}
</style>