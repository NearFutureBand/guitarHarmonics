const METHODS = {
  get: 'get',
  post: 'post',
};

export default {
  'GET_ALL_TUNINGS_REQUEST': () => ({
    url: 'tunings',
    headers: {},
    method: METHODS.get,
  }),
  'GET_ALL_SCALES_REQUEST': () => ({
    url: 'scales',
    headers: {},
    method: METHODS.get,
  }),
  'UPDATE_MATRIX_REQUEST': (params) => ({
    url: 'fretboard',
    headers: {},
    method: METHODS.get,
    params,
  }),
};