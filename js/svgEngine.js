class Neck {
    constructor(maxFret, stringsCount) {
        //постоянные начальные данные
        this.minWidth = 800;
        this.maxFret = maxFret;
        this.noteSequence = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
        this.defaultTuning = ["Z","E","B","G","D","A","E","B","G"];
        this.stringsCount = stringsCount;
        this.zeroFretNotes = this.defaultTuning.slice(0, this.stringsCount + 1);
        
        
        //графические параметры
        this.fretWidth = 0;
        this.fretHeight = 0;
        this.fontSize = 0;
        this.height = 0;
        
        
    }
    
    updateStyle() {
        
        let neckWidth = d3.select('#neck').attr('width');
        let screenWidth = neckWidth >= this.minWidth ? neckWidth : this.minWidth;
        this.fretWidth = screenWidth / this.maxFret;
        this.fretHeight = this.fretWidth * 0.5;
        this.fontSize = this.fretHeight / 2.5;
        this.height = this.getNeckHeight();
    }
    
    drawScheme() {
        this.updateStyle();
        
        d3.select("#neck")
            .selectAll("g.string")
              .data(this.zeroFretNotes)
                .enter().append("g")
                    .attr('class', 'string')
                    .attr('id', (d,i) => 'string-'+i)
                .exit().remove();
        
        for( let j = 0; j < this.stringsCount + 1; j++) {
            d3.select('#string-' + j)
            .selectAll('rect.fret')
                .data(this.noteSequence)
                .enter().append('rect')
                    .attr('x', (d,i) => i * this.fretWidth )
                    .attr('y', j * this.fretHeight)
                    .attr('width', this.fretWidth)
                    .attr('height', this.fretHeight)
                    .attr('fill', 'rgba(0,0,0,.3)')
                    .attr('stroke-width', 1)
                    .attr('stroke', 'rgba(0,0,0,.9)')
                .exit().remove();
        }
    }
    
    setFretStyle() {
        this.updateStyle();
        
        for( let j = 0; j < this.stringsCount + 1; j++) {
            d3.select('#string-' + j)
            .selectAll('rect.fret')
                .data(this.noteSequence)
                    .attr('x', (d,i) => i * this.fretWidth )
                    .attr('y', j * this.fretHeight)
                    .attr('width', this.fretWidth)
                    .attr('height', this.fretHeight)
                    .attr('fill', 'rgba(0,0,0,.3)')
                    .attr('stroke-width', 1)
                    .attr('stroke', 'rgba(0,0,0,.9)')
        }
    }
    
    getNeckHeight() {
        return d3.select("#neck")
        .attr('height', this.fretHeight * this.stringsCount + 1);
    }
}

//переменная для объекта класса neck - в нем всё
var neck;

window.addEventListener('load', function() {
    neck = new Neck(12, 6);
    neck.drawScheme();
    //neck.setFretStyle();
});
window.addEventListener('resize', function() {
    setSvgContainerParameters();
    //drawNeck();
});

