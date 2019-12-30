import { getAllScalesRequest } from 'actions';

const initialState = {
  scales: {},
};

const ScalesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case getAllScalesRequest.success:
      return {
        ...state,
        scales: payload,
      };
    default: return state;
  }
};

export default ScalesReducer;