import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchTunings, changeTuning } from '../tuning/reducer';
import { changeFretCount } from '../fret/reducer';
import { changeStringCount } from '../guitarString/reducer';
import { fetchMatrix } from '../neck/reducer';

class Header extends Component {
  constructor(props) {
    super(props);
    this.stringsRange = [4, 5, 6, 7, 8, 9];
    this.fretsRange = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  }

  componentDidMount = () => {
    this.props.fetchTunings();
  }

  componentDidUpdate = (prevProps) => {
    const { tuning, strings, frets } = this.props;
    console.log();
    if (
     
      ( tuning && !prevProps.tuning ) || 
        tuning.id !== prevProps.tuning.id ||
        strings !== prevProps.strings ||
        frets !== prevProps.frets
      
    ) {
      this.props.fetchMatrix(strings, frets, tuning);
    }
  }

  render() {
    const {
      strings,
      frets,
      tuning,
      changeFretCount,
      changeStringCount,
      changeTuning,
      tunings,
      tuningsLoaded,
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

          {<div className="nav-block">
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
          </div>}


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
});

export default connect(mapStateToProps, { 
  fetchTunings,
  changeTuning,
  changeFretCount,
  changeStringCount,
  fetchMatrix,
})(Header);