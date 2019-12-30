import createPieceOfState from './create';

const defaultState = {
  strings: 6,
  tuningId: 'Standard',
  scale: {
    tonic: null,
    mode: null,
  },
};

const [createAction, createReducer] = createPieceOfState();

export const setNumberOfStrings = createAction({
  type: 'SET_NUMBER_OF_STRINGS',
  onStart: (state, action) => ({ ...state, strings: action.payload }),
});
export const setTuningId = createAction({
  type: 'SET_TUNING_ID',
  onStart: (state, action) => ({ ...state, tuningId: action.payload }),
});
export const setScaleTonic = createAction({
  type: 'SET_SCALE_TONIC',
  onStart: (state, action) => ({
    ...state,
    scale: {
      ...state.scale,
      tonic: action.payload,
    }}),
});

export default createReducer(defaultState);