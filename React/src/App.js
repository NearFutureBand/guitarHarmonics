import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import * as actions from 'actions';
/*import Header from '../header/Header';
import Neck from '../neck/Neck';*/

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getAllTunings());
  }, []);
  

  return (
    <div className="app">
      {/*<Header />
        <Neck />*/}
    </div>
  );

};

export default App;