import { CHANGE_FRET_COUNT } from '../actions';


export default function(frets = 12, action) {

    if( action.type === CHANGE_FRET_COUNT) {
        return action.payload;
    }

    return frets;
}