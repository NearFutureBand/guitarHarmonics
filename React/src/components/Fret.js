import React, { Component } from "react";
import { connect } from 'react-redux';
import { getNote } from '../util/functions';

import '../css/Fret.less';

class Fret extends Component {
  constructor(props) {
    super(props);

    this.note = getNote(props.pos, props.tuning);
  }

  
  render() {
    const { pos, tuning } = this.props;

    return (
      <div className="fret" id={`fret-${pos[0]}-${pos[1]}`}>
        <span className="note">
          {
            (pos[0] !== 0 )? this.note : pos[1]
          }
        </span>
        
      </div>
    );
  }
}


function mapStateToProps( state ) {
    return { tuning: state.tuning };
}
  
export default connect(mapStateToProps)(Fret);