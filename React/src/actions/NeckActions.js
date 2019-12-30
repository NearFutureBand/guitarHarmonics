import createAction from './actionCreator';

export const changeNumberOfStrings = createAction('CHANGE_NUMBER_OF_STRINGS');
export const changeNumberOfFrets = createAction('CHANGE_NUMBER_OF_FRETS');
export const updateMatrixRequest = createAction('UPDATE_MATRIX_REQUEST');
export const setTuningId = createAction('SET_TUNING_ID');
export const setScaleTonic = createAction('SET_SCALE_TONIC');
export const setScaleMode = createAction('SET_SCALE_MODE');
