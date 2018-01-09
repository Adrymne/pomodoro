import React from 'react';
import { Circle } from 'progressbar.js';
import './Progress.css';
import { cond, anyPass } from 'utils';

const changed = prop => (next, prev) => prev[prop] !== next[prop];

class Progress extends React.Component {
  componentDidMount() {
    this.create(this.props);
  }

  componentWillReceiveProps(nextProps) {
    cond([
      [changed('color'), this.create],
      [
        anyPass([
          changed('duration'),
          changed('progress'),
          changed('isRunning')
        ]),
        this.update
      ]
    ])(nextProps, this.props);
  }

  componentWillUnmount() {
    this.destroy();
  }

  create = props => {
    this.destroy();

    this.shape = new Circle(this.container, {
      strokeWidth: 3,
      color: props.color,
      trailColor: '#eee'
    });
    this.update(props);
  };
  update = ({ duration, progress, isRunning }) => {
    if (this.shape) {
      this.shape.set(progress);
      if (isRunning) {
        this.shape.animate(1, { duration });
      }
    }
  };
  destroy = () => {
    if (this.shape) {
      this.shape.destroy();
      this.shape = null;
    }
  };
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

export default Progress;
