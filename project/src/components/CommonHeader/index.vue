<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
<!--      <h3 style="color: #fff">首页</h3>-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="tag in tags" @click="changeMenu(tag)" :key="tag.path" :to="{ path: tag.path }">{{tag.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown  size="mini" >
        <span>
          <img :src="userImg" class="user" alt="加载中">
        </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CommonHeader',
  data () {
    return {
      userImg: require('@/assets/images/user.png')
    }
  },
  methods: {
    handleMenu () {
      this.$store.commit('COLLAPSEMENU')
    },
    logOut () {
      this.$store.commit('CLEAR_TOKEN')
      this.$store.commit('CLEAR')
      this.$router.push({ name: 'login' })
    },
    changeMenu (item) {
      this.$store.dispatch('selectMenu', item)
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  watch: {
    $route (to, from) {
      this.changeMenu(to)
    }
  }
}
</script>

<style scoped lang="less">
header{
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content{
  display: flex;
  align-items: center;
  .el-button{
    margin-right: 20px;
  }
}
.r-content{
  .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
