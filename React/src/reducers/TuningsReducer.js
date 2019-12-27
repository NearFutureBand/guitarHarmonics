
import { getAllTuningsRequest } from 'actions';

const initialState = {
  tunings: {},
};

const TuningsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case getAllTuningsRequest.success:
      return {
        ...state,
        tunings: payload,
      };
    default: return state;
  }
};

export default TuningsReducer;