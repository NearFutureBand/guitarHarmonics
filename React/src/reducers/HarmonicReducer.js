import { SET_HARMONIC, RESET_HARMONIC } from '../actions';
import { findHarmonic } from '../util/functions';


export default function(harmonic = {}, action) {
    console.log(action);
    if( action.type === SET_HARMONIC) {
        return findHarmonic(action.payload.root, action.payload.scale);
    }

    if( action.type === RESET_HARMONIC) {
        return {};
    }

    return harmonic;
}