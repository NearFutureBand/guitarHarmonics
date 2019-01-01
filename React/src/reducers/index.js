import { combineReducers } from 'redux';

import StringsReducer from './StringsReducer';
import FretsReducer from './FretsReducer';
import TuningReducer from './TuningReducer';
import HarmonicReducer from './HarmonicReducer';


export default combineReducers({
    strings: StringsReducer,
    frets: FretsReducer,
    tuning: TuningReducer,
    harmonic: HarmonicReducer
});

