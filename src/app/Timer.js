import React from 'react';
import Progress from './timer/Progress';
import Countdown from './timer/Countdown';
import './Timer.css';

const calcSize = () => Math.min(window.innerWidth, window.innerHeight) * 0.7;

const Timer = () => (
  <div id="timer">
    <Progress color="red" progress={0.5} timerSize={calcSize()} />
    <Countdown minutes={24} seconds={49} timerSize={calcSize()} />
  </div>
);

export default Timer;
