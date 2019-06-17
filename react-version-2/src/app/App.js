import React, { Component} from 'react';
import { connect } from 'react-redux';

import Header from '../header/Header';
import Neck from '../neck/Neck';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Header />
        {/*<Neck />*/}
      </div>
    );
  }
}

export default connect()(App);