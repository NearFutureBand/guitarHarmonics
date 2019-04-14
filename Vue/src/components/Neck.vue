<template>
  <div class="neck-wrapper">
    <div class="neck">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Neck',
  props: {
    //msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .neck-wrapper{
    width: 100%;
    padding: 0.5rem 1rem;
    .neck{
      background-color: blueviolet;
      width: 100%;
      height: 50vh;
    }
  }
  
</style>
