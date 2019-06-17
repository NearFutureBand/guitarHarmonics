import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchTunings, changeTuning } from '../tuning/reducer';
import { changeFretCount } from '../fret/reducer';
import { changeStringCount } from '../guitarString/reducer';
import { fetchMatrix } from '../neck/reducer';
import {
  fetchHarmonics,
  changeHarmonic,
  findHarmonic,
  resetHarmonic,
} from '../harmonic/reducer';

class Header extends Component {
  constructor(props) {
    super(props);
    this.stringsRange = [4, 5, 6, 7, 8, 9];
    this.fretsRange = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    this.rootsRange = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  }

  componentDidMount = () => {
    this.props.fetchTunings();
    this.props.fetchHarmonics();
  }

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
  }

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
  }

  render() {
    const {
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
    } = this.props;

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
                    this.stringsRange.map( (el) => {
                      return <span
                        key={el}
                        onClick={ () => changeStringCount(el, tuning) }
                        className={(el === strings ) ? 'active' : ''}
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
          </div>

        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.strings.count,
  frets: state.frets.count,
  tuningsLoaded: state.tuning.tuningsLoaded,
  tuning: state.tuning.tuning,
  tunings: _.values(state.tuning.tunings),
  harmonic: state.harmonic.harmonic,
  scales: _.keys(state.harmonic.harmonics),
});

export default connect(mapStateToProps, { 
  fetchTunings,
  changeTuning,
  changeFretCount,
  changeStringCount,
  fetchMatrix,
  fetchHarmonics,
  changeHarmonic,
  findHarmonic,
  resetHarmonic,
})(Header);