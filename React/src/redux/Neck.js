import createPieceOfState from './create';

const defaultState = {
  matrix: [],
  frets: 24,
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
export const setScaleMode = createAction({
  type: 'SET_SCALE_MODE',
  onStart: (state, action) => ({
    ...state,
    scale: {
      ...state.scale,
      mode: action.payload,
    }}),
});
export const setNumberOfFrets = createAction({
  type: 'SET_NUMBER_OF_FRETS',
  onStart: (state, action) => ({ ...state, frets: action.payload }),
});
export const updateMatrix = createAction({
  type: 'UPDATE_MATRIX',
  onSuccess: (state, action) => ({ ...state, matrix: action.response.data }),
  requestConfig: (params) => ({
    url: 'matrix',
    headers: {},
    method: 'get',
    params,
  }),
});

export default createReducer(defaultState);