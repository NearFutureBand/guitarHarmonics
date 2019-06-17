export const CHANGE_FRET_COUNT = 'CHANGE_FRET_COUNT';

export const changeFretCount = (frets) => {
  return {
    type: CHANGE_FRET_COUNT,
    payload: frets,
  };
};

const initialState = {
  count: 12, 
};

export const FretsReducer = (state = initialState, { type, payload }) => {

  if ( type === CHANGE_FRET_COUNT) {
    return {
      ...state,
      count: payload,
    };
  }

  return state;
};