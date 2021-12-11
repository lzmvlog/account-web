<template>
  <Add/>
  <div class="subject">
    <el-table
        :data="tableData"
        style="width: 100%"
        max-height="89vh">
      <el-table-column
          fixed
          prop="id"
          label="排序"
          width="150">
      </el-table-column>
      <el-table-column
          prop="subName"
          label="科目名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="direction"
          label="借贷方向"
          :formatter="direction"
          width="120">
      </el-table-column>
      <el-table-column
          prop="isEnable"
          label="是否启用"
          :formatter="isEnable"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template v-slot="scope">
          <el-button
              @click="editRow(scope.$index, tableData)"
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
import {getSubList} from "../../api/api";
import Add from "./Add";

export default {
  components: {
    Add
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.list()
  },
  methods: {
    editRow(index, rows) {
      rows.splice(index, 1);
    },
    list() {
      getSubList().then((response) => {
        console.log(response.data.data.subject)
        this.tableData = response.data.data.subject
      })
    },
    isEnable(row) {
      return row.isEnable == 0 ? '否' : '是'
    },
    direction(row) {
      return row.direction == 0 ? '借' : '贷'
    }
  }
}
</script>
