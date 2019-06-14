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
                v-for="el in STRINGS_RANGE"
                :key="el"
                :class="(el===strings)? 'active': ''"
                @click="() => changeStringCount({ amount: el })"
              >
                {{ el }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="nav-block">
        <span class="title">frets</span>
        <div class="menu">
          <div>
            <span class="current">{{ frets }}</span>
            <div class="dropdown">
              <span
                v-for="el in FRETS_RANGE"
                :key="el"
                :class="(el===frets)? 'active': ''"
                @click="() => changeFretCount({ amount: el })"
              >
                {{ el }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="nav-block">
        <span class="title">tunings</span>
        <div class="menu">
          <div>
            <span class="current">{{ tuningName }}</span>
            <div class="dropdown">
              <span
                v-for="el in tunings"
                :key="el.id"
                :class="(el.id === tuningId)? 'active': ''"
                @click="() => changeTuning({ tuningId: el.id, tuningName: el.name })"

              >
                {{ el.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="nav-block">
        <span class="title">harmonic</span>
        <div class="menu">
          <div>
            <span class="current">{{ harmonic.root? harmonic.root : 'root' }}</span>
            <div class="dropdown">
              <span
                v-for="el in ROOTS"
                :key="el"
                :class="(el === harmonic.root)? 'active': ''"
                @click="() => changeHarmonic({ root: el, scale: harmonic.scale })"  
              >
                {{el}}
              </span>
            </div>
          </div>

          <div>
            <span class="current">{{ harmonic.scale? harmonic.scale : 'scale' }}</span>
            <div class="dropdown">
              <span
                v-for="el in scales"
                :key="el"
                :class="(el === harmonic.scale )? 'active': ''"
                @click="() => changeHarmonic({ root: harmonic.root, scale: el })"
              >
                {{el}}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Header',
  data: () => ({ 
    STRINGS_RANGE: [4,5,6,7,8,9],
    FRETS_RANGE: [12,13,14,15,16,17,18,19,20,21,22,23,24],
    ROOTS: ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#']
  }),
  props: {},
  computed: {
    ...mapGetters({
      tunings: 'tuning/namesAndIds',
      scales: 'harmonic/scalesIds',
    }),
    ...mapState({
      strings: state => state.strings.count, // - current selected count of strings
      frets: state => state.frets.count, // - current selected count of frets
      tuningName: state => state.tuning.name,
      tuningId: state => state.tuning.id, // - cureent selected tuning (by id)
      harmonic: state => state.harmonic.harmonic, // - current selected harmonic: { root: string, scale: string }
    })
  },
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
    },
    changeTuning (payload) {
      this.$store.dispatch({
        type: 'changeTuning',
        payload
      });
    },
    changeHarmonic (payload) {
      this.$store.dispatch({
        type: 'changeHarmonic',
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
          font-weight: 700;
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
              z-index: 10;
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
