import { combineReducers } from 'redux';
import { START, STOP, UPDATE_PHASE_LENGTH } from 'store/actions';

// actions: START, STOP, RESET, SKIP

const DEFAULT_LENGTH = {
  work: 25 * 60 * 1000,
  rest: 5 * 60 * 1000
};

const TIMER_DEFAULT = {
  inProgress: false,
  startTime: null,
  duration: DEFAULT_LENGTH.work,
  progress: 0
};

export const timer = (state = TIMER_DEFAULT, action) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        inProgress: true,
        startTime: action.currentTime
      };
    case STOP:
      return {
        ...state,
        startTime: null,
        duration: state.duration - (action.currentTime - state.startTime),
        progress: action.progress
      };
    case UPDATE_PHASE_LENGTH:
      return {
        ...state,
        duration: state.inProgress ? state.duration : action.length
      };
    default:
      return state;
  }
};

export const phases = (state = DEFAULT_LENGTH, action) =>
  action.type === UPDATE_PHASE_LENGTH
    ? { ...state, [action.phase]: action.length }
    : state;

export default combineReducers({ timer, phases });

// TODO: implement
export const isWorkPhase = state => true;

export const isRunning = state => !!state.timer.startTime;
export const getTimerState = state => ({
  inProgress: state.timer.inProgress,
  startTime: state.timer.startTime,
  duration: state.timer.duration,
  progress: state.timer.progress
});

export const getWorkLength = state => state.phases.work;
export const getRestLength = state => state.phases.rest;
