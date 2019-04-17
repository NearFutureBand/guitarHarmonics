const strings = {
  namespaced: true,
  state: {
    count: 6
  },
  mutations: {
    setCount (state, payload) {
      state.count = payload.amount;
    }
  },
  getters: {  },
  actions: {  }
}

export default strings;