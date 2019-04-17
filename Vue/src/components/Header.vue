<template>
  <header>
    <div class="header">

      <div class="nav-block">
        <span class="title">strings</span>
        <div class="menu">
          <div>
            <span class="current">{{ strings }}</span>
            <div class="dropdown">
              <span
                v-for="el in stringsRange"
                :key="el"
                :class="(el===strings)? 'active': ''"
                @click="() => changeStringCount({ amount: el, tuningId })"
              >
                {{ el }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',
  data: () => ({
    stringsRange: [4,5,6,7,8,9]
  }),
  props: {},
  computed: mapState({
    strings: state => state.strings.count,
    frets: state => state.frets.count,
    tuningId: state => state.tuning.tuningId
  }),
  methods: {
    changeStringCount (payload) {
      this.$store.dispatch({
        type: 'changeStringCount',
        payload
      });
    },
    changeFretCount (payload) {
      this.$store.dispatch({
        type: 'changeFretCount',
        payload
      });
    }
  }
}
</script>

<style lang="less">
  @padding: 1rem;
  @text-color: rgb(31, 29, 29);
  @back-color: #eee;

  header{
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    .header {
      background-color: @back-color;
      justify-content: space-around;
      .nav-block{
        align-items: center;
        flex-flow: column;
        padding: @padding;
        .title{
        }

        .menu{
          flex-flow: row;
          >div{
            flex-flow: column;
            position: relative;
            align-items: center;
            .current{
              padding: 0 2rem;
            }
            .current:hover{
              cursor: pointer;
            }
            .dropdown{
              display: none;
              flex-flow: column;
              position: absolute;
              top: 100%;
              z-index: 2;
              box-shadow: 0 0 5px rgba(0,0,0,.3);
              background-color: @back-color;
              >span{
                padding: @padding/2 @padding*2;
              }
              >span:hover{
                  cursor: pointer;
                  background-color: @back-color + #333;
              }
              >span.active{
                  background-color: @back-color - #222;
              }
            }
          }
          >div:hover{
            .dropdown{
              display: flex;
            }
          }
        }
      }
      .nav-block:hover{
        background-color: @back-color - #333;
      }
    }
  }
  
</style>
