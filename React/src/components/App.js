import React, { Component } from "react";
import Neck from './Neck';
import Header from './Header';

import '../css/App.less';

class App extends Component {
  constructor() {
    super();
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
export default App;