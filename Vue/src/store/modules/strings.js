const strings = {
  namespaced: true,
  state: {
    count: 6
  },
  mutations: {
    change (state, payload) {
      state.count = payload.amount;
    }
  },
  getters: {  },
  actions: {
    change({ commit }, payload) {
      commit({
        type: 'change',
        payload
      })
      //dispatch action to recreate matrix in main store
    }
  }
}

export default strings;