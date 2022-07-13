<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" style="height: 100%"
           text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
    <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" :index="item.path+''" v-for="item in noChildren" :key="item.path">
      <i :class="'el-icon-'+ item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path+''" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group  v-for="(subItem,subIndex) in item.children" :key="subIndex">
        <el-menu-item @click="clickMenu(subItem)" :index="subIndex+''" :class="'el-icon-'+subItem.icon">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'CommonAside',
  data () {
    return {
      menu: []
    }
  },
  methods: {
    // handleOpen (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    clickMenu (item) {
      this.$router.push({
        name: item.name
      })
      this.$store.dispatch('selectMenu', item)
    }
  },
  computed: {
    noChildren () {
      return this.asyncMenu.filter(item => !item.children)
    },
    hasChildren () {
      return this.asyncMenu.filter(item => item.children)
    },
    isCollapse () {
      return this.$store.state.tab.isCollapse
    },
    asyncMenu () {
      return this.$store.state.tab.menu
    }
  },
  mounted () {
    // console.log(this.$store.user.state.menu)
    // this.menu = this.$store.user.state.menu
  }
}
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100px;
  border: none;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>
