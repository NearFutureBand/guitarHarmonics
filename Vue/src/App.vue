<template>
    <div id="app">
        <!--<img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App" />-->
        <svg id="neck-container">
            <g class="string" v-for="(string, i) in tuning" :id="'string-' + i">
                <Fret :stringsCount="stringsCount" :fretsCount="fretsCount" :position="[i,0]" :note="frets[i][0]"/>
                <!--<g class="fret" v-for="(f,j) in frets[i]" :id="`f-${i}-${j}`">
                    <text :text="f"></text>
                </g>-->
            </g>
        </svg>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import Fret from './components/Fret.vue'

    export default {
        name: 'app',
        components: {
            Fret
        },
        data: () => {
            return {
                stringsCount: 6,
                fretsCount: 12,

                /*Flat notes of the standard guitar's tuning*/
                defaultTuning: ["Z", "E", "B", "G", "D", "A", "E", "B", "G", "D", "A", "E"],
                /*Full octave*/
                octave: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
            }
        },
        computed: {
            tuning() {
                return this.defaultTuning.slice(0, this.stringsCount + 1);
            },
            
            frets() {
                let frets = [];
                let i = 0,
                    j = 0,
                    oneString = [];

                for (i = 0; i <= this.fretsCount; i++) {
                    oneString.push(i);
                }
                frets.push(oneString);

                for(i = 1; i <= this.stringsCount; i++) {
                   
                    oneString = [this.tuning[i]];
                    
                    for(j = 1; j <= this.fretsCount; j++) {
                        oneString.push(this.getNextNote(oneString[j-1], 'П'));
                    }
                    frets.push(oneString);
                }
                return frets;
            }
        },
        methods: {
            checkIndex: function(index) {
                while (!(index < 12)) index -= 12;
                return index;
            },
            getNextNote: function(note, distance) {
                let index = this.octave.indexOf(note);
                if (distance == 'Т') {
                    index += 2;
                } else {
                    index++;
                }
                return this.octave[this.checkIndex(index)];
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333;
        width: 100%;
        height: 100%;
        padding: 1vh;
        box-sizing: border-box;
    }
    #neck-container {
        background-color: #eee;
        width: 100%;
        height: 100%;
    }
</style>