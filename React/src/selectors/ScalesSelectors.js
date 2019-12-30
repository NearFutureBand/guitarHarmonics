import { convertScaleModesForSelector } from 'helpers';

export const getScales = state => state.scales.scales;
export const getScalesList = state => {
  return convertScaleModesForSelector(getScales(state));
};
