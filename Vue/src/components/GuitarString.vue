<template>
  <div class="guitar-string">
  </div>
</template>

<script>
export default {
  name: 'GuitarString',
  props: {
    //msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .guitar-string{
    display: flex;
    width: 100%;
    height: 100%;
    border-bottom: 2px;
    border-color: black;
    border-style: solid;
  }
  
</style>
