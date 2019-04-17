import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import strings from './modules/strings';
import frets from './modules/frets';
import tuning from './modules/tuning';
import harmonic from './modules/harmonic';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    strings,
    frets,
    tuning,
    harmonic
  },
  state: {
    matrix: []
  },
  getters: {
    getNoteByPos: (state) => (pos) => {
      return state.matrix[pos[0]][pos[1]]
    }
  },
  mutations: {
    setMatrix (state, payload) {
      state.matrix = payload;
    }
  },
  actions: {
    async fetchMatrix ({ commit, state }) {
      const response = await axios
        .get(
          `http://localhost:3001/vitrual/api/v1/fretboard/${state.tuning.tuningId}/${state.strings.count}/${state.frets.count}`
        ).then( res => res.data);
      commit('setMatrix', response);
    },
    changeStringCount({ commit, dispatch }, { payload }) {
      
      //check tuning

      commit({
        type: 'strings/setCount',
        payload
      });
      dispatch('fetchMatrix');
    },
    changeFretCount({ commit, dispatch }, { payload }) {
      commit({
        type: 'frets/setCount',
        payload
      });
      dispatch('fetchMatrix');
    },
    changeTuning({ commit, dispatch }, { payload }) {
      commit({
        type: 'tuning/setTuning',
        payload
      });
      dispatch('fetchMatrix');
    }
  }
});

export default store;