import React, { Component } from "react";
import { connect } from 'react-redux';

import '../css/Header.less';

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    const { strings, frets, tuning } = this.props;

    return (
      <header className="header-wrapper">
        <div className="header">
          <div className="nav-block">
            <span className="title">strings</span>
            <input type="text" value={strings}/>
          </div>
          <div className="nav-block">
            <span className="title">frets</span>
            <input type="text" value={frets}/>
          </div>
          <div className="nav-block">
            <span className="title">tuning</span>
            <input type="text" value={tuning.name}/>
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

export default connect(mapStateToProps)(Header);