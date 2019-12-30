import { createPieceOfState } from './create';

const defaultState = {
  strings: 6,
  tuningId: 'Standard',
};


const [createAction, createReducer] = createPieceOfState();



export const setNumberOfStrings = createAction(
  'SET_NUMBER_OF_STRINGS',
  (state, action) => ({ ...state, strings: action.payload })
);
export const setTuningId = createAction(
  'SET_TUNING_ID',
  (state, action) => ({ ...state, tuningId: action.payload })
);

export default createReducer(defaultState);