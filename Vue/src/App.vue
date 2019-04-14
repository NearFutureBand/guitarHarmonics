<template>
  <div id="app">
    <Header />
    <Neck />
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import Neck from './components/Neck.vue'
import Header from './components/Header.vue'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      strings: 6,
      tuning: 'Standard',
      frets: 22
    },
    mutations: {
      setStringCount (state, payload) {
        state.strings = payload.amount;
        console.log(payload);
      }
    }
})

export default {
  name: 'App',
  store,
  components: {
    Header,
    Neck
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
