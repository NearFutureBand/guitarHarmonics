import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as actions from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <header className="header-wrapper">
        <div className="header">

        </div>
      </header>
    );
  }
}

export default connect()(Header);