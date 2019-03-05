import { CHANGE_LANGUAGE } from '../actions';

const defaultState = {
  language: 'en'
}

export default function(state = defaultState, action) {
  if( action.type === CHANGE_LANGUAGE) {
    return {
      ...state,
      language: action.payload.language
    };
  }

  return state;
}