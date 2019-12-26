import {GET_ALL_TUNINGS_SUCCESS} from 'actions';

const initialState = {
  tunings: {},
};

const TuningsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_TUNINGS_SUCCESS:
      return {
        ...state,
        tunings: payload,
      };
    default: return state;
  }
};

export default TuningsReducer;