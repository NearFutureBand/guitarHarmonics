import {FETCH_MATRIX_SUCCESS} from 'actions';

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
    default: return state;
  }
};

export default NeckReducer;