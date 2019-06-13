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
    getNoteByPos: state => pos => {
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
          `http://localhost:3001/vitrual/api/v1/fretboard/${state.tuning.id}/${state.strings.count}/${state.frets.count}`
        ).then( res => res.data);
      commit('setMatrix', response);
    },

    changeStringCount({ commit, dispatch, getters, state }, { payload }) {
      const currentTuning = getters['tuning/tuningById'](state.tuning.id);
      commit('strings/setCount',
        { amount: currentTuning.maxStrings < payload.amount ? currentTuning.defaultStrings : payload.amount }
      );
      dispatch('fetchMatrix');
    },

    changeFretCount({ commit, dispatch }, { payload }) {
      commit('frets/setCount', payload);
      dispatch('fetchMatrix');
    },

    changeTuning({ commit, dispatch, getters }, { payload }) {
      const targetTuning = getters['tuning/tuningById'](payload.tuningId);
      commit('strings/setCount', { amount: targetTuning.defaultStrings });
      commit('tuning/setTuning', payload);
      dispatch('fetchMatrix');
    },

    changeHarmonic({ commit, dispatch, state }, { payload }) {
      const { root, scale } = state.harmonic;
      //if(payload.root === root) payload.root = null;
      //if(payload.scale === scale) payload.scale = null;
      const newHarmonic = { root, scale, ...payload };

      commit('harmonic/setRoot', newHarmonic.root);
      commit('harmonic/setScale', newHarmonic.scale);

      if( newHarmonic.root && newHarmonic.scale ) {
        dispatch('harmonic/findHarmonic');
      }
      if( !newHarmonic.root && !newHarmonic.scale ) {
        commit('harmonic/resetHarmonic');
      }
    }
  }
});

export default store;