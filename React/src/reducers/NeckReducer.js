import {changeNumberOfStrings, updateMatrixRequest} from 'actions';

const initialState = {
  matrix: [],
  matrixLoading: true,
  frets: 24,
  strings: 6,
  tuningId: 'Standard',
};

const NeckReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case changeNumberOfStrings.type:
      return {
        ...state,
        strings: payload,
      };
    case updateMatrixRequest.success:
      return {
        ...state,
        matrix: payload,
      };
    default: return state;
  }
};

export default NeckReducer;