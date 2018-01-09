import React from 'react';
import { connect } from 'react-redux';
import Progress from './timer/Progress';
import Countdown from './timer/Countdown';
import * as selectors from 'store/reducer';
import * as actions from 'store/actions';
import './Timer.css';

const calcSize = () => Math.min(window.innerWidth, window.innerHeight) * 0.7;
const phaseColour = isWork => (isWork ? 'red' : 'green');

const Timer = ({ isWork, isRunning, timer, onClick }) => (
  <div id="timer">
    <Progress
      color={phaseColour(isWork)}
      timerSize={calcSize()}
      onClick={onClick}
      isRunning={isRunning}
      {...timer}
    />
    <Countdown timerSize={calcSize()} isRunning={isRunning} {...timer} />
  </div>
);

const mapStateToProps = state => ({
  isWork: selectors.isWorkPhase(state),
  isRunning: selectors.isRunning(state),
  timer: selectors.getTimerState(state)
});

const toggleTimerState = ({ isRunning, timer }, { start, stop }) => progress =>
  isRunning ? stop(Date.now(), progress) : start(Date.now());

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  onClick: toggleTimerState(stateProps, dispatchProps)
});

export default connect(mapStateToProps, actions, mergeProps)(Timer);
