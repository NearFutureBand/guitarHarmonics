import axios from 'axios';
import _ from 'lodash';

const harmonic = {
  namespaced: true,
  state: {
    harmonicNotes: {}, // - selected notes that are highlighted
    harmonic: { // - current selected root and scale
      root: null,
      scale: null,
    },
    scales: {} // - downloaded object with all the info about harmonics
  },
  mutations: {
    /** sets what notes should be highlighted */
    ['setNotesSelection'] (state, payload) {
      state.harmonicNotes = payload;
    },
    /** resets all highlighted notes */
    resetNotesSelection (state) {
      state.harmonicNotes = {};
    },
    /** setter for all scales info */
    setScales (state, payload) {
      state.scales = payload;
    },
    setHarmonic (state, payload) {
      state.harmonic = payload;
    },
    setRoot (state, payload) {
      state.root = payload;
    },
    setScale (state, payload) {
      state.scale = payload;
    }
  },
  getters: {
    scalesIds: state => {
      const ids = _.keys(state.scales);
      return ids;
    },
    scale: state => {
      return state.scale? state.scale : 'scale';
    },
    root: state => {
      return state.root? state.root : 'root';
    },
    currentHarmonic: state => {
      return state.harmonic;
    }
  },
  actions: {
    async fetchHarmonics({ commit }) {
      const response = await axios
        .get(`http://localhost:3001/virtual/api/v1/available-harmonics`)
        .then(res => res.data);
      commit('setScales', response);
    },
    /**
     * Makes request to the API to get note selection for choosen harmonic
     * using current root and scale state variables
     * 
     */
    async findHarmonic({ commit, state }) {
      const response = await axios
        .get(`http://localhost:3001/virtual/api/v1/harmonic/${state.harmonic.root}/${state.harmonic.scale}`)
        .then(res => res.data);
      commit('setNotesSelection', response);
    }
  }
}

export default harmonic;