export const CHANGE_FRET_COUNT = 'CHANGE_FRET_COUNT';
export const CHANGE_STRING_COUNT = 'CHANGE_STRING_COUNT';
export const CHANGE_TUNING = 'CHANGE_TUNING';
export const SET_HARMONIC = 'SET_HARMONIC';
export const RESET_HARMONIC = 'RESET_HARMONIC';


export function changeFretCount(frets) {
    return {
        type: CHANGE_FRET_COUNT,
        payload: frets
    }
}

export function changeStringCount(strings, currentTuning) {
    return {
        type: CHANGE_STRING_COUNT,
        payload: {
            strings,
            currentTuning
        }
    }
}

export function changeTuning(tuning) {
    
    return {
        type: CHANGE_TUNING,
        payload: tuning
    }
}

export function setHarmonic( {root, scale} ) {
    
    return {
        type: SET_HARMONIC,
        payload: {
            root,
            scale
        }
    }
}

export function resetHarmonic() {
    return {
        type: RESET_HARMONIC
    }
}