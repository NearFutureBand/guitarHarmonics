import { combineReducers } from 'redux';

import NeckReducer from './NeckReducer';
import TuningsReducer from './TuningsReducer';
import ScalessReducer from './ScalesReducer';

export default combineReducers({
  neck: NeckReducer,
  tunings: TuningsReducer,
  scales: ScalessReducer,
});
