import { CHANGE_TUNING } from '../actions';

import { tunings } from '../util/tunings';


export default function(notes = tunings[0], action) {

    if( action.type === CHANGE_TUNING) {
        const tun = tunings.find(x => x.name === action.payload);
        console.log(tun);
        //return tunings[ ];
    }
  
    return notes;
}