import React, { Component } from "react";
import { connect } from 'react-redux';
import GuitarString from '../components/GuitarString';

import '../css/Neck.less';

class Neck extends Component {
  constructor() {
    super();


  }

  render() {
    const { strings } = this.props;

    return (
      <div className="neck">
        {
            new Array(strings + 1).fill(0).map( (el, i) => {
                return <GuitarString key={i} number={i}/> 
            })
        }
        
      </div>
    );
  }
}

function mapStateToProps( state ) {
    return { strings: state.strings };
}

export default connect(mapStateToProps)(Neck);