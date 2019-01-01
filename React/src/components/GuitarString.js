import React, { Component } from "react";
import { connect } from 'react-redux';
import Fret from '../components/Fret';

import '../css/GuitarString.less';

class GuitarString extends Component {
  constructor(props) {
    super(props);

    this.stringWidth = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  }

  render() {
    const { frets, number } = this.props;
    

    return (
      <div
        className="string"
        id={`string-${number}`}
        style={{ borderBottom: `${ this.stringWidth[number-1] }px solid gray` }}
      >
        {
          new Array(frets + 1).fill(0).map( (el, i) => {
            return <Fret key={i} pos={[number, i]}/>
          })
        }
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return {
    frets: state.frets,
    strings: state.strings
  };
}

export default connect(mapStateToProps)(GuitarString);