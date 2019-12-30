import createPieceOfState from './create';

const [createAction, createReducer] = createPieceOfState();

/*export const getAllTunings = createAction({
  type: 'GET_ALL_TUNINGS',
  onSuccess: (state, action) => ({ ...state, tunings: action.response.data }),
  requestConfig: {
    url: 'tunings',
    headers: {},
    method: 'get',
  },
});*/

export default createReducer({ tunings: {}});