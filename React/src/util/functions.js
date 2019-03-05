import { tunings } from './tunings';

export const sequence = {
  'en': ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
  'ru': ['До','До#','Рэ','Рэ#','Ми','Фа','Фа#','Соль','Соль#','Ля','Ля#','Си']
}
const minorHarmonicRule = 'WHWWHWW';
const majorHarmonicRule = 'WWHWWWH';

/*const translations = {
  'C': 'До',
  'C#': 'До#',
  'D': 'Рэ',
  'D#': 'Рэ#',
  'E': 'Ми',
  'F': 'Фа',
  'F#': 'Фа#',
  'G': 'Соль',
  'G#': 'Соль#',
  'A' : 'Ля',
  'A#': 'Ля#',
  'B': 'Си'
}*/


export const getNote = ( pos , tuning, lang) => {
    const open = tuning.tuning[pos[0] - 1];
    return sequence['en'][ checkIndex( sequence['en'].indexOf(open) + pos[1] ) ];
}

const getNextNote = (note, distance, lang) => {
    let index = sequence['en'].indexOf(note);
    if(distance == 'W') {
        index+=2;
    } else {
        index++;
    }
    return sequence['en'][ checkIndex(index)];
}

const checkIndex = (index) => {
    while( !(index < 12) ) index -=12;
    return index;
}

export const getTuningByName = name => tunings.find(x => x.name === name);

export const findHarmonic = (root, scale) => {
    let selection = {};
    let currentNote = root,
    rule = (scale == 'Minor') ? minorHarmonicRule : majorHarmonicRule;
    
    selection[currentNote] = true;
    for( let i = 0; i < rule.length; i++) {
        currentNote = getNextNote(currentNote, rule[i]);
        selection[currentNote] = true;
    }
    return selection;
}