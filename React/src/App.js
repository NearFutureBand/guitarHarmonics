import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import * as actions from 'actions';

import Header from 'components/Header';
import Neck from 'components/Neck';
import { setNumberOfStrings } from 'redux/Neck';

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(actions.getAllTuningsRequest.call());
    //dispatch(actions.getAllScalesRequest.call());
    dispatch(setNumberOfStrings(4));
  }, []);
  

  return (
    <div className="app">
      {/*<Header />
      <Neck />*/}
    </div>
  );

};

export default App;