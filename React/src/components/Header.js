import React, { Component } from "react";
import { connect } from 'react-redux';
import { changeFretCount, changeTuning, changeStringCount } from '../actions';

import '../css/Header.less';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleChangeFretCount = (event) => {   
    this.props.changeFretCount(event.target.value);
  }

  handleChangeStringCount = (event) => {
    this.props.changeStringCount(event.target.value);
  }

  handleChangeTuning = (event) => {
    this.props.changeTuning(event.target.value);
  }



  render() {
    let { strings, frets, tuning } = this.props;

    return (
      <header className="header-wrapper">
        <div className="header">
          <div className="nav-block">
            <span className="title">strings</span>
            <input type="text" defaultValue={strings} onChange={this.handleChangeStringCount}/>
          </div>
          <div className="nav-block">
            <span className="title">frets</span>
            <input type="text" defaultValue={frets} onChange={this.handleChangeFretCount}/>
          </div>
          <div className="nav-block">
            <span className="title">tuning</span>
            <input type="text" defaultValue={tuning.name} onChange={this.handleTuning}/>
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