import React from 'react';
import { Circle } from 'progressbar.js';
import './Progress.css';

const toMs = minutes => minutes * 60 * 1000;

class Progress extends React.Component {
  componentDidMount() {
    this.create();
  }

  componentWillUnmount() {
    this.destroy();
  }

  create() {
    this.destroy();

    const { color, duration, progress } = this.props;
    this.shape = new Circle(this.container, {
      strokeWidth: 3,
      color,
      trailColor: '#eee'
    });
    this.shape.set(progress);
    if (duration) {
      this.shape.animate(1, { duration: toMs(duration) });
    }
  }

  destroy() {
    if (this.shape) {
      this.shape.destroy();
      this.shape = undefined;
    }
  }

  render() {
    const { timerSize } = this.props;
    return (
      <div
        id="timer-progress"
        ref={d => {
          this.container = d;
        }}
        style={{
          width: `${timerSize}px`,
          height: `${timerSize}px`,
          cursor: 'pointer'
        }}
      />
    );
  }
}
Progress.defaultProps = {
  color: 'red',
  progress: 0
};

export default Progress;
