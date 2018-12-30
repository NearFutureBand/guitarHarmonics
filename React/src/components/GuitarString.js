import React, { Component } from "react";
import { connect } from 'react-redux';
import Fret from '../components/Fret';

import '../css/GuitarString.less';

class GuitarString extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { frets, number } = this.props;
    

    return (
      <div className="string" id={`string-${number}`}>
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
  return { frets: state.frets };
}

export default connect(mapStateToProps)(GuitarString);