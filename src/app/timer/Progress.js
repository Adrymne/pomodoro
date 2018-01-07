import React from 'react';
import { Circle } from 'progressbar.js';
import './Progress.css';

class Progress extends React.Component {
  componentDidMount() {
    this.create(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.create(nextProps);
  }

  componentWillUnmount() {
    this.destroy();
  }

  create({ color, duration, progress }) {
    this.destroy();

    this.shape = new Circle(this.container, {
      strokeWidth: 3,
      color,
      trailColor: '#eee'
    });
    this.shape.set(progress);
    if (duration) {
      this.shape.animate(1, { duration });
    }
  }

  destroy() {
    if (this.shape) {
      this.shape.destroy();
      this.shape = undefined;
    }
  }

  getProgress = () => this.shape && this.shape.value();

  render() {
    const { timerSize, onClick } = this.props;
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
        onClick={() => onClick(this.getProgress())}
      />
    );
  }
}
Progress.defaultProps = {
  color: 'red',
  progress: 0
};

export default Progress;
