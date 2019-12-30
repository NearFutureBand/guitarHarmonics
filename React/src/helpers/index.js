import { SEQUENCE } from 'consts';

export const getStringsSelectorValues = (tunings, tuningId) => {
  const minStrings = 2;
  return tuningId in tunings ? 
    Array.from(
      new Array(tunings[tuningId].maxStrings - minStrings + 1),
      (item, i) => ({
        label: `${minStrings + i}`,
        value: minStrings + i,
      }),
    ) : [];
};

export const convertScaleModesForSelector = (scales) => {
  const values = Object.values(scales).map(item => ({
    label: item.name,
    value: item.id,
  }));
  values.unshift({label: '-', value: null});
  return values;
};

export const convertTuningListForPicker = (tunings) => {
  return Object.values(tunings).map(item => ({
    label: item.name,
    value: item.id,
  }));
};

export const convertNoteSequenceForPicker = () => {
  const values = SEQUENCE.map(item => ({
    label: item,
    value: item,
  }));
  values.unshift({label: '-', value: null});
  return values;
};


export const convertTuningFormulaToZeroFrets = (tuning, strings) => {
  let tuningData = tuning.slice(0, strings).map((note, i) => note);
  tuningData.push('0');
  console.log(tuning, strings, tuningData);
  return tuningData;
};