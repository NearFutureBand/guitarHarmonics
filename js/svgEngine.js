class Neck {
    constructor(maxFret, stringsCount) {
        this.minWidth = 800;
        this.maxFret = maxFret;
        this.stringsCount = stringsCount;
        this.noteSequence = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
        this.defaultTuning = ["Z","E","B","G","D","A","E","B","G"];
        this.zeroFretNotes = this.defaultTuning.slice(0, this.stringsCount + 1);
        this.frets = [];
        this.setFretsData();
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
            
            this.setFrets(stringGroup, j);
            this.setNotes(stringGroup, j);
            this.setLights(stringGroup);
        }
        this.restyle();
    }
    
    restyle() {
        
        let neckWidth = parseInt( getComputedStyle( document.getElementById('neck') ).width ),
        screenWidth = ( neckWidth > this.minWidth ) ? neckWidth : this.minWidth,
        fretWidth = screenWidth / this.maxFret,
        fretHeight = fretWidth * 0.5,
        fontSize = fretHeight / 2.5,
        lightRadius = fretWidth / 5,
        stringGroup = null;
        
        d3.select("#neck").attr('height', fretHeight * (this.stringsCount + 1) + fretHeight / 2 );
        
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
                    .attr('x', (d, i) => i * fretWidth + fretWidth / 2 )
                    .attr('y', (j + 1) * fretHeight)
            
            stringGroup.select('g.lights').selectAll('circle.light')
                .data(this.noteSequence)
                    .attr('cx', (d, i) => i * fretWidth + fretWidth / 2)
                    .attr('cy', (j + 1) * fretHeight )
                    .attr('r', () => lightRadius);
        }
    }
    
    /*private*/
    setFrets(mountPlace, stringNumber) {
        mountPlace.select('g.frets')
            .selectAll('rect.fret')
            .data(this.frets[stringNumber])
            .enter().append('rect')
                .attr('class', 'fret')
                .attr('fill', 'transparent')
                .attr('stroke-width', 1)
                .attr('stroke', 'rgba(0,0,0,.9)')
            .exit().remove();
    }
    setNotes(mountPlace, stringNumber) {
        mountPlace.select('g.notes')
            .selectAll('text.note')
            .data(this.frets[stringNumber])
            .enter().append('text')
                .text( (d) => d)
                .attr('class', 'note')
                .attr('font-family','arial')
            .exit().remove();
    }
    setLights(mountPlace) {
        mountPlace.select('g.lights')
            .selectAll('circ.light')
            .data(this.noteSequence)
            .enter().append('circle')
                .attr('class', 'light')
                .attr('fill', 'rgb(255,255,0,.8)')
            .exit().remove();
    }
    setFretsData() {
        let i = 0, j = 0,
        oneString = [];
        this.frets.push([0]);
        
        for(i = 1; i < this.stringsCount + 1; i++) {
            oneString = [];
            for(j = 0; j < this.maxFret; j++) {
                if(i == 1) this.frets[0].push(j+1);
                if(j == 0) oneString.push( this.zeroFretNotes[ i ]);
                oneString.push( this.getNextNote( oneString[j], 'П') );
            }
            this.frets.push( oneString);
        }
    }
    checkIndex(index) {
        while( !(index < 12) ) index -=12;
        return index;
    }
    getNextNote(note, distance) {
        let index = this.noteSequence.indexOf(note);
        if(distance == 'Т') {
            index+=2;
        } else {
            index++;
        }
        return this.noteSequence[ this.checkIndex(index)];
    }
}

/*TODO--------------
    инициализация меню со стартовыми параметрами
    создание массива data для правильного заполнения грифа (с номерами ладов и zeroFretNotes)
--------------------*/


//переменная для объекта класса neck - в нем всё
var neck;

window.addEventListener('load', function() {
    neck = new Neck(12, 6);
    neck.drawScheme();
});
window.addEventListener('resize', function() {
    neck.restyle();
});

