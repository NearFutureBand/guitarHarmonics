
export const getStringsSelectorValues = (tunings, tuningId) => {
  const minStrings = 2;
  return tuningId in tunings ? 
    Array.from(
      new Array(tunings[tuningId].maxStrings - minStrings + 1),
      (item, i) => ({
        label: `${minStrings + i}`,
        value: minStrings + i,
      }),
    ) : [];
};