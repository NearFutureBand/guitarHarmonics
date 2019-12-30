import createPieceOfState from './create';

const [createAction, createReducer] = createPieceOfState();

export const getAllScales = createAction({
  type: 'GET_ALL_SCALES',
  onSuccess: (state, action) => ({ ...state, scales: action.response.data }),
  requestConfig: {
    url: 'scales',
    headers: {},
    method: 'get',
  },
});

export default createReducer({ scales: {}});