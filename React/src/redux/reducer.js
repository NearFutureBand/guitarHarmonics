import { combineReducers } from 'redux';

import NeckReducer from './Neck';
import TuningsReducer from './Tunings';
import ScalesReducer from './Scales';

export default combineReducers({
  neck: NeckReducer,
  tunings: TuningsReducer,
  scales: ScalesReducer,
});
