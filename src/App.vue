<template>
  <router-view/>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  methods: {
    home() {
      this.$router.push('/')
    },
    // 跳转会计科目
    subject() {
      this.$router.push('/sub')
    },
    bill(){
      this.$router.push('/bill')
    }
  }
})
</script>

<style>
.cell{
  text-align: center;
}
</style>

