<template>
    <g class="fret" :id="`f-${position[0]}-${position[1]}`">
        <rect></rect>
        <circle></circle>
        <text :text="note" x="0" y="0"></text>
    </g>
</template>

<script>
    export default {
        name: 'Fret',
        data: function() {
            return {
                
            }
        },
        props: {
            stringsCount: Number,
            fretsCount: Number,
            position: Object,
            note: Array
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