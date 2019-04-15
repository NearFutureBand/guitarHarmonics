<template>
  <div id="app">
    <Header />
    <Neck />
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import Neck from './components/Neck.vue'
import Header from './components/Header.vue'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      strings: 6,
      tuning: 'Standard',
      frets: 22,
      matrix: []
    },
    getters: {
      
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
})

export default {
  name: 'App',
  store,
  components: {
    Header,
    Neck
  },
  created() {
    this.$store.dispatch('fetchMatrix');
  }
}
</script>

<style lang="less">
body, html {
  margin: 0;
  padding: 0;
  color: #333;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}
body {
  .app{
    width: 100%;
    overflow-x: hidden;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-items: center;
  }
}
*{
  box-sizing: border-box;
}

</style>
