export default {
  state: {
    isCollapse: false,
    tabsList: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    menu: [],
    currentMenu: null
  },
  mutations: {
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu (state, value) {
      if (value.name !== 'home') {
        state.currentMenu = value
        const result = state.tabsList.findIndex(item => item.name === value.name)
        if (result === -1) {
          state.tabsList.push(value)
        } else {
          state.currentMenu = null
        }
      }
    },
    closeTag (state, value) {
      const result = state.tabsList.findIndex(item => item.name === value.name)
      state.tabsList.splice(result, 1)
    },
    setMenu (state, value) {
      state.menu = value
      sessionStorage.setItem('menu', JSON.stringify(value))
    },
    clearMenu (state) {
      state.menu = []
      sessionStorage.removeItem('menu')
    },
    addMenu (state, router) {
      if (!sessionStorage.getItem('menu')) {
        return
      }
      const menu = JSON.parse(sessionStorage.getItem('menu'))
      state.menu = menu
      const menuArr = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../views${item.url}`)
            return item
          })
          menuArr.push(...item.children)
        } else {
          item.component = () => import(`../views${item.url}`)
          menuArr.push(item)
        }
      })
      // 路由的动态添加
      menuArr.forEach(item => {
        router.addRoute('MainView', item)
      })
    }
  }
}
