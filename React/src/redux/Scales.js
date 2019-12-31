import createPieceOfState from './create';

const [createAction, createReducer] = createPieceOfState();

export const getAllScales = createAction({
  type: 'GET_ALL_SCALES',
  onSuccess: (state, action) => {
    return { ...state, scales: action.response.data };
  },
  requestConfig: () => ({
    url: 'scales',
    headers: {},
    method: 'get',
  }),
});

const ScalesReducer = createReducer({ scales: {} });
export default ScalesReducer;