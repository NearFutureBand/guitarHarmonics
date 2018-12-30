import React, { Component } from "react";
import { connect } from 'react-redux';

import '../css/GuitarString.less';

class GuitarString extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="string" id={`string-${this.props.number}`}>
        {/*
          new Array(strings + 1).fill(0).map( (el, i) => {
                return <GuitarString key={i} number={i}/> 
            })
          */}
      </div>
    );
  }
}

function mapStateToProps( state ) {
    return { frets: state.frets };
}

export default connect(mapStateToProps)(GuitarString);