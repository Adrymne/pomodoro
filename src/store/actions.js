export const START = 'START';
export const start = currentTime => ({ type: START, timestamp: currentTime });

export const STOP = 'STOP';
export const stop = (startTime, currentTime, progress) => ({
  type: STOP,
  progress,
  elapsed: currentTime - startTime
});

export const UPDATE_PHASE_LENGTH = 'UPDATE_PHASE_LENGTH';
export const updatePhaseLength = phases => ({
  type: UPDATE_PHASE_LENGTH,
  phases
});
