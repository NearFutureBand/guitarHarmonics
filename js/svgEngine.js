class Fret {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //отношение ширины лада к радиусу подсветки
        this.lightRadiusRate = 2.5;
    }
}

class Neck {
    constructor(maxFret, stringsCount) {
        this.minWidth = 800;
        this.maxFret = maxFret;
        this.noteSequence = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
        this.defaultTuning = ["Z","E","B","G","D","A","E","B","G"];
        this.stringsCount = stringsCount;
        this.zeroFretNotes = this.defaultTuning.slice(0, this.stringsCount + 1);     
    }
    
    drawScheme() {
        d3.select('#neck').selectAll('g.string')
            .data(this.zeroFretNotes)
            .enter().append("g")
                .attr('class', 'string')
                .attr('id', (d,i) => 'string-'+i)
            .exit().remove();
        
        let stringGroup = null;
        
        for( let j = 0; j < this.stringsCount + 1; j++) {
            stringGroup = d3.select('#string-' + j);
            
            stringGroup.append('g').attr('class','frets');
            stringGroup.append('g').attr('class','lights'); 
            stringGroup.append('g').attr('class','notes');
            
            //frets
            stringGroup.select('g.frets')
                .selectAll('rect.fret')
                .data(this.noteSequence)
                .enter().append('rect')
                    .attr('class', 'fret')
                    .attr('fill', 'rgba(0,0,0,.1)')
                    .attr('stroke-width', 1)
                    .attr('stroke', 'rgba(0,0,0,.9)')
                .exit().remove();
            
            //notes
            stringGroup.select('g.notes')
                .selectAll('text.note')
                .data(this.noteSequence)
                .enter().append('text')
                    .text( (d) => d)
                    .attr('class', 'note')
                    .attr('font-family','arial')
                .exit().remove();
            
            //lights
            stringGroup.select('g.lights')
                .selectAll('circ.light')
                .data(this.noteSequence)
                .enter().append('circle')
                    .attr('class', 'light')
                    .attr('fill', 'yellow')
                .exit().remove();
        }
        this.restyle();
    }
    
    restyle() {
        
        let neckWidth = parseInt( getComputedStyle( document.getElementById('neck') ).width ),
        screenWidth = ( neckWidth > this.minWidth ) ? neckWidth : this.minWidth,
        fretWidth = screenWidth / this.maxFret,
        fretHeight = fretWidth * 0.5,
        fontSize = fretHeight / 2.5,
        stringGroup = null;
        
        d3.select("#neck").attr('height', fretHeight * (this.stringsCount + 1) );
        
        for( let j = 0; j < this.stringsCount + 1; j++) {
            stringGroup = d3.select('#string-' + j);
            
            stringGroup.select('g.frets').selectAll('rect.fret')
                .data(this.noteSequence)
                    .attr('x', (d, i) => i * fretWidth )
                    .attr('y', j * fretHeight)
                    .attr('width', fretWidth)
                    .attr('height', fretHeight);
            
            stringGroup.select('g.notes').selectAll('text.note')
                .data(this.noteSequence)
                    .attr('x', (d, i) => i * fretWidth )
                    .attr('y', j * fretHeight)
            
            stringGroup.select('g.lights').selectAll('circle.light')
                .data(this.noteSequence)
                    .attr('cx', (d, i) => i * fretWidth )
                    .attr('cy', j * fretHeight)
                    .attr('r', fretHeight/2);
            
        }
    }
}

/*TODO--------------
    инициализация меню со стартовыми параметрами
    создать три группы - strings, frets, notes, lights
--------------------*/


//переменная для объекта класса neck - в нем всё
var neck;

window.addEventListener('load', function() {
    neck = new Neck(12, 6);
    neck.drawScheme();
    //neck.setFretStyle();
});
window.addEventListener('resize', function() {
    //setSvgContainerParameters();
    //drawNeck();
    neck.restyle();
});

