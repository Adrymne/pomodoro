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
  timer: {
    startTime: selectors.getStartTime(state),
    progress: selectors.getProgress(state),
    duration: selectors.getDuration(state)
  },
  activePhaseLength: selectors.getActivePhaseLength(state)
});

const toggleTimerState = (
  { isRunning, activePhaseLength },
  { start, stop }
) => progress =>
  isRunning ? stop(Date.now(), progress) : start(activePhaseLength, Date.now());

const mergeProps = (stateProps, dispatchProps) => ({
  isWork: stateProps.isWork,
  isRunning: stateProps.isRunning,
  timer: stateProps.timer,
  onClick: toggleTimerState(stateProps, dispatchProps),
  onFinish: dispatchProps.nextPhase
});

export default connect(mapStateToProps, actions, mergeProps)(Timer);
