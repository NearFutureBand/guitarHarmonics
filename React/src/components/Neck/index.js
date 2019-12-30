import React from 'react';
import { useSelector } from 'react-redux';
import GuitarString from 'components/GuitarString';
import { getMatrix, getStrings, getZeroFretNotes } from 'selectors';

const Neck = () => {

  const matrix = useSelector(getMatrix);
  const strings = useSelector(getStrings);

  const zeroFrets = useSelector(getZeroFretNotes);

  return (
    <div className="neck">
      <div className="nut">
        {zeroFrets.map((el, i) => (
          <GuitarString key={i} number={i} frets={[el]} isSideDotsLine={i === strings} isZeroFrets />
        ))}
      </div>
      <div className="fretboard">
        {matrix.map( (el, i) => {
          return <GuitarString key={i} number={i} frets={matrix[i]} isSideDotsLine={i === strings} />;
        })}
      </div>
      
    </div>
  );

};

export default Neck;