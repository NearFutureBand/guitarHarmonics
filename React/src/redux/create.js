const createAction = (
  reducerMap,
  type,
  onStart,
  onSuccess,
  onFailure
) => {
  const actionCreator = (payload) => ({ type, payload});
  reducerMap[`${type}`] = onStart;
  return actionCreator;
};

const createReducer = (defaultState, reducerMap) => {
  return (state = defaultState, action) => {
    return action.type in reducerMap ?
      reducerMap[action.type](state, action) :
      { ...state};
  };
};

export const createPieceOfState = () => {
  const reducerMap = {};
  return [
    (type, onStart, onSuccess, onFailure) => createAction(reducerMap, type, onStart, onSuccess, onFailure),
    (defaultState) => createReducer(defaultState, reducerMap),
  ];
};