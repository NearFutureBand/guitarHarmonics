import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as selectors from 'selectors';
import * as actions from 'redux/actions';
import { convertNoteSequenceForPicker } from 'helpers';

const Header = () => {
  const dispatch = useDispatch();
  const strings = useSelector(selectors.getStrings);
  const frets = useSelector(selectors.getFrets);
  const tuningId = useSelector(selectors.getTuningId);
  const tuningName = useSelector(
    state => selectors.getTuningName(state, tuningId)
  );
  const scale = useSelector(selectors.getScale);

  const stringsRange = useSelector(
    (state) => selectors.getStringNumberOptions(state, tuningId)
  );

  const scaleModesRange = useSelector(selectors.getScalesList);
  const scaleTonicsRange = convertNoteSequenceForPicker();
  const tuningsRange = useSelector(selectors.getTuningsOptions);
  
  useEffect(() => {
    dispatch(
      actions.updateMatrix({ tuning: tuningId, frets, strings })
    );
  }, [dispatch, tuningId, frets, strings]);

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
                      role="button"
                      tabIndex="0"
                      onClick={ () => dispatch(actions.setNumberOfStrings(el.value)) }
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

        <div className="nav-block">
          <span className="title">tuning</span>
          <div className="menu">
            
            <div>
              <span className="current">{tuningName}</span>
              <div className="dropdown">
                {tuningsRange.map( (el) => {
                  return <span
                    key={el.value}
                    role="button"
                    tabIndex="0"
                    onClick={ () => dispatch(actions.setTuningId(el.value)) }
                    className={(el.value === tuningId ) ? 'active' : ''}
                  >
                    {el.label}
                  </span>;
                })}
              </div>
            </div>
            
          </div>
        </div>

        <div className="nav-block">
          <span className="title">scale</span>
          <div className="menu">
            
            <div>
              <span className="current">{scale.tonic ? scale.tonic : '-'}</span>
              <div className="dropdown">
                { scaleTonicsRange.map( (el) => {
                  return <span
                    key={el.value}
                    role="button"
                    tabIndex="0"
                    onClick={() => dispatch(actions.setScaleTonic(el.value))}
                    className={(el.value === scale.tonic ) ? 'active' : ''}
                  >
                    {el.label}
                  </span>;
                })}
              </div>
            </div>

            <div>
              <span className="current">{scale.mode ? scale.mode : '-'}</span>
              <div className="dropdown">
                { scaleModesRange.map( (el) => {
                  return <span
                    key={el.value}
                    role="button"
                    tabIndex="0"
                    onClick={() => dispatch(actions.setScaleMode(el.value))}
                    className={(el.value === scale.mode ) ? 'active' : ''}
                  >
                    {el.label}
                  </span>; 
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;