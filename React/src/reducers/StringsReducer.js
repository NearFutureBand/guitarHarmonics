import { CHANGE_STRING_COUNT } from '../actions';


export default function(strings = 6, action) {

    if( action.type === CHANGE_STRING_COUNT) {
        return action.payload;
    }
  
    return strings;
}