import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as selectors from 'selectors';
import * as actions from 'actions';

const Header = () => {
  const dispatch = useDispatch();
  const strings = useSelector(selectors.getStrings);
  const frets = useSelector(selectors.getFrets);
  const tuningId = useSelector(selectors.getTuningId);

  const stringsRange = useSelector((state) => selectors.getStringNumberOptions(state, tuningId));
  /*constructor(props) {
    super(props);
    this.stringsRange = [4, 5, 6, 7, 8, 9];
    this.fretsRange = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    this.rootsRange = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  }*/

  /*componentDidMount = () => {
    this.props.fetchTunings();
    this.props.fetchHarmonics();
  };

  componentDidUpdate = (prevProps) => {
    const { tuning, strings, frets } = this.props;
    if (
      ( tuning && !prevProps.tuning ) || 
        tuning.id !== prevProps.tuning.id ||
        strings !== prevProps.strings ||
        frets !== prevProps.frets
    ) {
      this.props.fetchMatrix(strings, frets, tuning);
    }
  };

  handleHarmonicSelection = (selection) => {
    const { harmonic, changeHarmonic, findHarmonic, resetHarmonic } = this.props;

    if (selection.root === harmonic.root) {selection.root = null;}
    if (selection.scale === harmonic.scale) {selection.scale = null;}
    const newHarmonic = { ...harmonic, ...selection};
    changeHarmonic(newHarmonic);

    if (newHarmonic.root && newHarmonic.scale) {
      findHarmonic(newHarmonic);
    }
    if (!newHarmonic.root || !newHarmonic.scale) {
      resetHarmonic();
    }
  };*/

  /*const {
    strings,
    frets,
    tuning,
    harmonic,
    changeFretCount,
    changeStringCount,
    changeTuning,
    tunings,
    tuningsLoaded,
    scales,
  } = this.props;*/

  return (
    <header className="header-wrapper">
      <div className="header">


        <div className="nav-block">
          <span className="title">strings</span>
          <div className="menu">
            <div>
              <span className="current">{strings}</span>
              <div className="dropdown">
                {
                  stringsRange.map( (el) => {
                    return <span
                      key={el.value}
                      onClick={ () => dispatch(actions.changeNumberOfStrings.call(el.value)) }
                      className={(el.value === strings ) ? 'active' : ''}
                    >
                      {el.label}
                    </span>; 
                  })
                }
              </div>
            </div>
          </div>
        </div>

        {/*<div className="nav-block">
          <span className="title">frets</span>
          <div className="menu">
            <div>
              <span className="current">{frets}</span>
              <div className="dropdown">
                {
                  this.fretsRange.map( (el) => {
                    return <span
                      key={el}
                      onClick={ () => changeFretCount(el) }
                      className={(el === frets ) ? 'active' : ''}
                    >
                      {el}
                    </span>; 
                  })
                }
              </div>
            </div>
          </div>
        </div>

        <div className="nav-block">
          <span className="title">tuning</span>
          <div className="menu">
            { tuningsLoaded &&
                <div>
                  <span className="current">{tuning.name}</span>
                  <div className="dropdown">
                    {
                      tunings.map( (el) => {
                        return <span
                          key={el.id}
                          onClick={ () => changeTuning(el) }
                          className={(el.id === tuning.id ) ? 'active' : ''}
                        >
                          {el.name}
                        </span>; 
                      })
                    }
                  </div>
                </div>
            }
          </div>
        </div>

        <div className="nav-block">
          <span className="title">harmonic</span>
          <div className="menu">
            
            <div>
              <span className="current">{harmonic.root ? harmonic.root : 'root'}</span>
              <div className="dropdown">
                {
                  this.rootsRange.map( (el) => {
                    return <span
                      key={el}
                      onClick={ () => this.handleHarmonicSelection({ root: el }) }
                      className={(el === harmonic.root ) ? 'active' : ''}
                    >
                      {el}
                    </span>;
                  })
                }
              </div>
            </div>

            <div>
              <span className="current">{harmonic.scale ? harmonic.scale : 'scale'}</span>
              <div className="dropdown">
                {
                  scales.map( (el) => {
                    return <span
                      key={el}
                      onClick={ () => this.handleHarmonicSelection({ scale: el }) }
                      className={(el === harmonic.scale ) ? 'active' : ''}
                    >
                      {el}
                    </span>; 
                  })
                }
              </div>
            </div>
          </div>
        </div>*/}

      </div>
    </header>
  );
};

export default Header;