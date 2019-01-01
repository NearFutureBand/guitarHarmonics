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
  }

  toggleLight = () => {
    this.setState( (state) => { return { active: !state.active } } );
  }
  
  render() {
    const { pos, tuning, harmonic } = this.props;
    const note = getNote(pos, tuning);
    const isNumber = pos[0] === 0;


    return (
      <div className="fret" id={`fret-${pos[0]}-${pos[1]}`} onClick={this.toggleLight}>
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