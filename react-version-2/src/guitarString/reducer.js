import { CHANGE_TUNING } from '../tuning/reducer';
export const CHANGE_STRING_COUNT = 'CHANGE_STRING_COUNT';

export function changeStringCount(count, currentTuning) {
  return {
    type: CHANGE_STRING_COUNT,
    payload: {
      count,
      currentTuning,
    },
  };
}

const initialState = {
  count: 6,
};

export const StringsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case CHANGE_STRING_COUNT:
      const { count, currentTuning } = payload;
      const newStringsCount =
        ( !currentTuning.maxStrings && currentTuning.maxStrings >= count) ?
          count :
          currentTuning.maxStrings;
      return {
        ...state,
        count: newStringsCount,
      };

    case CHANGE_TUNING:
      return {
        ...state,
        count: payload.defaultStrings,
      };

    default: return state;
  }

  
};