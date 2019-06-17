import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { getNote } from '../util/functions';

class Fret extends Component {
  render() {
    return (
      <div
        className={`fret`}
      >
        F
      </div>
    );
  }
}


const mapStateToProps = ( state ) => {
  return {
    
  };
};
  
export default connect(mapStateToProps)(Fret);