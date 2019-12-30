import { combineReducers } from 'redux';

import NeckReducer from '../redux/Neck';
import TuningsReducer from '../redux/Tunings';
import ScalessReducer from './ScalesReducer';

export default combineReducers({
  neck: NeckReducer,
  tunings: TuningsReducer,
  scales: ScalessReducer,
});
