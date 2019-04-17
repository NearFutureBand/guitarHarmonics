const frets = {
  namespaced: true,
  state: {
    count: 22
  },
  mutations: {
    setCount (state, payload) {
      state.count = payload.amount;
    }
  },
  getters: {  },
  actions: {  }
}

export default frets;