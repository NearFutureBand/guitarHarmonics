<template>
    <g class="fret" :id="`f-${position[0]}-${position[1]}`">
        <rect
            :x="position[0] * fretWidth"
            :y="position[1] * fretHeight"
            :width="fretWidth"
            :height="fretHeight"
            fill="transparent"
            stroke-width="0.3"
            stroke="rgba(0,0,0,.9)"
        ></rect>
        <circle
            :cx="position[0] * fretWidth + fretWidth / 2"
            :cy="(position[1] + 1) * fretHeight - lightTranslY"
            :r="lightRadius"
        ></circle>
        <text
            :x="position[0] * fretWidth + fretWidth / 2  - textAlignCoeff"
            :y="(position[1] + 1) * fretHeight  - textPaddingBottom"
            :font-size="fontSize"
            :text="note"
        ></text>
    </g>
</template>

<script>
    export default {
        name: 'Fret',
        data: function() {
            return {
                
            }
        },
        ready: function() {
            window.addEventListener('resize', () => {
                //пересчитать всё что в computed
            });
        },
        props: {
            stringsCount: Number,
            fretsCount: Number,
            position: Object,
            note: Array,
            screenWidth: Number
        },
        
        computed: {
            fretWidth() {
                return this.screenWidth / (this.fretsCount + 1);
            },
            fretHeight() {
                return this.fretWidth * this.widthHeightRate;
            },
            fontSize() {
                return this.fretHeight * this.fontSizeRate;
            },
            lightRadius() {
                return this.fretWidth * this.lightRadiusRate;
            },
            lightTranslY() {
                return this.fretHeight * this.lightTranslYCoeff;
            },
            textPaddingBottom() {
                return this.fretHeight * this.textPaddingBottomRate;
            },
            textAlignCoeff() {
                return this.fretWidth * this.textAlignCoeff;
            }
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>