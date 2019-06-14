import axios from 'axios';

export const CHANGE_TUNING = 'CHANGE_TUNING';
export const SET_DEFAULT_TUNING = 'SET_DEFAULT_TUNING';
export const FETCH_TUNINGS_START = 'FETCH_TUNINGS_START';
export const FETCH_TUNINGS_SUCCESS = 'FETCH_TUNINGS_SUCCESS';

export const changeTuning = (tuningId) => {
  return {
    type: CHANGE_TUNING,
    payload: tuningId,
  };
};
export const setDefautlTuning = () => {
  return {
    type: SET_DEFAULT_TUNING,
  };
};
export const fetchTuningsStart = () => ({ type: FETCH_TUNINGS_START });
export const fetchTuningsSuccess = (tunings) => ({
  type: FETCH_TUNINGS_SUCCESS,
  payload: tunings,
});

export const fetchTunings = () => {
  return async (dispatch) => {
    dispatch(fetchTuningsStart());
    const response = await axios
      .get(`https://guitar-harmonics-api.theflashofsonic.now.sh/api/tunings`)
      .then(res => res.data);
    return dispatch(fetchTuningsSuccess(response));
  };  
};


//import { tunings } from '../util/tunings';
//import { getTuningByName } from '../util/functions';

const initialState = {
  tuningId: 'Standard',
  tuning: {},
  tunings: {},
};

export const TuningReducer = (state = initialState, { type, payload }) => {
  console.log(type, payload);
  switch (type) {

    case FETCH_TUNINGS_START:
      return state;
    case FETCH_TUNINGS_SUCCESS:
      return {
        ...state,
        tunings: payload,
      };


    case CHANGE_TUNING:
      return state;
    default: return state;
  }
};