/*Полная последовательность нот*/
//let sequence = ["До","До#","Рэ","Рэ#","Ми","Фа","Фа#","Соль","Соль#","Ля","Ля#","Си"];
let sequence = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
/*Правило минорной гаммы*/
let minorHarmRule = "ТПТТПТТ";
/*Правило мажорной гаммы*/
let majorHarmRule = "ТТПТТТП";
/*Открытые ноты на грифе гитары начиная с первой*/
//let zeroFretNotes = ["Ми","Си","Соль","Рэ","Ля","Ми"];
let zeroFretNotes = ["E","B","G","D","A","E","B"];
/*Максимальное число отображаемых ладов (12-30)*/
let maxFret = 20;
/*Ширина контейнера для грифа - для адаптивности*/
let screenWidth;
/*Ширина одного лада - вычисляется относительно ширины экрана*/
let fretWidth;
/*Коэффициент для расчёта радиуса точки-подсветки лада*/
let lightRadiusRate = 2.5;



//TODO: languages


window.onload = function() {
    drawScheme();
    redrawNeck();
    
    setHTMLSelectors();
    
    document.getElementById('string-count').value = "7";
    document.getElementById('count-of-frets').value = "19";
    
}
window.onresize = function() {
    redrawNeck();
};

/*Добавление HTML контента и управляющих элементов*/
/*TODO - добавить возможность выбора количества ладов*/
var setHTMLSelectors = function() {
    let targetForm = document.getElementById('harmonic-selection');
    
    
    let op;
    sequence.forEach( function(item) {
        op = document.createElement('option');
        op.innerHTML = item;
        document.getElementById('harmonic-note').appendChild(op);
    });
    
    for(let i = 12; i < 25 ; i++) {
        op = document.createElement('option');
        op.innerHTML = i;
        document.getElementById('count-of-frets').appendChild(op);
    }
}

/*Получение параметров окна и установка динамической ширины*/
/*TODO - определить константу - минимальную ширину*/
var getScreenParameters = function() {
    screenWidth = window.innerWidth * 0.99;
    fretWidth = screenWidth/maxFret;
}

/*Отрисовать блоки - выполняется один раз*/
var drawScheme = function() {
    Array.from( document.getElementById('neck').children).forEach( function(item) {
        item.remove();
    });
    
    setRows();
    setNeck();
}

/*Адаптивное изменение стилей всей схемы*/
var redrawNeck = function() {
    getScreenParameters();
    setDynamicStyles();
}

/*Установка ширин и высот для ячеек с нотами*/
/*TODO - Убрать jQuery*/
var setDynamicStyles = function() {
    
    //Настройка ширины ладов
    $('.fret').css('width',fretWidth+'px');
    
    //Настройка размеров подсветки ладов
    $('.light')
        .css('width',fretWidth/lightRadiusRate+'px')
        .css('height', fretWidth/lightRadiusRate+'px')
        .css('border-radius',fretWidth+'px')
        .css('z-index',0)
        .css('left', (fretWidth/2 - fretWidth/lightRadiusRate/2)+'px');
    
    //Имитация струн и разделителей ладов
    $('.fret').css('padding-top', fretWidth/2);
    $('.string:first-child .fret').css('padding-top',0);
}

/*Устанавливает контейнеры-строки (струны)*/
var setRows = function() {
    
    /*Установка номеров ладов*/
    /*TODO вынести в отдельную функцию*/
    let th = document.createElement('div');
    th.id = 'table-head';
    th.className = 'string';
    document.getElementById('neck').appendChild(th);
    
    for(let i = 0; i < maxFret; i++) {
        let fretNum = document.createElement('div');
        fretNum.className = 'fret';
        fretNum.innerHTML = i;
        document.getElementById('table-head').appendChild(fretNum);
    }
    /*Конец установки номеров ладов*/
    
    zeroFretNotes.forEach(function(item,i){ 
        let string = document.createElement('div');
        string.className = 'string';
        string.id = 'string-' + (i+1);
        string.innerHTML = '<div class="fret">'+item+'</div>';
        document.getElementById('neck').appendChild(string);
    });
}

/*Рисует все ноты на грифе до лада maxFret*/
/*TODO - сократить в размерах, сделать покрасивее*/
var setNeck = function() {
    zeroFretNotes.forEach(function(item,I) {
        
        let index = sequence.indexOf(item);
        
        for(let i = 1; i < maxFret; i++) {
            let fret = document.createElement('div');
            fret.className = 'fret';
            let fretInnerHTML = '<span class="light"></span><span class="note">';
            fretInnerHTML += sequence[ checkIndex( i + index)];
            fret.setAttribute('data-note', sequence[ checkIndex( i + index)]);
            fretInnerHTML += '</span>';
            fret.innerHTML = fretInnerHTML;
            document.getElementById('string-'+(I+1)).appendChild(fret);
        }
    });
}

/*Подсвечивает все ноты, которые находятся в массиве selection*/
/*TODO - Убрать jQuery*/
var lightUpNotes = function(selection) {
    $('.light').css('background-color', 'transparent');
    selection.forEach( function(item){
        $('[data-note="'+item+'"]>span.light').css('background-color', 'yellow');
    });
}

/*Возвращает массив нот входящих в заданную гамму*/
var findHarmonic = function(note, type) {
    let rule = (type == 'Minor') ? minorHarmRule : majorHarmRule;
    let selection = [], currentNote = note;
    
    for( let i = 0; i < rule.length; i++) {
        currentNote = getNextNote(currentNote,rule[i]);  
        selection.push(currentNote);
    }
    
    lightUpNotes(selection);
}

/*Событие вызова новой гаммы*/
Array.from(document.querySelectorAll('#harmonic-note, #harmonic-type')).forEach( function(item) {
    item.addEventListener("change", function() {
        let harmonicNote = document.getElementById('harmonic-note').value;
        let harmonicType = document.getElementById('harmonic-type').value;
        findHarmonic(harmonicNote, harmonicType);
    });
});
    

document.getElementById('count-of-frets').addEventListener('change', function() {
    maxFret = Number(document.getElementById('count-of-frets').value) + 1;
    drawScheme();
    redrawNeck();
});

/*Возвращает следующую ноту относительно данной по требуемому интервалу*/
var getNextNote = function(note, distance) {
    let index = sequence.indexOf(note);
    if(distance == 'Т') {
        index+=2;
    } else {
        index++;
    }
    return sequence[ checkIndex(index)];
}

/*Замыкает массив sequence всех нот, чтобы индекс был не больше 12*/
var checkIndex = function (index) {
    while( !(index < 12) ) index -=12;
    return index;
}
