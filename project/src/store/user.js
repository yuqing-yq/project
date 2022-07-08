export default {
  state: {
    token: ''
  },
  mutations: {
    setToken (state, value) {
      state.token = value
      sessionStorage.setItem('token', value)
    },
    clearToken (state) {
      state.token = ''
      sessionStorage.removeItem('token')
    },
    getToken (state) {
      state.token = sessionStorage.getItem('token') || state.token
    }
  }
}
