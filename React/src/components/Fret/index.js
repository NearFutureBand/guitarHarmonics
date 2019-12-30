import React from 'react';

const Fret = ({
  pos,
  fret,
  isZeroFrets,
}) => {

  //higlighted selector

  return (
    <div
      //className={`fret ${ incrustated? 'incrustated' : '' }`}
      id={`fret-${pos[0]}-${pos[1]}`}
      className={`fret`}
      style={{ width: !isZeroFrets && `${350 - pos[1] * 8}px`}}
    >
      <span className="note">
        {fret}
      </span>
      {/*
        highlighted && <div className="light"></div>
      */}
    </div>

  );
  
};



export default Fret;