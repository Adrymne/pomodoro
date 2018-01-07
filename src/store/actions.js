export const START = 'START';
export const start = currentTime => ({ type: START, timestamp: currentTime });

export const STOP = 'STOP';
export const stop = (startTime, currentTime, progress) => ({
  type: STOP,
  progress,
  elapsed: currentTime - startTime
});
