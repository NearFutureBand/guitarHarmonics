import { tunings } from './tunings';

export const sequence = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

export const getNote = ( pos , tuning) => {
    const open = tuning.tuning[pos[0] - 1];
    return sequence[ checkIndex( sequence.indexOf(open) + pos[1] ) ];
}

function getNextNote(note, distance) {
    let index = sequence.indexOf(note);
    if(distance == 'Т') {
        index+=2;
    } else {
        index++;
    }
    return this.noteSequence[ this.checkIndex(index)];
}

function checkIndex(index) {
    while( !(index < 12) ) index -=12;
    return index;
}

export const getTuningByName = name => tunings.find(x => x.name === name);