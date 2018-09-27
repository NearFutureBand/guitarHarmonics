class Tab {
    constructor(stringCount, tuning) {
        this.notes = [];
        this.stringCount = stringCount;
        this.tuning = tuning;
        
        this.noteRadius = 30;
        this.notePadding = 10;
        this.drawScheme();
        
    }
    
    drawScheme() {
        d3.select('#tab').append('g').attr('class','tmp-string');
        d3.select('#tab').append('g').attr('class','text');
        this.redrawScheme();
    }
    redrawScheme() {
        let texts = d3.select('g.text')
            .selectAll('text.tex')
            .data(this.notes);
        texts.enter().append('text')
            .text(d => d)
            .attr('font-size', this.noteRadius / 2)
            .attr('class', 'tex')
        texts.exit().remove();
        
        
        let notes = d3.select('g.tmp-string')
            .selectAll('circle.note')
            .data(this.notes);
        notes.enter().append('circle')
            .attr('r', this.noteRadius)
            .attr('class','note')
            .attr('data-tab-note', d => d)
            .attr('fill', 'yellow')
        notes.exit().remove();
        this.restyle();
    }
    restyle() {
        d3.selectAll('g.tmp-string circle.note')
            .data(this.notes)
            .attr('cx', (d, i) => (i + 1 )* ( 2 * this.noteRadius + this.notePadding ))
            .attr('cy', "50%")
        d3.selectAll('g.text text.tex')
            .data(this.notes)
            .attr('x', (d,i) => (i + 1 )* ( 2 * this.noteRadius + this.notePadding ))
            .attr('y', "50%")
    }
    
    addNote(note) {
        this.notes.push(note);
        this.redrawScheme();
    }
}

class Neck {
    constructor(maxFret, stringsCount) {
        this.minWidth = 800;
        this.maxFret = maxFret;
        this.stringsCount = stringsCount;
        /*Полная октава*/
        this.noteSequence = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
        /*Последовательность нот для настройки гитары*/
        this.defaultTuning = ["Z","E","B","G","D","A","E","B","G","D","A","E"];
        /*Матрица грифа для хранения данных для отрисовки*/
        this.frets = [];
        /*Правило минорной гаммы*/
        this.minorHarmRule = "ТПТТПТТ";
        /*Правило мажорной гаммы*/
        this.majorHarmRule = "ТТПТТТП";
        
        /*Открытые ноты при выбранном количестве струн*/
        this.zeroFretNotes = this.makeZeroFretNotes();
        /*Заполение массива frets*/
        this.setFretsData();
        
        /*Графические параметры*/
        this.widthHeightRate = 0.5;
        this.fontSizeRate = 0.35;
        this.lightRadiusRate = 0.2;
        this.textPaddingBottomRate = 0.05;
        this.textAlignCoeff = 0.05;
        
        this.menuUtility();
        
        this.tabLink = new Tab(this.stringsCount, this.zeroFretNotes);
    }
    
    drawScheme() {
        this.clearGroupsInStrings();
        
        let neck = d3.select('#neck')
            .selectAll('g.string')
            .data(this.zeroFretNotes)
        
        neck.enter().append("g")
                .attr('class', 'string')
                .attr('id', (d,i) => 'string-' + i)
        
        neck.exit().remove();
        
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
    
    changeStringCount(newStringCount) {
        this.stringsCount = newStringCount;
        this.zeroFretNotes = this.makeZeroFretNotes();
        this.setFretsData();
        this.drawScheme();
    }
    changeNeckLength(newMaxFret) {
        this.maxFret = newMaxFret;
        this.setFretsData();
        this.drawScheme();
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
    
    menuUtility() {
        this.setMenuHarmonic();
        this.setMenuStringCount();
        this.setMenuNeckLength();
        this.addMenuEventListeners();
    }
    addMenuEventListeners() {
        let $ = this;
        d3.selectAll('.menu-block')
            .on('mouseover', function() {
                Array.from(this.getElementsByClassName('other')).forEach(function(item) {
                    item.style.display = 'block';
                });
            })
            .on('mouseout', function() {
                Array.from(this.getElementsByClassName('other')).forEach(function(item) {
                    item.style.display = 'none';
                });
            })
        d3.selectAll('.other>div')
            .on('click', function() {
                let currentMenuList = this.parentElement.parentElement.classList[this.parentElement.parentElement.classList.length - 1];
                d3.select('.list.' + currentMenuList + ' .chosen').text(this.innerHTML)
                switch(currentMenuList) {
                    case 'neck-length':
                        $.changeNeckLength($.getCurrentSelection('nk-ln'));
                    case 'string-count':
                        $.changeStringCount($.getCurrentSelection('str-cn'));
                    case 'harmonic-note':
                    case 'harmonic-type':
                        $.findHarmonic($.getCurrentSelection('hrm-nt'), $.getCurrentSelection('hrm-tp'));
                        break;
                }
            })
    }
    
    
    /*private*/
    setFrets(mountPlace, stringNumber) {
        let $ = this;
        mountPlace.select('g.frets')
            .selectAll('rect.fret')
            .data(this.frets[stringNumber])
            .enter().append('rect')
                .attr('class', 'fret')
                .attr('fill', (d, i) => (stringNumber != 0 && i != 0)? 'transparent' : 'rgba(0,0,0,.04)')
                .attr('stroke-width', 0.3)
                .attr('stroke', 'rgba(0,0,0,.9)')
                .attr('id', (d,i) => 'fr-' + ( stringNumber * this.maxFret + i))
                .on('click', function() {
                    let targetLightId =  this.id.split('-')[1];
                    d3.select('#lt-' + targetLightId).attr('fill', d3.select('#lt-' + targetLightId).attr('fill') == 'yellow' ? 'transparent' : 'yellow' )
                    $.tabLink.addNote( d3.select('#nt-' + targetLightId).text());
                })
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
                .attr('id', (d,i) => 'nt-' + (stringNumber * this.maxFret + i))
                .on('click', function() {
                    let targetLightId =  this.id.split('-')[1];
                    d3.select('#lt-' + targetLightId).attr('fill', d3.select('#lt-' + targetLightId).attr('fill') == 'yellow' ? 'transparent' : 'yellow' )
                    $.tabLink.addNote( d3.select('#nt-' + targetLightId).text());
                })
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
                .attr('id', (d,i) => 'lt-' + (stringNumber * this.maxFret + i))
            .exit().remove();
    }
    setFretsData() {
        this.frets = [];
        
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
        d3.select('.menu-block .lists .list-1.harmonic-note .other')
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
        d3.select('.menu-block .list.string-count .other')
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
        d3.select('.menu-block .list.neck-length .other')
            .selectAll('div')
            .data(data)
            .enter().append('div')
                .text( (d) => d)
    }
    getCurrentSelection( from) {
        switch(from) {
            case 'nk-ln':
                return parseInt( d3.select('.list.neck-length .chosen').text());
            case 'str-cn':
                return parseInt( d3.select('.list.string-count .chosen').text());
            case 'hrm-tp':
                return d3.select('.list.harmonic-type .chosen').text();
            case 'hrm-nt':
                return d3.select('.list.harmonic-note .chosen').text();
        }
    }
    /*Подсвечивает все ноты, которые находятся в массиве selection*/
    lightUpNotes(selection) {
        this.shutDownLights();
        
        selection.forEach( function(note) {
            d3.selectAll('circle[data-note="' + note + '"]')
                .attr('fill','yellow')
        });
    }
    makeZeroFretNotes() {
        return this.defaultTuning.slice(0, this.stringsCount + 1);
    }
    clearGroupsInStrings() {
        for( let j = 0; j < this.stringsCount + 1; j++) {
            d3.select('#string-' + j).selectAll('g').remove();
        }
    }
}

/*TODO--------------
    инициализация меню со стартовыми параметрами
    оптимизировать ручную подсветку ладов
    навести порядок в addMenuEventLis()
    добавить возможность изменять размер шрифта
    добавить возможность локализировать выбор гаммы - нажатия на номера ладов
    пентатоники
    фикс стилей для меню выбора гамм
    вывод нажатых ладов в псевдо-табы
    инкапсулированный neck.init()
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

