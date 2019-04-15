<template>
  <div class="neck-wrapper">
    <div class="neck">
      <GuitarString
        v-for="(string, i) in (strings + 1) "
        :key="i"
        :number="i"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GuitarString from './GuitarString.vue';

export default {
  name: 'Neck',
  components: {
    GuitarString
  },
  computed: mapState([
    'strings'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .neck-wrapper{
    width: 100%;
    padding: 0.5rem 1rem;
    .neck{
      background-color: #eee;
      width: 100%;
      height: 50vh;
      display: flex;
      flex-flow: column;
    }
  }
  
</style>
