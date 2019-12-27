import { getStringsSelectorValues } from 'helpers';

export const getTunings = (state) => state.tunings.tunings;
export const getStringNumberOptions = (state, tuningId) => {
  return getStringsSelectorValues(getTunings(state), tuningId);
};