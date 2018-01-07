import React from 'react';
import './Countdown.css';

const calcPosition = diameter => ({
  position: 'absolute',
  top: diameter * 0.5
});

const padStart = (length, padding, str) =>
  padding.repeat(Math.max(0, length - str.length)) + str;
const formatTime = time => padStart(2, '0', time.toString());

const toSeconds = ms => Math.floor(ms / 1000);
const elapsed = startTime => Date.now() - startTime;

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      remaining: props.duration
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startTime) {
      this.startClock(nextProps);
    } else {
      this.stopClock();
    }
  }

  startClock = ({ startTime, duration }) => {
    this.clock = setInterval(() => {
      this.setState({ remaining: duration - elapsed(startTime) });
    }, 500);
  };
  stopClock = () => {
    clearInterval(this.clock);
  };

  render() {
    const { timerSize } = this.props;
    const { remaining } = this.state;

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
