export const CHANGE_STRING_COUNT = 'CHANGE_STRING_COUNT';

export function changeStringCount(strings, currentTuning) {
  return {
    type: CHANGE_STRING_COUNT,
    payload: {
      strings,
      currentTuning,
    },
  };
}

const initialState = {
  count: 6,
};

export const StringsReducer = (state = initialState, {type, payload}) => {

  if (type === CHANGE_STRING_COUNT) {
    const { count, currentTuning } = payload;
    const newStringsCount =
      ( !currentTuning.maxStrings && currentTuning.maxStrings >= count) ?
        currentTuning.defaulStrings :
        count;
    return {
      ...state,
      count: newStringsCount,
    };
  }

  return state;
};