import React from 'react';
import Fret from 'components/Fret';

const GuitarString = ({
  number,
  frets,
  isSideDotsLine,
  isZeroFrets,
}) => (
  <div
    className="string"
    id={`string-${number}`}
    style={{borderBottom: !isSideDotsLine && `${(number + 1) * 0.5}px solid gray`}}
  >
    {
      frets.map( (el, i) => {
        return <Fret key={i} pos={[number, isZeroFrets ? -1 : i]} fret={frets[i]} isZeroFrets />;
      })
    }
  </div>
);
export default GuitarString;