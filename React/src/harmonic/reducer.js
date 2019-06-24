import axios from 'axios';

export const CHANGE_HARMONIC = 'CHANGE_HARMONIC';
export const FETCH_HARMONICS_START = 'FETCH_HARMONICS_START';
export const FETCH_HARMONICS_SUCCESS = 'FETCH_HARMONICS_SUCCESS';
export const FIND_HARMONIC_SUCCESS = 'FIND_HARMONIC_SUCCESS';
export const RESET_HARMONIC = 'RESET_HARMONIC';

export const fetchHarmonicsStart = () => ({ type: FETCH_HARMONICS_START });
export const fetchHarmonicsSuccess = (harmonics) => ({
  type: FETCH_HARMONICS_SUCCESS,
  payload: harmonics,
});
export const changeHarmonic = (chosenHarmonic) => ({
  type: CHANGE_HARMONIC,
  payload: chosenHarmonic,
});
export const findHarmonicSuccess = (selection) => ({
  type: FIND_HARMONIC_SUCCESS,
  payload: selection,
});
export const resetHarmonic = () => ({ type: RESET_HARMONIC });

export const fetchHarmonics = () => {
  return async (dispatch) => {
    dispatch(fetchHarmonicsStart());
    const response = await axios
      .get(`https://guitar-harmonics-api.theflashofsonic.now.sh/api/scales`)
      .then(res => res.data);
    return dispatch( fetchHarmonicsSuccess(response) );
  };
};
export const findHarmonic = (harmonic) => {
  return async (dispatch) => {
    const response = await axios
      .get(`https://guitar-harmonics-api.theflashofsonic.now.sh/api/harmonics`, {
        params: {
          root: harmonic.root,
          scale: harmonic.scale,
        },
      })
      .then(res => res.data);
    return dispatch( findHarmonicSuccess(response) );
  };
};

const initialState = {
  harmonic: {
    root: null,
    scale: null,
  },
  selection: {},
  harmonics: null,
};

export const HarmonicsReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case FETCH_HARMONICS_START:
      return state;
    case FETCH_HARMONICS_SUCCESS:
      return {
        ...state,
        harmonics: payload,
      };

    case CHANGE_HARMONIC:
      return {
        ...state,
        harmonic: payload,
      };

    case FIND_HARMONIC_SUCCESS:
      return {
        ...state,
        selection: payload,
      };

    case RESET_HARMONIC:
      return {
        ...state,
        selection: {},
      };

    default: return state;
  }
};