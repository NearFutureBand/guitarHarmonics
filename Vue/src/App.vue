<template>
  <div id="app">
    <Neck />
    <Header />
  </div>
</template>

<script>

import Neck from './components/Neck.vue';
import Header from './components/Header.vue';
import store from './store/index';


export default {
  name: 'App',
  store,
  components: {
    Header,
    Neck
  },
  created() {
    this.$store.dispatch('fetchMatrix');
    this.$store.dispatch('tuning/fetchTunings');
    this.$store.dispatch('harmonic/fetchHarmonics')
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
  #app{
    width: 100%;
    overflow-x: hidden;
    height: 100%;
    display: flex;
    flex-flow: column;
    overflow-x: scroll;
    justify-content: center;
    align-content: center;
  }
}
*{
  box-sizing: border-box;
  font-family: 'Roboto Condensed', sans-serif;
}
div{
  display: flex;
}
</style>
