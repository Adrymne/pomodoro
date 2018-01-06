import { combineReducers } from 'redux';

// user actions: START, STOP, RESET, SKIP
// timer actions: TICK

const isRunning = (state = false, { type }) => state;

export default combineReducers({ isRunning });
