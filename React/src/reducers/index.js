import { combineReducers } from 'redux';

import StringsReducer from './StringsReducer';
import FretsReducer from './FretsReducer';
import TuningReducer from './TuningReducer';


export default combineReducers({
    strings: StringsReducer,
    frets: FretsReducer,
    tuning: TuningReducer,
    sequence: ['C','C#','E']
});

