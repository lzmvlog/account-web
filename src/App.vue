<template>
  <el-header>
    <el-dropdown>
      <el-icon style="right: 15px">
        <setting/>
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>

  <el-container style="min-height: 89vh; ">
    <el-aside width="200px">
      <el-menu>
        <el-menu-item @click="home()">首页</el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <setting/>
            </el-icon>
            基础设置
          </template>
          <el-sub-menu index="1-1">
            <template #title>科目管理</template>
            <el-menu-item @click="subject()">会计科目</el-menu-item>
          </el-sub-menu>
<!--            <el-menu-item-group>-->
<!--            </el-menu-item-group>-->
<!--            <el-sub-menu index="1-4">-->
<!--              <template #title>Option4</template>-->
<!--              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>-->
<!--            </el-sub-menu>-->
        </el-sub-menu>
      </el-menu>
    </el-aside>

<!--    style="background-color: rgb(238, 241, 246)"-->
    <el-container >
      <el-main>
        <!--        主要显示的内容-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {defineComponent} from 'vue'
import {Setting} from '@element-plus/icons'

export default defineComponent({
  components: {
    Setting,
  },
  methods: {
    home() {
      this.$router.push('/')
    },
    // 跳转会计科目
    subject() {
      this.$router.push('/sub')
    }
  }
})
</script>

