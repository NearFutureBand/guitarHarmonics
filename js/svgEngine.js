class Neck {
    constructor() {
        //постоянные начальные данные
        this.minWidth = 800;
        this.maxFret = 12;
        this.noteSequence = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
        
        this.data = [];
        
        //графические параметры
        this.fretWidth = ( d3.select('#neck').attr('width') >= this.minWidth ? d3.select('#neck').attr('width') : this.minWidth) / this.maxFret;
        this.fretHeight = this.fretWidth * 0.5;
        this.fontSize = this.fretHeight / 2.5;
    }
    
}

//переменная для объекта класса neck - в нем всё
var neck;

window.addEventListener('load', function() {
    neck = new Neck();
    setSvgContainerParameters();
    drawNeck();
});

var getScreenParameters = function() {
    screenWidth = window.innerWidth >= minWidth ? window.innerWidth * 0.98 : minWidth;
    fretWidth = screenWidth / maxFret;
    fretHeight = fretWidth * 0.5;
    fontSize = fretHeight / 2.5;
}

var drawNeck = function() {
    
    d3.select("#neck")
        .selectAll("g.string")
          .data([{},{},{},{},{},{}])
        .enter().append("g")
          .attr('class', 'string')
            .attr('id', (d,i) => 'string-'+(i+1))
        .exit().remove();
    
    for( let j = 0; j<6;j++) {
        d3.select('#string-'+(j+1))
        .selectAll('rect.fret')
            .data(neck.noteSequence)
            .enter().append('rect')
                .attr('x', function(d,i){ return i*neck.fretWidth })
                .attr('y', j*neck.fretHeight)
                .attr('width', neck.fretWidth)
                .attr('height', neck.fretHeight)
            .exit().remove();
    }
        
        
}

var setSvgContainerParameters = function() {
    d3.select("#neck")
        .attr('height', neck.fretHeight * 6)
}