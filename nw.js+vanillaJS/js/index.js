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
/*Высота одного лада - вычисляется относительно ширины*/
let fretHeight;
/*Текущий размер шрифта в пикселях*/
let fontSize = 10;
/*Коэффициент для расчёта радиуса точки-подсветки лада*/
let lightRadiusRate = 2.5;
/*Минимальная ширина контейнера для нормального отображения грифа*/
let minWidth = 800;

let defaultCountOfStrings = 7;


//TODO:
//написать единую функцию отрисовки с параметрами: количество струн
//инкапсуляция, проверить нижние уровни
//сделать единый объект neck (можно класс) и все глоб. переменные сделать его свойствами
//гриф на svg графику (использовать имена string и fret вместо row и т.д.)
//

//languages
//Наиболее часто выбираемые гаммы помещать в списке выше
//стили для селекторов - переделать в div и обычные popup
//открытые ноты не подчиняются общим стилям - обобщить алгоритм
//номерам ладов тоже нужна подстройка стилей


window.addEventListener('load', function() {
    
    //вызов отрисовки грифа
    initGuitarHarmonics(defaultCountOfStrings);
    
    //Установка выпадающих меню на основе существующих массивов
    setHTMLSelectors();
    
    //Установка дефолтных значений в выпадающие меню
    document.getElementById('count-of-frets').value = maxFret - 1;
    document.getElementById('string-count').value = defaultCountOfStrings;
    document.getElementById('harmonic-note').value = '-';
    
    //Подстройка стилей
    redrawNeck();
});

window.addEventListener('resize', function() {
    redrawNeck();
});

var initGuitarHarmonics = function(countOfStrings) {
    
    //Обрезка массива открытых нот под заданное количество струн
    zeroFretNotes = defaultTuning.slice(0, countOfStrings);
    
    //Отрисовка базовой схемы
    drawScheme();
}

/*Добавление HTML контента и управляющих элементов*/
var setHTMLSelectors = function() {
    let target = document.getElementById('harmonic-note');
    
    //Установка пунктов меню "выбор тоники гаммы"
    let op;
    sequence.forEach( function(item, i) {
        op = document.createElement('option');
        if( i == 0 ) {
            op.innerHTML = "-";
            target.appendChild(op);
            op = document.createElement('option');
        }
        op.innerHTML = item;
        target.appendChild(op);
    });
    
    //Установка пунктов меню "выбор количества ладов"
    for(let i = 12; i < 25 ; i++) {
        op = document.createElement('option');
        op.innerHTML = i;
        document.getElementById('count-of-frets').appendChild(op);
    }
}

/*Перерисовывает всю схему под новое количество струн и заново устанавливат выбранную ранее гамму*/
var changeStringCount = function(value) {
    zeroFretNotes = defaultTuning.slice(0, value);
    drawScheme();
    redrawNeck();
    setHarmonic();
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

/*Установка ширин и высот для ячеек с нотами
** изменяет:
* ширину ладов
* размер шрифта
* размер подсветок ладов
* 
Оптимизировать селектор*/
var setDynamicStyles = function() {
    
    //Настройка ширины ладов
    Array.from(document.querySelectorAll('.fret')).forEach( function(item) {
        item.style.width = fretWidth+'px';
        item.style.paddingTop = fretWidth/2;
        item.style.height = fretHeight+'px';
    });
    
    //Настройка размеров шрифта
    Array.from(document.querySelectorAll('.note')).forEach( function(item) {
        item.style.fontSize = fontSize + 'px';
    });
    
    //Позиционирование текста - WTF?
    
    //Настройка размеров подсветки ладов
    Array.from( document.querySelectorAll('.light')).forEach( function(item) {
        item.style.width = fretWidth/lightRadiusRate+'px';
        item.style.height = fretWidth/lightRadiusRate+'px';
        item.style.borderRadius = fretWidth+'px';
        item.style.zIndex = 0;
        item.style.left = (fretWidth/2 - fretWidth/lightRadiusRate/2)+'px';
        item.style.top = fontSize + 'px';
    });
}

/*Возвращает массив нот входящих в заданную гамму*/
var findHarmonic = function(note, type) {
    let selection = [];
    if( note != '-') {
        let currentNote = note;
        let rule = (type == 'Minor') ? minorHarmRule : majorHarmRule;
        
        for( let i = 0; i < rule.length; i++) {
            currentNote = getNextNote(currentNote,rule[i]);  
            selection.push(currentNote);
        }
    }
    lightUpNotes(selection);   
}


/*EVENTS*/

/*Событие вызова новой гаммы*/
Array.from(document.querySelectorAll('#harmonic-note, #harmonic-type')).forEach( function(item) {
    item.addEventListener("change", function() {
        setHarmonic();
    });
});

/*Функция получения данных из формы для подсветки новой гаммы*/
var setHarmonic = function() {
    let harmonicNote = document.getElementById('harmonic-note').value;
    let harmonicType = document.getElementById('harmonic-type').value;
    findHarmonic(harmonicNote, harmonicType);
}

/*Событие запроса изменения количества отображаемых ладов*/
document.getElementById('count-of-frets').addEventListener('change', function() {
    maxFret = Number(document.getElementById('count-of-frets').value) + 1;
    drawScheme();
    redrawNeck();
});

document.getElementById('string-count').addEventListener('change', function() {
    changeStringCount(this.value);
});





/*OTHER*/

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

/*Получение параметров окна и определение динамической ширины, вычисление зависимых параметров*/
var getScreenParameters = function() {
    screenWidth = window.innerWidth >= minWidth ? window.innerWidth * 0.99 : minWidth;
    fretWidth = screenWidth / maxFret;
    fretHeight = fretWidth * 0.5;
    fontSize = fretHeight / 2.5;
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
/*Рисует все ноты на грифе до лада maxFret*/
var setNeck = function() {
    zeroFretNotes.forEach(function(item,I) {
        let index = sequence.indexOf(item);
        
        for(let i = 1; i < maxFret; i++) {
            let fret = document.createElement('div');
            fret.className = 'fret';
            fret.setAttribute('data-note', sequence[ checkIndex( i + index)]);
            fret.innerHTML = '<div class="light"><span class="note">' + String( sequence[ checkIndex( i + index)] ) + '</span></div>';
            document.getElementById('string-'+(I+1)).appendChild(fret);
        }
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

/*Подсвечивает все ноты, которые находятся в массиве selection*/
var lightUpNotes = function(selection) {
    Array.from(document.querySelectorAll('.light')).forEach( function(item) {
        item.style.backgroundColor = 'transparent';
    });
    
    if( selection != []) {
        selection.forEach( function(item){
            Array.from(document.querySelectorAll('[data-note="'+item+'"]>.light')).forEach( function(item) {
                item.style.backgroundColor = 'yellow';
            });
        });
    }     
}

