import {FETCH_MATRIX_SUCCESS, changeNumberOfStrings} from 'actions';

const initialState = {
  matrix: [],
  matrixLoading: true,
  frets: 24,
  strings: 6,
  tuningId: 'Standard',
};

const NeckReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MATRIX_SUCCESS:
      return {
        ...state,
        matrix: payload,
        matrixLoading: false,
      };
    case changeNumberOfStrings.type:
      return {
        ...state,
        strings: payload,
      };
    default: return state;
  }
};

export default NeckReducer;