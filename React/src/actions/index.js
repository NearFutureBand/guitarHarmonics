import Axios from 'axios';

export * from './NeckActions';

export const GET_ALL_TUNINGS_START = 'GET_ALL_TUNINGS_START';
export const GET_ALL_TUNINGS_SUCCESS = 'GET_ALL_TUNINGS_SUCCESS';
export const GET_ALL_TUNINGS_FAILURE = 'GET_ALL_TUNINGS_FAILURE';

export const getAllTunings = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_TUNINGS_START });

    const response = await Axios.get(`https://guitar-harmonics-api.theflashofsonic.now.sh/api/tunings`);
    return dispatch({ type: GET_ALL_TUNINGS_SUCCESS, payload: response.data});
  };
};