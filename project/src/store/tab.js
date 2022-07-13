export default {
  state: {
    isCollapse: false,
    tabsList: [],
    menu: [],
    currentMenu: ''
  },
  actions: {
    selectMenu ({ commit, state }, value) {
      if (value.name !== 'home') {
        const result = state.tabsList.findIndex(item => item.name === value.name)
        if (result === -1) {
          commit('ADD_TABSLIST', value)
        }
        commit('SET_CURRENTMENU', value.name)
        sessionStorage.setItem('tableList', JSON.stringify(state.tabsList))
        sessionStorage.setItem('currentMenu', value.name)
      } else {
        commit('SET_CURRENTMENU', 'home')
      }
    },
    getTabsList ({ commit }) {
      if (!sessionStorage.getItem('tableList')) {
        const tabsList = [{
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'home'
        }]
        commit('SET_TABSLIST', tabsList)
      } else {
        commit('GET_TABSLIST')
      }
      if (!sessionStorage.getItem('currentMenu')) {
        commit('SET_CURRENTMENU', 'home')
      } else {
        commit('GET_CURRENTMENU')
      }
      if (!sessionStorage.getItem('isCollapse')) {
        commit('SET_COLLAPSEMENU', false)
      } else {
        commit('GET_COLLAPSEMENU')
      }
    }
  },
  mutations: {
    COLLAPSEMENU (state) {
      state.isCollapse = !state.isCollapse
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_COLLAPSEMENU (state, value) {
      state.isCollapse = value
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    GET_COLLAPSEMENU (state) {
      state.isCollapse = JSON.parse(sessionStorage.getItem('isCollapse'))
      // sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_TABSLIST (state, value) {
      state.tabsList = value
    },
    ADD_TABSLIST (state, value) {
      state.tabsList.push(value)
    },
    DEL_TABSLIST (state, value) {
      const result = state.tabsList.findIndex(item => item.name === value.name)
      state.tabsList.splice(result, 1)
      sessionStorage.setItem('tableList', JSON.stringify(state.tabsList))
    },
    GET_TABSLIST (state) {
      state.tabsList = JSON.parse(sessionStorage.getItem('tableList'))
    },
    SET_CURRENTMENU (state, value) {
      state.currentMenu = value
      sessionStorage.setItem('currentMenu', value)
    },
    GET_CURRENTMENU (state) {
      state.currentMenu = sessionStorage.getItem('currentMenu')
    },
    SET_MENU (state, value) {
      state.menu = value
      sessionStorage.setItem('menu', JSON.stringify(value))
    },
    // GET_MENU (state) {
    //   state.menu = JSON.parse(sessionStorage.getItem('menu'))
    // },
    ADD_MENU (state, router) {
      if (!sessionStorage.getItem('menu')) {
        return
      }
      const menu = JSON.parse(sessionStorage.getItem('menu'))
      state.menu = menu
      const menuArr = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../views/${item.url}`)
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
    },
    CLEAR (state) {
      state.menu = []
      sessionStorage.removeItem('menu')
      state.tabsList = []
      state.currentMenu = ''
      state.isCollapse = false
      sessionStorage.removeItem('tableList')
      sessionStorage.removeItem('currentMenu')
      sessionStorage.removeItem('isCollapse')
    }
  }
}
