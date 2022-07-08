<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" style="height: 100%"
           text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
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
      // menu: [
      //   {
      //     path: '/home',
      //     name: 'home',
      //     label: '首页',
      //     icon: 's-home',
      //     url: '/home'
      //   },
      //   {
      //     path: '/mall',
      //     name: 'mall',
      //     label: '商品管理',
      //     icon: 'video-play',
      //     url: '/mall'
      //   },
      //   {
      //     path: '/user',
      //     name: 'user',
      //     label: '用户管理',
      //     icon: 'user',
      //     url: '/user'
      //   },
      //   {
      //     label: '其他',
      //     icon: 'location',
      //     children: [
      //       {
      //         path: '/pageOne',
      //         name: 'pageOne',
      //         label: '页面1',
      //         icon: 'setting',
      //         url: '/pageOne'
      //       },
      //       {
      //         path: '/pageTwo',
      //         name: 'pageTwo',
      //         label: '页面2',
      //         icon: 'setting',
      //         url: '/pageTwo'
      //       }
      //     ]
      //   }
      // ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    clickMenu (item) {
      this.$router.push({
        name: item.name
      })
      this.$store.commit('selectMenu', item)
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
