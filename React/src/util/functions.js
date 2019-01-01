import { tunings } from './tunings';

export const sequence = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const minorHarmonicRule = 'THTTHTT';
const majorHarmonicRule = 'TTHTTTH';

export const getNote = ( pos , tuning) => {
    const open = tuning.tuning[pos[0] - 1];
    return sequence[ checkIndex( sequence.indexOf(open) + pos[1] ) ];
}

const getNextNote = (note, distance) => {
    let index = sequence.indexOf(note);
    if(distance == 'T') {
        index+=2;
    } else {
        index++;
    }
    return sequence[ checkIndex(index)];
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