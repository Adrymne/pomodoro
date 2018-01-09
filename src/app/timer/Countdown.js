import React from 'react';
import './Countdown.css';

const calcPosition = diameter => ({
  position: 'absolute',
  top: diameter * 0.5
});

const padStart = (length, padding, str) =>
  padding.repeat(Math.max(0, length - str.length)) + str;
const formatTime = time => padStart(2, '0', time.toString());

const toSeconds = ms => ms / 1000;
const elapsed = startTime => Date.now() - startTime;

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elapsed: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isRunning && nextProps.isRunning) {
      this.startClock(nextProps);
    } else if (!nextProps.isRunning) {
      this.stopClock();
    }
  }

  startClock = ({ startTime, duration }) => {
    this.clock = setInterval(() => {
      this.setState({ elapsed: elapsed(startTime) });
    }, 1);
  };
  stopClock = () => {
    clearInterval(this.clock);
    this.setState({ elapsed: 0 });
  };

  render() {
    const { timerSize, duration } = this.props;
    const { elapsed } = this.state;

    const remaining = Math.max(duration - elapsed, 0);
    return (
      <div className="time-display" style={calcPosition(timerSize)}>
        {formatTime(Math.floor(toSeconds(remaining) / 60))}
        :
        {formatTime(Math.floor(toSeconds(remaining) % 60))}
      </div>
    );
  }
}

export default Countdown;
