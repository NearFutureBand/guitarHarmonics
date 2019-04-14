const tunings = require('./tunings.json');
const sequence = require('./sequence.json');

const minorHarmonicRule = 'WHWWHWW';
const majorHarmonicRule = 'WWHWWWH';
const locrianRule = 'HWWHWWW';
const phrygianRule = 'HWWWHWW';

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


const getNote = ( pos , tuning, lang) => {
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

const getTuningByName = name => tunings.find(x => x.name === name);

const findHarmonic = (root, scale) => {
  let selection = {};
  let currentNote = root, rule = '';
  switch(scale) {
      case 'Minor': rule = minorHarmonicRule;
      case 'Major': rule = majorHarmonicRule;
      case 'Locrian': rule = locrianRule;
      case 'Phrygian': rule = phrygianRule;
  }
  
  selection[currentNote] = true;
  for( let i = 0; i < rule.length; i++) {
      currentNote = getNextNote(currentNote, rule[i]);
      selection[currentNote] = true;
  }
  return selection;
}

const createFretMatrix = ({ frets, strings, tuning }) => {
  let matrix = [], i = 0, j = 0;
  for(i = 0; i <= strings; i++) {
    matrix.push([]);
    for( j = 0; j <= frets; j++) {

      // if it's a zeroth string - there are numbers
      if(i == 0) matrix[i].push(j);
      else {

        // if it's a zeroth fret - open note. Getting it from the tuning
        if( j == 0) matrix[i].push(tuning[i-1]);
        else matrix[i].push( getNextNote(matrix[i][j-1], 'H' ) );
      }
    }
  }
  return matrix;
}

module.exports = {
  getNote,
  getNextNote,
  checkIndex,
  getTuningByName,
  findHarmonic,
  createFretMatrix
}