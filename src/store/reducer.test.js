import * as SUT from './reducer';
import * as actions from './actions';

describe('START', () => {
  const action = actions.start(100);
  it('startTime', () => {
    const subject = SUT.startTime;

    const result = subject('blah', action);

    expect(result).toBe(100);
  });
});

describe('STOP', () => {
  const action = actions.stop(0, 20, 0.5);

  it('startTime', () => {
    const subject = SUT.startTime;

    const result = subject('blah', action);

    expect(result).toBeNull();
  });

  it('duration', () => {
    const subject = SUT.duration;

    const result = subject(55, action);

    expect(result).toBe(35);
  });

  it('progress', () => {
    const subject = SUT.progress;

    const result = subject('blah', action);

    expect(result).toBe(0.5);
  });
});
