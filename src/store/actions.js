export const START = 'START';
export const start = timestamp => ({ type: START, timestamp: Date.now() });

export const STOP = 'STOP';
export const stop = progress => ({
  type: STOP,
  progress
});
