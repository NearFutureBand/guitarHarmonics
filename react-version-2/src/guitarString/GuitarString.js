import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fret from '../fret/Fret';
import { changeStringCount } from '../guitarString/reducer';
import { changeFretCount } from '../fret/reducer';

class GuitarString extends Component {
  /*constructor(props) {
    super(props);

    this.stringWidth = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  }*/

  render() {
    const { frets } = this.props;

    return (
      <div
        className="string"
        //id={`string-${number}`}
        //style={{ borderBottom: `${ this.stringWidth[number-1] }px solid gray` }}
      >
        {
          new Array(frets + 1).fill(0).map( (el, i) => {
            return <Fret key={i} pos={[i, i]}/>;
          })
        }
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return {
    frets: state.frets.count,
    strings: state.strings.strings,
  };
}

export default connect(mapStateToProps, {
  changeStringCount,
  changeFretCount,
})(GuitarString);