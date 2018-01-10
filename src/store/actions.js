export const START = 'START';
export const start = (duration, currentTime) => ({
  type: START,
  duration,
  currentTime
});

export const STOP = 'STOP';
export const stop = (currentTime, progress) => ({
  type: STOP,
  progress,
  currentTime
});

export const NEXT_PHASE = 'NEXT_PHASE';
export const nextPhase = () => ({ type: NEXT_PHASE });

export const UPDATE_PHASE_LENGTH = 'UPDATE_PHASE_LENGTH';
export const updatePhaseLength = (phase, duration) => ({
  type: UPDATE_PHASE_LENGTH,
  phase,
  duration
});
