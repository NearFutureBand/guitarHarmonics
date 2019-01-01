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
    const { pos, tuning } = this.props;
    const note = getNote(pos, tuning);

    return (
      <div className="fret" id={`fret-${pos[0]}-${pos[1]}`} onClick={this.toggleLight}>
        <span className="note">
          {
            (pos[0] !== 0 )? note : pos[1]
          }
        </span>
        {
          this.state.active && <div className="light"></div>
        }
      </div>
    );
  }
}


function mapStateToProps( state ) {
    return { tuning: state.tuning };
}
  
export default connect(mapStateToProps)(Fret);