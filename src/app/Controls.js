import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import * as selectors from 'store/reducer';
import TimerInput from './controls/TimerInput';
import Skip from './controls/Skip';
import './Controls.css';

const Controls = ({ work, rest, updateWork, updateRest }) => (
  <div id="controls">
    <TimerInput label="Break Length" value={rest} onChange={updateRest} />
    <Skip />
    <TimerInput label="Work Length" value={work} onChange={updateWork} />
  </div>
);

const toMinutes = ms => Math.floor(ms / (60 * 1000));
const fromMinutes = minutes => minutes * 60 * 1000;

const mapStateToProps = state => ({
  work: toMinutes(selectors.getWorkLength(state)),
  rest: toMinutes(selectors.getRestLength(state))
});

const updatePhase = (phase, { updatePhaseLength }) => minutes =>
  updatePhaseLength(phase, fromMinutes(minutes));

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  updateWork: updatePhase('work', dispatchProps),
  updateRest: updatePhase('rest', dispatchProps)
});

export default connect(mapStateToProps, actions, mergeProps)(Controls);
