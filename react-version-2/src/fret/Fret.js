import React, { Component } from 'react';
import { connect } from 'react-redux';

class Fret extends Component {
  render() {
    const { pos, note, highlighted } = this.props;
    return (
      <div
        //className={`fret ${ incrustated? 'incrustated' : '' }`}
        id={`fret-${pos[0]}-${pos[1]}`}
        className={`fret`}
      >
        <span className="note">
          {note}
        </span>
        {
          highlighted && <div className="light"></div>
        }
      </div>

    );
  }
}


const mapStateToProps = ( state, ownProps ) => {
  const { pos } = ownProps;
  return {
    note: state.neck.matrixLoading ? '' : state.neck.matrix[pos[0]][pos[1]],
    highlighted: false,
  };
};

export default connect(mapStateToProps)(Fret);