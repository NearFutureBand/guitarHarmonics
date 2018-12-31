import React, { Component } from "react";
import { connect } from 'react-redux';
import { changeFretCount, changeTuning, changeStringCount } from '../actions';

import '../css/Header.less';

class Header extends Component {
  constructor(props) {
    super(props);

    this.stringsRange = [4,5,6,7,8,9];
    this.fretsRange = [12,13,14,15,16,17,18,19,20,21,22,23,24];
    this.tuningsRange = ['Standard', 'Drop D', 'Drop C', 'Drop A'];
  }



  render() {
    const { 
      strings,
      frets,
      tuning,
      changeStringCount,
      changeFretCount,
      changeTuning
    } = this.props;

    return (
      <header className="header-wrapper">
        <div className="header">
          <div className="nav-block">
            <span className="title">strings</span>
            <div>
              {
                this.stringsRange.map( (el) => {
                  return <span key={el} onClick={ () => changeStringCount(el) }>{el}</span> 
                })
              }
            </div>
          </div>
          <div className="nav-block">
            <span className="title">frets</span>
            <div>
              {
                this.fretsRange.map( (el) => {
                  return <span key={el} onClick={ () => changeFretCount(el) }>{el}</span> 
                })
              }
            </div>
          </div>
          <div className="nav-block">
            <span className="title">tuning</span>
            <div>
              {
                this.tuningsRange.map( (el) => {
                  return <span key={el} onClick={ () => changeTuning(el) }>{el}</span> 
                })
              }
            </div>
          </div>
        </div>
      </header>
    );
  }
}


function mapStateToProps( state ) {
  return {
    tuning: state.tuning,
    frets: state.frets,
    strings: state.strings
  };
}

export default connect(mapStateToProps, { 
  changeFretCount,
  changeStringCount,
  changeTuning
})(Header);