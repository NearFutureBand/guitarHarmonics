import axios from 'axios';
import createAction from './actionCreator';

export const changeNumberOfStrings = createAction('CHANGE_NUMBER_OF_STRINGS');


export const FETCH_MATRIX_START = 'FETCH_MATRIX_START';
export const FETCH_MATRIX_SUCCESS = 'FETCH_MATRIX_SUCCESS';

export const fetchMatrixSuccess = (result) => {
  return {
    type: FETCH_MATRIX_SUCCESS,
    payload: result,
  };
};
export const fetchMatrixStart = () => ({ type: FETCH_MATRIX_START });

export const fetchMatrix = (strings, frets, tuning) => {
  return async (dispatch) => {
    dispatch(fetchMatrixStart());
    const response = await axios
      .get(`https://guitar-harmonics-api.theflashofsonic.now.sh/api/fretboard`, {
        params: {
          tuning: tuning.id,
          strings,
          frets,
        },
      }).then(res => res.data);
    return dispatch(fetchMatrixSuccess(response));
  };
};