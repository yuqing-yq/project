export default {
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN (state, value) {
      state.token = value
      sessionStorage.setItem('token', value)
    },
    CLEAR_TOKEN (state) {
      state.token = ''
      sessionStorage.removeItem('token')
    },
    GET_TOKEN (state) {
      state.token = sessionStorage.getItem('token') || state.token
    }
  }
}
