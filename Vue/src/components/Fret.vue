<template>
  <div class="fret">
    {{ note }}
  </div>
</template>

<script>
export default {
  name: 'GuitarString',
  props: {
    position: Array
  },
  computed: {
    note() {
      return this.$store.getters.getNoteByPos(this.position);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .fret{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    border-right: 1px solid black;
  }
</style>
