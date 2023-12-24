import { createStore } from 'vuex'

export default createStore({
  state: {
    isNightMode: false,
  },
  mutations: {
    toggleNightMode(state) {
      state.isNightMode = !state.isNightMode
    },
  },
})
