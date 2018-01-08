import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import * as selectors from 'store/reducer';
import TimerInput from './controls/TimerInput';
import './Controls.css';

const toMinutes = ms => Math.floor(ms / (60 * 1000));
const fromMinutes = minutes => minutes * 60 * 1000;

const Controls = ({ work, rest, updatePhaseLength }) => (
  <div id="controls">
    <TimerInput
      label="Break Length"
      value={rest}
      onChange={rest => updatePhaseLength({ rest: fromMinutes(rest) })}
    />
    <TimerInput
      label="Work Length"
      value={work}
      onChange={work => updatePhaseLength({ work: fromMinutes(work) })}
    />
  </div>
);

const mapStateToProps = state => ({
  work: toMinutes(selectors.getWorkLength(state)),
  rest: toMinutes(selectors.getRestLength(state))
});

export default connect(mapStateToProps, actions)(Controls);
