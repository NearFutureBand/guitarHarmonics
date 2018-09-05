/*Полная последовательность нот*/
//let sequence = ["До","До#","Рэ","Рэ#","Ми","Фа","Фа#","Соль","Соль#","Ля","Ля#","Си"];
let sequence = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
/*Правило минорной гаммы*/
let minorHarmRule = "ТПТТПТТ";
/*Правило мажорной гаммы*/
let majorHarmRule = "ТТПТТТП";
/*Открытые ноты на грифе гитары начиная с первой*/
//let zeroFretNotes = ["Ми","Си","Соль","Рэ","Ля","Ми"];
let defaultTuning = ["E","B","G","D","A","E","B","G"];
let zeroFretNotes; //= ["E","B","G","D","A","E","B"];
/*Максимальное число отображаемых ладов (12-30)*/
let maxFret = 20;
/*Ширина контейнера для грифа - для адаптивности*/
let screenWidth;
/*Ширина одного лада - вычисляется относительно ширины экрана*/
let fretWidth;
/*Коэффициент для расчёта радиуса точки-подсветки лада*/
let lightRadiusRate = 2.5;
/*Минимальная ширина контейнера для нормального отображения грифа*/
let minWidth = 800;



//TODO: languages


window.onload = function() {
    
    //установка количества струн по уолчанию - там внутри есть отрисовка
    changeStringCount(7);
    
    //Установка выпадающих меню на основе существующих массивов
    setHTMLSelectors();
    
    document.getElementById('count-of-frets').value = maxFret-1;
    document.getElementById('string-count').value = 7;
    
    //console.log( document.getElementsByTagName('nav')[0].scrollHeight);
}
window.onresize = function() {
    redrawNeck();
};

/*Добавление HTML контента и управляющих элементов*/
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
    screenWidth = window.innerWidth >= minWidth ? window.innerWidth * 0.99 : minWidth;
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
var setDynamicStyles = function() {
    
    //Настройка ширины ладов
    Array.from(document.querySelectorAll('.fret')).forEach( function(item) {
        item.style.width = fretWidth+'px';
        item.style.paddingTop = fretWidth/2;
    });
    //Настройка размеров подсветки ладов
    
    Array.from( document.querySelectorAll('.light')).forEach( function(item) {
        item.style.width = fretWidth/lightRadiusRate+'px';
        item.style.height = fretWidth/lightRadiusRate+'px';
        item.style.borderRadius = fretWidth+'px';
        item.style.zIndex = 0;
        item.style.left = (fretWidth/2 - fretWidth/lightRadiusRate/2)+'px';
    });
    
    //Имитация струн и разделителей ладов
    Array.from(document.querySelectorAll('.string:first-child .fret')).forEach( function(item) {
        item.style.paddingTop = 0;    
    });
}

/*Устанавливает контейнеры-строки (струны)*/
var setRows = function() {
    setFretNumbers();    
    zeroFretNotes.forEach(function(item,i){ 
        let string = document.createElement('div');
        string.className = 'string';
        string.id = 'string-' + (i+1);
        string.innerHTML = '<div class="fret">'+item+'</div>';
        document.getElementById('neck').appendChild(string);
    });
}

/*Установка номеров ладов*/
var setFretNumbers = function() {
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
}

/*Рисует все ноты на грифе до лада maxFret*/
var setNeck = function() {
    zeroFretNotes.forEach(function(item,I) {
        let index = sequence.indexOf(item);
        
        for(let i = 1; i < maxFret; i++) {
            let fret = document.createElement('div');
            fret.className = 'fret';
            fret.setAttribute('data-note', sequence[ checkIndex( i + index)]);
            fret.innerHTML = '<span class="light"></span><span class="note">' + String( sequence[ checkIndex( i + index)] ) + '</span>';
            document.getElementById('string-'+(I+1)).appendChild(fret);
        }
    });
}

/*Подсвечивает все ноты, которые находятся в массиве selection*/
var lightUpNotes = function(selection) {
    Array.from(document.querySelectorAll('.light')).forEach( function(item) {
        item.style.backgroundColor = 'transparent';
    });
    
    selection.forEach( function(item){
        Array.from(document.querySelectorAll('[data-note="'+item+'"]>span.light')).forEach( function(item) {
            item.style.backgroundColor = 'yellow';
        });
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


/*EVENTS*/

/*Событие вызова новой гаммы*/
Array.from(document.querySelectorAll('#harmonic-note, #harmonic-type')).forEach( function(item) {
    item.addEventListener("change", function() {
        let harmonicNote = document.getElementById('harmonic-note').value;
        let harmonicType = document.getElementById('harmonic-type').value;
        console.log('as');
        findHarmonic(harmonicNote, harmonicType);
    });
});

//Событие запроса изменения количества отображаемых ладов
document.getElementById('count-of-frets').addEventListener('change', function() {
    maxFret = Number(document.getElementById('count-of-frets').value) + 1;
    drawScheme();
    redrawNeck();
});

//Кнопка "очистить"
document.getElementById('button-clear').addEventListener('click', function() {
    $('.light').css('background-color', 'transparent');
});

document.getElementById('string-count').addEventListener('change', function() {
    changeStringCount(this.value);
});

/*OTHER*/

var changeStringCount = function(value) {
    zeroFretNotes = defaultTuning.slice(0, value);
    drawScheme();
    redrawNeck();
}

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
