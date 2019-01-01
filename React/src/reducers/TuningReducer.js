import { CHANGE_TUNING } from '../actions';
import { tunings } from '../util/tunings';
import { getTuningByName } from '../util/functions';


export default function(notes = tunings[0], action) {

    if( action.type === CHANGE_TUNING) {
        const tun = getTuningByName(action.payload);
        return tun;
    }
  
    return notes;
}