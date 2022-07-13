<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <CommonAside></CommonAside>
    </el-aside>
    <el-container>
      <el-header><CommonHeader/></el-header>
      <CommonTag></CommonTag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside/index'
import CommonHeader from '@/components/CommonHeader/index'
import CommonTag from '@/components/CommonTag/index'
export default {
  name: 'MainView',
  components: { CommonTag, CommonHeader, CommonAside },
  mounted () {
    this.$store.dispatch('getTabsList')
    const currentMenu = this.$store.state.tab.currentMenu
    this.$router.push({ name: currentMenu })
    // if (currentMenu) {
    //   this.$router.push({ name: this.$store.state.tab.currentMenu.name })
    // }
  }
}
</script>

<style scoped lang="less">
.el-header {
  background-color: black;
}
.el-main {
  padding-top: 0;
}
</style>
