import axios from 'axios';

export const FETCH_MATRIX = 'FETCH_MATRIX'; 
export const FETCH_MATRIX_SUCCESS = 'FETCH_MATRIX_SUCCESS';

export const fetchMatrixSuccess = (result) => {
  return {
    type: FETCH_MATRIX_SUCCESS,
    payload: result,
  };
};

export const fetchMatrix = (strings, frets, tuning) => {
  // We can invert control here by returning a function - the "thunk".
  // When this function is passed to `dispatch`, the thunk middleware will intercept it,
  // and call it with `dispatch` and `getState` as arguments. 
  // This gives the thunk function the ability to run some logic, and still interact with the store.
  return async (dispatch) => {
    const response = await axios
      .get(`https://guitar-harmonics-api.theflashofsonic.now.sh/api/fretboard`, {
        params: {
          tuning: 'Standard',
          strings: 6,
          frets: 12,
        },
      }).then( res => res.data);
    return dispatch( fetchMatrixSuccess(response));
  };
};

const initialState = {
  matrix: [],
};

export const NeckReducer = (state = initialState, {type, payload}) => {
  if (type === FETCH_MATRIX_SUCCESS) {
    return state;
  }

  return state;
};