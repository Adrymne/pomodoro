import { combineReducers } from 'redux';
import {
  START,
  STOP,
  UPDATE_PHASE_LENGTH,
  NEXT_PHASE,
  RESET_PHASE
} from 'store/actions';

const DEFAULT_LENGTH = {
  work: 5000,
  // work: 25 * 60 * 1000,
  rest: 5 * 60 * 1000
};

const TIMER_DEFAULT = {
  startTime: null,
  duration: null,
  progress: 0
};

export const timer = (state = TIMER_DEFAULT, action) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        duration: action.duration,
        startTime: action.currentTime
      };
    case STOP:
      return {
        ...state,
        startTime: null,
        duration: state.duration - (action.currentTime - state.startTime),
        progress: action.progress
      };
    case NEXT_PHASE:
    case RESET_PHASE:
      return { ...TIMER_DEFAULT };
    default:
      return state;
  }
};

export const isWork = (state = true, action) =>
  action.type === NEXT_PHASE ? !state : state;

export const phases = (state = DEFAULT_LENGTH, action) =>
  action.type === UPDATE_PHASE_LENGTH
    ? { ...state, [action.phase]: action.duration }
    : state;

export default combineReducers({ timer, isWork, phases });

// SELECTORS

export const isWorkPhase = state => state.isWork;

export const getWorkLength = state => state.phases.work;
export const getRestLength = state => state.phases.rest;

export const getActivePhaseLength = state =>
  isWorkPhase(state) ? getWorkLength(state) : getRestLength(state);

export const isRunning = state => !!state.timer.startTime;
export const getStartTime = state => state.timer.startTime;
export const getProgress = state => state.timer.progress;
export const isInProgress = state => !!state.timer.duration;
export const getDuration = state =>
  isInProgress(state) ? state.timer.duration : getActivePhaseLength(state);
