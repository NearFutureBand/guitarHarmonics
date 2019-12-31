import axiosInstance from 'api';

const successType = type => `${type}_SUCCESS`;
const startType = type => `${type}_START`;
const failureType = type => `${type}_FAILURE`;

const makeRequest = (
  type,
  payload,
  requestConfig,
  onSuccessCallback,
  onFailureCallback
) => {
  return async (dispatch) => {
    dispatch({type: startType(type), payload});

    try {
      const response = await axiosInstance.request(requestConfig(payload));
      dispatch({
        type: successType(type),
        payload,
        response,
      });
      if (onSuccessCallback) {
        onSuccessCallback(dispatch);
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: failureType(type),
        payload,
        error,
      });
      if (onFailureCallback) {
        onFailureCallback(dispatch);
      }
    }
  };
};

const createAction = ({
  reducerMap,
  type,
  onStart = (state) => ({ ...state}),
  onSuccess = (state) => ({ ...state}),
  onSuccessCallback,
  onFailure = (state) => ({ ...state}),
  onFailureCallback,
  requestConfig,
}) => {
  const actionCreator = requestConfig ?
    (payload) => makeRequest(
      type,
      payload,
      requestConfig,
      onSuccessCallback,
      onFailureCallback
    ) :
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