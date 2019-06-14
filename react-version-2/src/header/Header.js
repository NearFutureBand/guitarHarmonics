import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.stringsRange = [4, 5, 6, 7, 8, 9];
    this.fretsRange = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  }

  render() {
    const { strings, frets, changeFretCount, changeStringCount } = this.props;

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
                        onClick={ () => changeStringCount(el, 'Standard') }
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


        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.strings.count,
  frets: state.frets.count,
});

export default connect(mapStateToProps)(Header);