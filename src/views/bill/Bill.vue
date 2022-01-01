<template>
  <Add/>
  <div class="subject">
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="89vh">
      <el-table-column
          fixed
          prop="id"
          label="排序">
      </el-table-column>
      <el-table-column
          prop="subName"
          label="支出名称">
      </el-table-column>
      <el-table-column
          prop="direction"
          label="收入/支出"
          :formatter="direction">
      </el-table-column>
      <el-table-column
          prop="amount"
          label="金额"
          :formatter="amount">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="创建时间"
          :formatter="createDate" >
      </el-table-column>
      <el-table-column
          prop="remark"
          label="备注" >
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template v-slot="scope">
          <el-button
              @click="editRow(scope.$index,tableData)"
              type="text"
              size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getBillList} from "../../api/billApi";
import Add from "./Add";

export default {
  components: {
    Add
  },
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    this.list()
  },
  methods: {
    list() {
      getBillList().then(res => {
        if (res.code == 500) {
          this.$message.error(res.data.msg);
        }
        this.tableData = res.data.data.bill
      })
    },
    direction(row) {
      return row.direction == 0 ? '借' : '贷'
    },
  },
  // filters: {
  //   formateDate(time) {
  //     let date = new Date(time)
  //     return formateDate(date, 'YYYY-MM-dd hh:mm')
  //   }
  // }
}
</script>
