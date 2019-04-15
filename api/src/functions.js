const tunings = require('./tunings.json');
const sequence = require('./sequence.json');
const SCALES = require('./scales.json');

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

/**
 * Returns a one note with given coordinates on a fretboard
 * @param {Array} pos [0] - string number (from 1 to N), [1] - fret number (from 0 to N) 
 * @param {*} tuning what's the type?
 * @param {String} lang
 */
const getNote = ( pos , tuning, lang) => {
  const open = tuning.tuning[pos[0] - 1];
  return sequence['en'][ checkIndex( sequence['en'].indexOf(open) + pos[1] ) ];
}

/**
 * Returns a note that is on the distance from the given note
 * @param {String} note name of the note the step is made from
 * @param {String} distance W (whole step) or H (half step) 
 * @param {String} lang
 */
const getNextNote = (note, distance, lang) => {
  let index = sequence['en'].indexOf(note);
  if(distance == 'W') {
      index+=2;
  } else {
      index++;
  }
  return sequence['en'][ checkIndex(index)];
}
/**
 * Makes sure that there's no access to a 13'th note :)
 * @param {*} index 
 */
const checkIndex = (index) => {
  while( !(index < 12) ) index -=12;
  return index;
}

/**
 * Returns a collection of notes that are in the requested harmonic 
 * @param {String} root main note of the harmonic
 * @param {String} scale the id of the scale (using as a key in the json)
 */
const findHarmonic = ({ root, scale }) => {
  let selection = {};
  let currentNote = root;
  const rule = SCALES[scale].formula;

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
  findHarmonic,
  createFretMatrix
}