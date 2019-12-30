import {
  changeNumberOfStrings,
  updateMatrixRequest,
  setTuningId,
  setScaleMode,
  setScaleTonic,
} from 'actions';

const initialState = {
  matrix: [],
  matrixLoading: false,
  frets: 24,
  strings: 6,
  tuningId: 'Standard',
  scale: {
    tonic: null,
    mode: null,
  },
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
    case setTuningId.type:
      return {
        ...state,
        tuningId: payload,
      };
    case setScaleTonic.type:
      return {
        ...state,
        scale: {
          ...state.scale,
          tonic: payload,
        },
      };
    case setScaleMode.type:
      return {
        ...state,
        scale: {
          ...state.scale,
          mode: payload,
        },
      };
    default: return state;
  }
};

export default NeckReducer;