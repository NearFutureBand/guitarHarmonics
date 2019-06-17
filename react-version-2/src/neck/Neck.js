import React, { Component } from 'react';
import { connect } from 'react-redux';
import GuitarString from '../guitarString/GuitarString';
import { fetchMatrix } from './reducer';

class Neck extends Component {

  render() {
    const { strings } = this.props;
    
    return (
      <div className="neck">
        {
          new Array(strings + 1).fill(0).map( (el, i) => {
            return <GuitarString key={i} number={i}/>; 
          })
        }
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.strings.count,
  frets: state.frets.count,
  tuning: state.tuning.tuning,
});

export default connect(mapStateToProps, { fetchMatrix })(Neck);