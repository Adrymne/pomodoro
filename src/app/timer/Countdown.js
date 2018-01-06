import React from 'react';
import './Countdown.css';

const calcPosition = diameter => ({
  position: 'absolute',
  top: diameter * 0.5
});

const Countdown = ({ minutes, seconds, timerSize }) => (
  <div className="time-display" style={calcPosition(timerSize)}>
    {minutes}:{seconds}
  </div>
);

export default Countdown;
