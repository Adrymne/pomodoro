import { combineReducers } from 'redux';
import { START, STOP } from 'store/actions';

// actions: START, STOP, RESET, SKIP

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

const duration = (state = 60, action) => state;

export const progress = (state = 0, action) =>
  action.type === STOP ? action.progress : state;

const timer = combineReducers({ isWork, startTime, duration, progress });

export default combineReducers({ timer });

export const isWorkPhase = state => state.timer.isWork;
export const getTimerState = state => ({
  startTime: state.timer.startTime,
  duration: state.timer.duration,
  progress: state.timer.progress
});
