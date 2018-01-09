export const START = 'START';
export const start = currentTime => ({ type: START, currentTime });

export const STOP = 'STOP';
export const stop = (currentTime, progress) => ({
  type: STOP,
  progress,
  currentTime
});

export const NEXT_PHASE = 'NEXT_PHASE';
export const nextPhase = duration => ({ type: NEXT_PHASE, duration });

export const UPDATE_PHASE_LENGTH = 'UPDATE_PHASE_LENGTH';
export const updatePhaseLength = (phase, length) => ({
  type: UPDATE_PHASE_LENGTH,
  phase,
  length
});
