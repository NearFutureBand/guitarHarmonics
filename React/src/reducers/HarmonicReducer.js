import { SET_HARMONIC } from '../actions';
import { findHarmonic } from '../util/functions';


export default function(harmonic = {}, action) {
    
    if( action.type === SET_HARMONIC) {
        return findHarmonic(action.payload.root, action.payload.scale);
    }

    return harmonic;
}