import axios from 'axios';
import _ from 'lodash';

const harmonic = {
  namespaced: true,
  state: {
    harmonicNotes: {},
    root: null, // - current selected root note
    scale: null, // - current selected scale of harmonic
    harmonics: {}
  },
  mutations: {
    setHarmonic (state, payload) {
      state.harmonicNotes = payload;
    },
    resetHarmonic (state) {
      state.harmonicNotes = {};
    },
    setHarmonicsList (state, payload) {
      state.harmonics = payload;
    },
    setRoot (state, payload) {
      state.root = payload;
    },
    setScale (state, payload) {
      state.scale = payload;
    }
  },
  getters: {
    scales: state => {
      const ids = _.keys(state.harmonics);
      return ids;
    },
    scale: state => {
      return state.scale? state.scale : 'scale';
    },
    root: state => {
      return state.root? state.root : 'root';
    }
  },
  actions: {
    async fetchHarmonics({ commit }) {
      const response = await axios
        .get(`http://localhost:3001/virtual/api/v1/available-harmonics`)
        .then(res => res.data);
      commit('setHarmonicsList', response);
    },
    /**
     * Makes request to the API to get note selection for choosen harmonic
     * using current root and scale state variables
     * 
     */
    async findHarmonic({ commit, state }) {
      const response = await axios
        .get(`http://localhost:3001/virtual/api/v1/harmonic/${state.root}/${state.scale}`)
        .then(res => res.data);
        console.log(state.root, state.scale, response);
      commit('setHarmonic', response);
    }
  }
}

export default harmonic;