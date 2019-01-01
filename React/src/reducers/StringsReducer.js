import { CHANGE_STRING_COUNT, CHANGE_TUNING } from '../actions';
import { getTuningByName } from '../util/functions';


export default function(strings = 6, action) {

    if( action.type === CHANGE_STRING_COUNT) {
        const { strings, currentTuning } = action.payload;
        if( currentTuning.maxStrings && currentTuning.maxStrings >= strings ) {
            return strings;
        } else {
            return currentTuning.defaulStrings;
        }
    }

    if( action.type === CHANGE_TUNING) {
        return getTuningByName(action.payload).defaulStrings;
    }
  
    return strings;
}