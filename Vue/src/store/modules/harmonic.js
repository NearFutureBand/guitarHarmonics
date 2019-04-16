const harmonic = {
  namespaced: true,
  state: {
    harmonicNotes: {}
  },
  mutations: {
    change (state, payload) {
      state.harmonicNotes = payload;
    }
  },
  getters: {  },
  actions: {  }
}

export default harmonic;