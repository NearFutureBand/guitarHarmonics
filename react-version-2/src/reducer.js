import { combineReducers } from 'redux';

import { StringsReducer } from './guitarString/reducer';
import { FretsReducer } from './fret/reducer';
import { NeckReducer } from './neck/reducer';
/*import TuningReducer from './TuningReducer';
import HarmonicReducer from './HarmonicReducer';
import SystemReducer from './SystemReducer';
*/

export default combineReducers({
  strings: StringsReducer,
  frets: FretsReducer,
  neck: NeckReducer,
});

