import { combineReducers } from 'redux';

import NeckReducer from './NeckReducer';
import TuningsReducer from './TuningsReducer';
/*import { StringsReducer } from './guitarString/reducer';
import { FretsReducer } from './fret/reducer';

import { TuningReducer } from './tuning/reducer';
import { HarmonicsReducer } from './harmonic/reducer';*/


export default combineReducers({
  neck: NeckReducer,
  tunings: TuningsReducer,
  /*strings: StringsReducer,
  frets: FretsReducer,
  tuning: TuningReducer,
  harmonic: HarmonicsReducer,*/
});
