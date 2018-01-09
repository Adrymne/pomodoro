import React from 'react';
import { connect } from 'react-redux';
import Progress from './timer/Progress';
import Countdown from './timer/Countdown';
import * as selectors from 'store/reducer';
import * as actions from 'store/actions';
import './Timer.css';

const calcSize = () => Math.min(window.innerWidth, window.innerHeight) * 0.7;
const phaseColour = isWork => (isWork ? 'red' : 'green');

const Timer = ({ isWork, isRunning, timer, onClick, onFinish }) => (
  <div id="timer">
    <Progress
      color={phaseColour(isWork)}
      timerSize={calcSize()}
      onClick={onClick}
      isRunning={isRunning}
      {...timer}
    />
    <Countdown
      timerSize={calcSize()}
      isRunning={isRunning}
      onFinish={onFinish}
      {...timer}
    />
  </div>
);

const mapStateToProps = state => ({
  isWork: selectors.isWorkPhase(state),
  isRunning: selectors.isRunning(state),
  timer: selectors.getTimerState(state),
  nextPhaseLength: selectors.getNextPhaseLength(state)
});

const toggleTimerState = ({ isRunning, timer }, { start, stop }) => progress =>
  isRunning ? stop(Date.now(), progress) : start(Date.now());
const startNextPhase = ({ nextPhaseLength }, { nextPhase }) => () =>
  nextPhase(nextPhaseLength);

const mergeProps = (stateProps, dispatchProps) => ({
  isWork: stateProps.isWork,
  isRunning: stateProps.isRunning,
  timer: stateProps.timer,
  onClick: toggleTimerState(stateProps, dispatchProps),
  onFinish: startNextPhase(stateProps, dispatchProps)
});

export default connect(mapStateToProps, actions, mergeProps)(Timer);
