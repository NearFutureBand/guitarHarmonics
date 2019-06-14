import React, { Component } from 'react';
import { connect } from 'react-redux';
import GuitarString from '../guitarString/GuitarString';
import { fetchMatrix } from './reducer';

class Neck extends Component {
  
  componentDidMount = () => {
    this.props.fetchMatrix('', '', '');
  } 

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
});

export default connect(mapStateToProps, { fetchMatrix })(Neck);