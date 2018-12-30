//import { FETCH_NOTES } from '../actions';

import { tunings } from '../util/tunings';


export default function(notes = tunings[0], action) {

    /*if( action.type === FETCH_NOTES) {
        return NotesDatabase;
    }*/
  
    return notes;
}