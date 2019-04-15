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
import store from './store';

Vue.use(Vuex);

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
