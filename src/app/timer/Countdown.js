import React from 'react';
import './Countdown.css';

const calcPosition = diameter => ({
  position: 'absolute',
  top: diameter * 0.5
});

const padStart = (length, padding, str) =>
  padding.repeat(Math.max(0, length - str.length)) + str;

const formatTime = time => padStart(2, '0', time.toString());

const Countdown = ({ remaining, timerSize }) => (
  <div className="time-display" style={calcPosition(timerSize)}>
    {formatTime(Math.floor(remaining / 60))}
    :
    {formatTime(Math.floor(remaining % 60))}
  </div>
);

export default Countdown;
