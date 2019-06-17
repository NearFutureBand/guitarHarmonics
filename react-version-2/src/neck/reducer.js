import axios from 'axios';

export const FETCH_MATRIX_START = 'FETCH_MATRIX_START';
export const FETCH_MATRIX_SUCCESS = 'FETCH_MATRIX_SUCCESS';


export const fetchMatrixSuccess = (result) => {
  return {
    type: FETCH_MATRIX_SUCCESS,
    payload: result,
  };
};
export const fetchMatrixStart = () => ({ type: FETCH_MATRIX_START  });

export const fetchMatrix = (strings, frets, tuning) => {
  // We can invert control here by returning a function - the "thunk".
  // When this function is passed to `dispatch`, the thunk middleware will intercept it,
  // and call it with `dispatch` and `getState` as arguments. 
  // This gives the thunk function the ability to run some logic, and still interact with the store.
  return async (dispatch) => {
    dispatch( fetchMatrixStart() );
    const response = await axios
      .get(`https://guitar-harmonics-api.theflashofsonic.now.sh/api/fretboard`, {
        params: {
          tuning: tuning.id,
          strings,
          frets,
        },
      }).then( res => res.data);
    return dispatch( fetchMatrixSuccess(response) );
  };
};

const initialState = {
  matrix: [],
};

export const NeckReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_MATRIX_SUCCESS:
      return {
        ...state,
        matrix: payload,
      };
    default: return state;
  }
};