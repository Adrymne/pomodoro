import { combineReducers } from 'redux';
import { START, STOP, UPDATE_PHASE_LENGTH } from 'store/actions';

// actions: START, STOP, RESET, SKIP

const DEFAULT_LENGTH = {
  work: 5 * 60 * 1000,
  rest: 1 * 60 * 1000
};

const isWork = (state = true, action) => state;

export const startTime = (state = null, action) => {
  switch (action.type) {
    case START:
      return action.timestamp;
    case STOP:
      return null;
    default:
      return state;
  }
};

export const duration = (state = DEFAULT_LENGTH.work, action) =>
  action.type === STOP ? state - action.elapsed : state;

export const progress = (state = 0, action) =>
  action.type === STOP ? action.progress : state;

const timer = combineReducers({ isWork, startTime, duration, progress });

export const phases = (state = DEFAULT_LENGTH, action) =>
  action.type === UPDATE_PHASE_LENGTH
    ? {
        work: 'work' in action.phases ? action.phases.work : state.work,
        rest: 'rest' in action.phases ? action.phases.rest : state.rest
      }
    : state;

export default combineReducers({ timer, phases });

export const isWorkPhase = state => state.timer.isWork;
export const isRunning = state => !!state.timer.startTime;
export const getTimerState = state => ({
  startTime: state.timer.startTime,
  duration: state.timer.duration,
  progress: state.timer.progress
});

export const getWorkLength = state => state.phases.work;
export const getRestLength = state => state.phases.rest;
