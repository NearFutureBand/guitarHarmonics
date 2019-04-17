const harmonic = {
  namespaced: true,
  state: {
    harmonicNotes: {},
    root: null,
    scale: null,
    rooots: [],
    scales: []
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