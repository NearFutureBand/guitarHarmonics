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
        let svgEl = d3.select('#neck');
        /*d3.select('#neck')
            .selectAll('g')
            .data(groupNames)
                .enter().append('g')
                    .attr('class', (d) => d )
                .exit().remove();
        */
        svgEl.selectAll('g.string')
              .data(this.zeroFretNotes)
                .enter().append("g")
                    .attr('class', 'string')
                    .attr('id', (d,i) => 'string-'+i)
                .exit().remove();
        
        let stringGroup = null;
        
        for( let j = 0; j < this.stringsCount + 1; j++) {
            stringGroup = d3.select('#string-' + j);
            
            stringGroup.append('g').attr('class','frets');
            stringGroup.append('g').attr('class','notes');
            stringGroup.append('g').attr('class','lights');
            
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
            
            //stringGroup.selectAll()*/
        }
        this.restyle();
    }
    
    restyle() {
        
        let neckWidth = parseInt( getComputedStyle( document.getElementById('neck') ).width ),
        screenWidth = ( neckWidth > this.minWidth ) ? neckWidth : this.minWidth,
        fretWidth = screenWidth / this.maxFret,
        fretHeight = fretWidth * 0.5,
        fontSize = fretHeight / 2.5;
        
        d3.select("#neck").attr('height', fretHeight * (this.stringsCount + 1) );
        
        for( let j = 0; j < this.stringsCount + 1; j++) {
            
            d3.select('#string-' + j + ' g.frets')
            .selectAll('rect.fret')
                .data(this.noteSequence)
                    .attr('x', (d,i) => i * fretWidth )
                    .attr('y', j * fretHeight)
                    .attr('width', fretWidth)
                    .attr('height', fretHeight);
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

