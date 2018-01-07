import React from 'react';
import { connect } from 'react-redux';
import Progress from './timer/Progress';
import Countdown from './timer/Countdown';
import * as selectors from 'store/reducer';
import * as actions from 'store/actions';
import './Timer.css';

const calcSize = () => Math.min(window.innerWidth, window.innerHeight) * 0.7;
const phaseColour = isWork => (isWork ? 'red' : 'green');
const toMs = seconds => seconds * 1000;

const isRunning = timer => !!timer.startTime;

const timerToggle = ({ timer, start, stop }) =>
  isRunning(timer) ? stop : start;

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      remaining: 59
    };
  }

  render() {
    const { isWork, timer } = this.props;
    const { remaining } = this.state;
    return (
      <div id="timer">
        <Progress
          duration={isRunning(timer) ? toMs(timer.duration) : undefined}
          color={phaseColour(isWork)}
          progress={timer.progress}
          timerSize={calcSize()}
          onClick={timerToggle(this.props)}
        />
        <Countdown remaining={remaining} timerSize={calcSize()} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isWork: selectors.isWorkPhase(state),
  timer: selectors.getTimerState(state)
});

export default connect(mapStateToProps, actions)(Timer);
