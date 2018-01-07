import * as SUT from './reducer';
import * as actions from './actions';

describe('START', () => {
  const action = actions.start(100);
  it('startTime', () => {
    const subject = SUT.startTime;

    const result = subject('blah', action);

    expect(result).toBe(action.timestamp);
  });
});

describe('STOP', () => {
  const action = actions.stop(0.5);

  it('startTime', () => {
    const subject = SUT.startTime;

    const result = subject('blah', action);

    expect(result).toBeNull();
  });

  it('progress', () => {
    const subject = SUT.progress;

    const result = subject('blah', action);

    expect(result).toBe(0.5);
  });
});
