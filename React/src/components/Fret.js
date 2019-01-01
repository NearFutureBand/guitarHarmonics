import React, { Component } from "react";
import { connect } from 'react-redux';
import { getNote } from '../util/functions';

import '../css/Fret.less';

class Fret extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    }

    this.incrustate = {
      '3':true,
      '5':true,
      '7':true,
      '9':true,
      '12':true,
      '15':true,
      '17':true,
      '19':true,
      '21':true,
      '24':true
    };
  }

  toggleLight = () => {
    this.setState( (state) => { return { active: !state.active } } );
  }
  
  render() {
    const { pos, tuning, harmonic } = this.props;
    const note = getNote(pos, tuning);
    const isNumber = pos[0] === 0;
    const incrustated = JSON.stringify(pos[1]) in this.incrustate

    return (
      <div
        className={`fret ${ incrustated? 'incrustated' : '' }`}
        id={`fret-${pos[0]}-${pos[1]}`}
        onClick={this.toggleLight}
      >
        <span className="note">
          {
            !isNumber? note : pos[1]
          }
        </span>
        {
          !isNumber && (this.state.active || note in harmonic) && <div className="light"></div>
        }
      </div>
    );
  }
}


function mapStateToProps( state ) {
    return { 
      tuning: state.tuning,
      harmonic: state.harmonic
    };
}
  
export default connect(mapStateToProps)(Fret);