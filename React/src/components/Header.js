import React, { Component } from "react";
import { connect } from 'react-redux';
import { 
  changeFretCount,
  changeTuning,
  changeStringCount,
  setHarmonic,
  resetHarmonic
} from '../actions';
import { tunings } from '../util/tunings';
import { sequence } from '../util/functions';

import '../css/Header.less';

class Header extends Component {
  constructor(props) {
    super(props);

    this.stringsRange = [4,5,6,7,8,9];
    this.fretsRange = [12,13,14,15,16,17,18,19,20,21,22,23,24];
    this.tuningsRange = tunings.map( tun => tun.name);
    this.harmonicScalesRange = ['Minor', 'Major'];
    this.harmonicRootsRange = sequence;

    this.state = {
      chosenHarmonic: {
        root: null,
        scale: null
      }
    }
  }

  handleHarmonicSelection = (selection) => {
    const { chosenHarmonic } = this.state;

    if(selection.root === chosenHarmonic.root) selection.root = null;
    if(selection.scale === chosenHarmonic.scale) selection.scale = null;
    const newHarmonic = { ...chosenHarmonic, ...selection};

    this.setState(() => {
      if(newHarmonic.root && newHarmonic.scale) {
        this.props.setHarmonic(newHarmonic);
      }
      if(!newHarmonic.root && !newHarmonic.scale) {
        this.props.resetHarmonic();
      }
      return { chosenHarmonic: newHarmonic };
    });
  }

  render() {
    const { 
      strings,
      frets,
      tuning,
      changeStringCount,
      changeFretCount,
      changeTuning,
      harmonic
    } = this.props;

    const {
      chosenHarmonic
    } = this.state;

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
                        className={(el === strings )? 'active': ''}
                      >
                        {el}
                      </span> 
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
                        className={(el === frets )? 'active': ''}
                      >
                        {el}
                      </span> 
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="nav-block">
            <span className="title">tuning</span>
            <div className="menu">
              <div>
                <span className="current">{tuning.name}</span>
                <div className="dropdown">
                  {
                    this.tuningsRange.map( (el) => {
                      return <span
                        key={el}
                        onClick={ () => changeTuning(el) }
                        className={(el === tuning.name )? 'active': ''}
                      >
                        {el}
                      </span> 
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        
          <div className="nav-block">
            <span className="title">harmonic</span>
            <div className="menu">
            
              <div>
                <span className="current">{chosenHarmonic.root? chosenHarmonic.root : 'root'}</span>
                <div className="dropdown">
                  {
                    this.harmonicRootsRange.map( (el) => {
                      return <span
                        key={el}
                        onClick={ () => this.handleHarmonicSelection({ root: el }) }
                        className={(el === chosenHarmonic.root )? 'active': ''}
                      >
                        {el}
                      </span>
                    })
                  }
                </div>
              </div>

              <div>
                <span className="current">{chosenHarmonic.scale? chosenHarmonic.scale : 'scale'}</span>
                <div className="dropdown">
                  {
                    this.harmonicScalesRange.map( (el) => {
                      return <span
                        key={el}
                        onClick={ () => this.handleHarmonicSelection({ scale: el }) }
                        className={(el === chosenHarmonic.scale )? 'active': ''}
                      >
                        {el}
                      </span> 
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


function mapStateToProps( state ) {
  return {
    tuning: state.tuning,
    frets: state.frets,
    strings: state.strings,
    harmonic: state.harmonic
  };
}

export default connect(mapStateToProps, { 
  changeFretCount,
  changeStringCount,
  changeTuning,
  setHarmonic,
  resetHarmonic
})(Header);