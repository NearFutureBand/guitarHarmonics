import {
  getStringsSelectorValues,
  convertTuningListForPicker,
  convertTuningFormulaToZeroFrets,
} from 'helpers';

export const getTunings = (state) => state.tunings.tunings;
export const getStringNumberOptions = (state, tuningId) => {
  return getStringsSelectorValues(getTunings(state), tuningId);
};

export const getTuningsOptions = state => {
  return convertTuningListForPicker(getTunings(state));
};

export const getTuningById = (state, id) => {
  const tunings = getTunings(state);
  return id in tunings ? tunings[id] : null;
};
export const getTuning = state => {
  return getTuningById(state, state.neck.tuningId);
}; 
export const getTuningName = (state, id) => {
  const tuning = getTuningById(state, id);
  return tuning ? tuning.name : '';
};
export const getZeroFretNotes = (state) => {
  const tuning = getTuning(state);
  return tuning ? convertTuningFormulaToZeroFrets(tuning.tuning, state.neck.strings) : [];
};