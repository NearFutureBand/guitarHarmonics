import axios from 'axios';
import _ from 'lodash';

const tuning = {
  namespaced: true,
  state: {
    name: 'Standard',
    id: 'Standard',
    tunings: {}
  },
  mutations: {
    setTuning (state, payload) {
      state.name = payload.tuningName;
      state.id = payload.tuningId;
    },
    setTuningList (state, payload) {
      state.tunings = payload;
    }
  },
  getters: {
    namesAndIds: state => {
      const obj = _.mapValues(state.tunings, t => t.name );
      const names = _.values( obj );
      const ids = _.keys(obj);
      return ids.map( (id, i) => ({ id, name: names[i] }));
    },
    tuningById: state => id => state.tunings[id]
  },
  actions: {
    async fetchTunings({ commit }) {
      const response = await axios
        .get(`http://localhost:3001/virtual/api/v1/available-tunings`)
        .then(res => res.data);
      commit('setTuningList', response);
    }
  }
}

export default tuning;