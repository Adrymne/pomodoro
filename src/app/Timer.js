import React from 'react';
import { connect } from 'react-redux';
import Progress from './timer/Progress';
import Countdown from './timer/Countdown';
import * as selectors from 'store/reducer';
import * as actions from 'store/actions';
import './Timer.css';

const calcSize = () => Math.min(window.innerWidth, window.innerHeight) * 0.7;
const phaseColour = isWork => (isWork ? 'red' : 'green');

const isRunning = timer => !!timer.startTime;

const timerToggle = (start, stop, timer) =>
  isRunning(timer) ? stop.bind(null, timer.startTime) : start;

const Timer = ({ isWork, timer, start, stop }) => (
  <div id="timer">
    <Progress
      duration={isRunning(timer) ? timer.duration : undefined}
      color={phaseColour(isWork)}
      progress={timer.progress}
      timerSize={calcSize()}
      onClick={timerToggle(start, stop, timer)}
    />
    <Countdown
      startTime={timer.startTime}
      duration={timer.duration}
      timerSize={calcSize()}
    />
  </div>
);

const mapStateToProps = state => ({
  isWork: selectors.isWorkPhase(state),
  timer: selectors.getTimerState(state)
});

export default connect(mapStateToProps, actions)(Timer);
