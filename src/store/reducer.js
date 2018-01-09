import { combineReducers } from 'redux';
import { START, STOP, UPDATE_PHASE_LENGTH, NEXT_PHASE } from 'store/actions';

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
      return !state.inProgress
        ? {
            ...state,
            duration: action.length
          }
        : state;
    case NEXT_PHASE:
      return {
        ...TIMER_DEFAULT,
        duration: action.duration
      };
    default:
      return state;
  }
};

export const isWork = (state = true, action) =>
  action.type === NEXT_PHASE ? !state : state;

export const phases = (state = DEFAULT_LENGTH, action) =>
  action.type === UPDATE_PHASE_LENGTH
    ? { ...state, [action.phase]: action.length }
    : state;

export default combineReducers({ timer, isWork, phases });

export const isWorkPhase = state => state.isWork;

export const isRunning = state => !!state.timer.startTime;
export const getTimerState = state => state.timer;

export const getWorkLength = state => state.phases.work;
export const getRestLength = state => state.phases.rest;

export const getNextPhaseLength = state =>
  state.isWork ? state.phases.rest : state.phases.work;
