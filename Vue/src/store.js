import Vuex from 'vuex';
import axios from 'axios';

const store = new Vuex.Store({
  state: {
    strings: 6,
    tuning: 'Standard',
    frets: 22,
    matrix: []
  },
  getters: {
    getNoteByPos: (state) => (pos) => {
      return state.matrix[pos[0]][pos[1]]
    }
  },
  mutations: {
    setStringCount (state, payload) {
      state.strings = payload.amount;
    },
    setMatrix (state, payload) {
      state.matrix = payload;
    }
  },
  actions: {
    async fetchMatrix ({ commit, state }) {
      const response = await axios.get(`http://localhost:3001/vitrual/api/v1/fretboard/${state.tuning}/${state.strings}/${state.frets}`)
        .then( res => res.data);
      commit('setMatrix', response);
    },
    changeStringCount({ commit, dispatch }, payload) {
      commit({
        type: 'setStringCount',
        payload
      });
      dispatch('fetchMatrix');
    }
  }
});

export default store;