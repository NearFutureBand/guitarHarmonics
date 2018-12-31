export const CHANGE_FRET_COUNT = 'CHANGE_FRET_COUNT';
export const CHANGE_STRING_COUNT = 'CHANGE_STRING_COUNT';
export const CHANGE_TUNING = 'CHANGE_TUNING';


export function changeFretCount(frets) {
    return {
        type: CHANGE_FRET_COUNT,
        payload: frets
    }
}

export function changeStringCount(strings) {
    return {
        type: CHANGE_STRING_COUNT,
        payload: strings
    }
}

export function changeTuning(tuning) {
    
    return {
        type: CHANGE_TUNING,
        payload: tuning
    }
}