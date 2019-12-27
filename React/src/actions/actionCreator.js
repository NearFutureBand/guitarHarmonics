import axiosInstance from 'api';
import actionParams from 'api/actionParams';

const createActionTypes = (type) => {
  return {
    start: `${type}_START`,
    success: `${type}_SUCCESS`,
    failure: `${type}_FAILURE`,
  };
};

const createAction = (type) => {
  return /_REQUEST$/.test(type) ? {
    type,
    ...createActionTypes(type),
    call: (payload) => {
      return async (dispatch) => {
        dispatch({ type: `${type}_START` });

        // get token if we have
    
        const config = actionParams[type];
        const response = await axiosInstance.request(config);
        return dispatch({
          type: `${type}_SUCCESS`,
          payload: response.data,
        });
      };
    },
  } : {
    type,
    call: (payload) => {
      return { type, payload};
    }};
};


export const makeRequest = () => {
  

  // dispatch START action

  // create try - catch block

  // request()

  // catch goes here - dispatch FAILURE ACTION

  // console.log(err)
};

export default createAction;