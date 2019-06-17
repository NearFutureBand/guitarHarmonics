import { combineReducers } from 'redux';

import { StringsReducer } from './guitarString/reducer';
import { FretsReducer } from './fret/reducer';
import { NeckReducer } from './neck/reducer';
import { TuningReducer } from './tuning/reducer';
import { HarmonicsReducer } from './harmonic/reducer';


export default combineReducers({
  strings: StringsReducer,
  frets: FretsReducer,
  neck: NeckReducer,
  tuning: TuningReducer,
  harmonic: HarmonicsReducer,
});
