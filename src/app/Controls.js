import React from 'react';
import TimerInput from './controls/TimerInput';
import './Controls.css';

const Controls = () => (
  <div id="controls">
    <TimerInput label="Break Length" value={5} />
    <TimerInput label="Work Length" value={25} />
  </div>
);

export default Controls;
