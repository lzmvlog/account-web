<template>
  <el-header style="display: flex;justify-content: right">
    <el-dropdown>
      <el-row class="demo-avatar demo-basic">
        <el-col :span="12">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            </div>
            <div class="block" v-for="size in sizeList" :key="size">
              <el-avatar :size="size" :src="circleUrl"></el-avatar>
            </div>
          </div>
        </el-col>
      </el-row>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="out()">退出</el-dropdown-item>
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
          <el-menu-item index="1-1" @click="subject()">会计科目</el-menu-item>
          <el-menu-item index="1-2" @click="user()">账号管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon class="el-icon-document">
              <document/>
            </el-icon>
            账单管理
          </template>
          <el-menu-item index="2-1" @click="bill()">账单管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
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
import {Document} from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    Document,
    Setting,
  },
  methods: {
    home() {
      this.$router.push('/home')
    },
    // 跳转会计科目
    subject() {
      this.$router.push('/sub')
    },
    bill() {
      this.$router.push('/bill')
    },
    user() {
      this.$router.push('/user')
    },
    out() {
      this.home()
      localStorage.clear()
    }
  }
})
</script>

