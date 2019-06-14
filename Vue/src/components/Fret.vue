<template>
  <div class="fret">
    <span class="note">
      {{ note }}
    </span>
    <span class="light" v-if="highlighted"/>
  </div>
</template>

<script>
export default {
  name: 'Fret',
  props: {
    position: Array
  },
  computed: {
    note() {
      return this.$store.getters.getNoteByPos(this.position);
    },
    highlighted() {
      return this.$store.getters['harmonic/isHighlighted'](this.note);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @padding: 1rem;
  @text-color: rgb(31, 29, 29);
  @back-color: #eee;

  .fret{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    border-left: 1px solid gray;
    align-items: flex-end;
    position: relative;
    .note{
      z-index: 1;
      margin-bottom: -@padding/4;
    }
    .light{
      width: @padding*3;
      height: @padding*3;
      border-radius: @padding*1.5;
      z-index: 0;
      bottom: -@padding/2;
      position: absolute;
      background-color: rgba(255, 255, 0, .9);
      @media (min-width: 1200px){
          width: @padding*2;
          height: @padding*2;
          border-radius: @padding;            
      }
    }
  }
  .fret:hover{
      background-color: @back-color + #333;
      cursor: pointer;
  }

  .fret:first-child{
      border: none;
      background-color: #fff;
  }
  .fret.incrustated{
      background-color: @back-color - #111;
  }
</style>
