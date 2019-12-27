import createAction from './actionCreator';
export * from './NeckActions';


export const getAllTuningsRequest = createAction('GET_ALL_TUNINGS_REQUEST');
export const getAllScalesRequest = createAction('GET_ALL_SCALES_REQUEST');