const tuning = {
  namespaced: true,
  state: {
    tuningId: 'Standard'
  },
  mutations: {
    change (state, payload) {
      state.tuning = payload.tuningId;
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

export default tuning;