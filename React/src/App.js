import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import * as actions from 'actions';

import Header from 'components/Header';
import Neck from 'components/Neck';

import { /*getAllTunings, */getAllScales } from 'redux/actions';

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllScales());
    //dispatch(getAllTunings());
  }, []);
  

  return (
    <div className="app">
      {/*<Header />
      <Neck />*/}
    </div>
  );

};

export default App;