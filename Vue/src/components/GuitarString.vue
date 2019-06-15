<template>
  <div
    class="guitar-string"
    :style="{borderBottomWidth: `${gauges[number]}px`}"
  >
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
  data: () => ({
    gauges: [2, 0.1, 1, 1.5, 2, 2.5, 3.0, 3.5]
  }),
  props: {
    number: Number
  },
  computed: mapState({
    frets: state => state.frets.count
  })
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
  .guitar-string:first-child{
    background-color: white;
  }
</style>
