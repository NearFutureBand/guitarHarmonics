<template>
  <header>
    <div class="header">
      Strings: {{ strings }}
      <button
        @click='changeStringCount'
      >more strings</button>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',
  props: {},
  computed: mapState([
    'strings'
  ]),
  methods: {
    changeStringCount () {
      this.$store.commit({
        type: 'setStringCount',
        amount: 5
      });
    }
  }
}
</script>

<style lang="less">
  header{
    width: 100%;
    padding: 1rem 1rem 0.5rem 1rem;
    .header {
      background-color: #eee;
      height: 5vh; //HARDCODE
    }
  }
  
</style>
