<template>
    <div class="fret" :id="`f-${position[0]}-${position[1]}`" :width="`${w}px`">
       <span class="label">{{note}}</span>
       <div class="light"></div>
    </div>
</template>

<script>
    export default {
        name: 'Fret',
        data: function() {
            return {
                active: false,
                w: 100,
                h: 0
            }
        },
        mounted: function() {
            addEventListener('resize', () => {
                this.w = parseInt(getComputedStyle(document.getElementById('neck-container')).width) / (this.fretsCount + 1);
                this.h = this.w / 2;
            });
            dispatchEvent(new Event('resize'));
        },
        props: {
            stringsCount: Number,
            fretsCount: Number,
            position: Array,
            note: String,
        },

        computed: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>