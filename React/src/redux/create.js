import axiosInstance from 'api';

const successType = type => `${type}_SUCCESS`;
const startType = type => `${type}_START`;
const failureType = type => `${type}_FAILURE`;

const makeRequest = (type, payload, requestConfig) => {
  return async (dispatch) => {
    dispatch({type: startType(type), payload});

    try {
      const response = await axiosInstance.request(requestConfig);
      return dispatch({
        type: successType(type),
        payload,
        response,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: failureType(type),
        payload,
        error,
      });
    }
  };
};

const createAction = ({
  reducerMap,
  type,
  onStart = (state) => ({ ...state}),
  onSuccess = (state) => ({ ...state}),
  onFailure = (state) => ({ ...state}),
  requestConfig,
}) => {
  const actionCreator = requestConfig ?
    (payload) => makeRequest(type, payload, requestConfig) :
    (payload) => ({type, payload});
  if (requestConfig) {
    reducerMap[startType(type)] = onStart;
    reducerMap[successType(type)] = onSuccess;
    reducerMap[failureType(type)] = onFailure;
  } else {
    reducerMap[`${type}`] = onStart;
  }
  return actionCreator;
};

const createReducer = (defaultState, reducerMap) => {
  return (state = defaultState, action) => {
    console.log(state, action, reducerMap);
    return action.type in reducerMap ?
      reducerMap[action.type](state, action) :
      { ...state};
  };
};

const createPieceOfState = () => {
  const reducerMap = {};
  return [
    (args) => createAction({reducerMap, ...args}),
    (defaultState) => createReducer(defaultState, reducerMap),
  ];
};

export default createPieceOfState;