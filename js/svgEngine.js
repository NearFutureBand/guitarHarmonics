class Neck {
    constructor(maxFret, stringsCount) {
        this.minWidth = 800;
        this.maxFret = maxFret;
        this.stringsCount = stringsCount;
        /*Полная октава*/
        this.noteSequence = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
        /*Последовательность нот для настройки гитары*/
        this.defaultTuning = ["Z","E","B","G","D","A","E","B","G"];
        /*Матрица грифа для хранения данных для отрисовки*/
        this.frets = [];
        /*Правило минорной гаммы*/
        this.minorHarmRule = "ТПТТПТТ";
        /*Правило мажорной гаммы*/
        this.majorHarmRule = "ТТПТТТП";
        
        /*Открытые ноты при выбранном количестве струн*/
        this.zeroFretNotes = this.defaultTuning.slice(0, this.stringsCount + 1);
        /*Заполение массива frets*/
        this.setFretsData();
        
        /*Графические параметры*/
        this.widthHeightRate = 0.5;
        this.fontSizeRate = 0.3;
        this.lightRadiusRate = 0.2;
        this.textPaddingBottomRate = 0.05;
        this.textAlignCoeff = 0.05;
        
        this.menuUtility();
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
            if(j != 0) stringGroup.append('g').attr('class','lights'); 
            stringGroup.append('g').attr('class','notes');
            
            this.setFrets(stringGroup, j);
            this.setNotes(stringGroup, j);
            if(j != 0) this.setLights(stringGroup, j);
        }
        this.restyle();
    }
    
    restyle() {
        
        let neckWidth = parseInt( getComputedStyle( document.getElementById('neck') ).width ),
        screenWidth = ( neckWidth > this.minWidth ) ? neckWidth : this.minWidth,
        fretWidth = screenWidth / ( this.maxFret + 1 ),
        fretHeight = fretWidth * this.widthHeightRate,
        fontSize = fretHeight * this.fontSizeRate,
        lightRadius = fretWidth * this.lightRadiusRate,
        textPaddingBottom = fretHeight * this.textPaddingBottomRate,
        textAlignCoeff = fretWidth * this.textAlignCoeff,
        stringGroup = null;
        
        d3.select("#neck").attr('height', fretHeight * (this.stringsCount + 1) + fretHeight / 2 );
        
        for( let j = 0; j < this.stringsCount + 1; j++) {
            stringGroup = d3.select('#string-' + j);
            
            stringGroup.select('g.frets').selectAll('rect.fret')
                .data(this.frets[j])
                    .attr('x', (d, i) => i * fretWidth )
                    .attr('y', j * fretHeight)
                    .attr('width', fretWidth)
                    .attr('height', fretHeight);
            
            stringGroup.select('g.notes').selectAll('text.note')
                .data(this.frets[j])
                    .attr('x', (d, i) => i * fretWidth + fretWidth / 2  - textAlignCoeff )
                    .attr('y', (j + 1) * fretHeight  - textPaddingBottom )
                    .attr('font-size', fontSize)
            
            stringGroup.select('g.lights').selectAll('circle.light')
                .data(this.frets[j])
                    .attr('cx', (d, i) => i * fretWidth + fretWidth / 2)
                    .attr('cy', (j + 1) * fretHeight )
                    .attr('r', () => lightRadius);
        }
    }
    
    /*Находит все ноты, входящие в заданную гамму*/
    findHarmonic(note, type) {
        let selection = [];
        if( note != '-') {
            let currentNote = note,
            rule = (type == 'Minor') ? this.minorHarmRule : this.majorHarmRule;
        
            for( let i = 0; i < rule.length; i++) {
                currentNote = this.getNextNote(currentNote, rule[i]);  
                selection.push(currentNote);
            }
        }
        this.lightUpNotes(selection);   
    }
    
    /*Подсвечивает все ноты, которые находятся в массиве selection*/
    lightUpNotes(selection) {
        this.shutDownLights();
        
        selection.forEach( function(note) {
            d3.selectAll('circle[data-note = ' + note + ']')
                .attr('fill','rgba(255,255,0,.9)')
        });
    }
    
    menuUtility() {
        this.setMenuHarmonic();
        this.setMenuStringCount();
        this.setMenuNeckLength();
        this.addMenuEventListeners();
        this.addFretsEventListeners();
    }
    addMenuEventListeners() {
        d3.selectAll('.menu-block')
            .on('mouseover', function() {
                d3.selectAll('.' + this.classList[1] + ' .other').style('display','block');
            })
            .on('mouseout', function() {
                d3.selectAll('.' + this.classList[1] + ' .other').style('display','none');
            })
        d3.selectAll('.other>div')
            .on('click', function() {
                this.parentElement.previousElementSibling.children[1].innerHTML = this.innerHTML;
            })
    }
    
    addFretsEventListeners() {
        d3.selectAll('rect.fret').on('click', function(){
            
        })
    }
    
    
    /*private*/
    setFrets(mountPlace, stringNumber) {
        mountPlace.select('g.frets')
            .selectAll('rect.fret')
            .data(this.frets[stringNumber])
            .enter().append('rect')
                .attr('class', 'fret')
                .attr('fill', (d, i) => (stringNumber != 0 && i != 0)? 'transparent' : 'rgba(0,0,0,.04)')
                .attr('stroke-width', 0.3)
                .attr('stroke', 'rgba(0,0,0,.9)')
                .attr('id', (d,i) => stringNumber * this.maxFret + i)
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
                .attr('fill','rgba(0,0,0,.7)')
            .exit().remove();
    }
    setLights(mountPlace, stringNumber) {
        mountPlace.select('g.lights')
            .selectAll('circ.light')
            .data(this.frets[stringNumber])
            .enter().append('circle')
                .attr('class', 'light')
                .attr('fill', 'transparent')
                .attr('data-note', (d) => d)
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
    shutDownLights() {
        d3.selectAll('circle.light')
            .attr('fill', 'transparent')
    }
    setMenuHarmonic() {
        d3.select('.menu-block.harmonic .lists .list-1 .other')
            .selectAll('div')
            .data( ['-'].concat( this.noteSequence) )
            .enter().append('div')
                .text( (d) => d)
    }
    //TODO - посмотреть создание массива по заданному правилу
    setMenuStringCount() {
        let data = [];
        for( let i = 4; i <= 9; i++) {
            data.push(i);
        }
        d3.select('.menu-block.string-count .list .other')
            .selectAll('div')
            .data(data)
            .enter().append('div')
                .text( (d) => d)
    }
    setMenuNeckLength() {
        let data = [];
        for( let i = 12; i <= 24; i++) {
            data.push(i);
        }
        d3.select('.menu-block.neck-length .list .other')
            .selectAll('div')
            .data(data)
            .enter().append('div')
                .text( (d) => d)
    }
}

/*TODO--------------
    инициализация меню со стартовыми параметрами
    события нажатия на пункты меню
--------------------*/


//переменная для объекта класса neck - в нем всё
var neck;

window.addEventListener('load', function() {
    neck = new Neck(19, 6);
    neck.drawScheme();
});
window.addEventListener('resize', function() {
    neck.restyle();
});

