import React, { Component} from 'react';
import { connect } from 'react-redux';

import { fetchTunings } from '../tuning/reducer';
import Header from '../header/Header';
import Neck from '../neck/Neck';

class App extends Component {
  componentDidMount = () => {
    this.props.fetchTunings();
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Neck />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.strings.count,
  frets: state.frets.count,
});

export default connect(mapStateToProps, { fetchTunings })(App);