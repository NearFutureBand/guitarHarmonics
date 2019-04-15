<template>
  <div class="guitar-string">
    <Fret
      v-for="(fret, i) in (frets + 1)"
      :key="i"
      :position="[number, i]"
    />
  </div>
</template>

<script>
import Fret from './Fret.vue';
import { mapState } from 'vuex';

export default {
  name: 'GuitarString',
  components: {
    Fret
  },
  props: {
    number: Number
  },
  computed: mapState([
    'frets'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .guitar-string{
    display: flex;
    flex-flow: row;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid black;
  }
</style>
