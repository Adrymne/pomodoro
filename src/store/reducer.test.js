import * as SUT from './reducer';
import * as actions from './actions';

describe('timer', () => {
  const subject = SUT.timer;

  it('initial state', () => {
    const result = subject(undefined, {});

    expect(result).toEqual({
      startTime: null,
      duration: null,
      progress: 0
    });
  });

  it('START', () => {
    const state = {
      startTime: null,
      duration: null,
      progress: 0
    };
    const action = actions.start(2000, 100);

    const result = subject(state, action);

    expect(result).toEqual({
      startTime: 100,
      duration: 2000,
      progress: state.progress
    });
  });

  it('STOP', () => {
    const state = {
      startTime: 100,
      duration: 1000, // 25 mintutes
      progress: 0
    };
    const action = actions.stop(150, 0.05);

    const result = subject(state, action);

    expect(result).toEqual({
      startTime: null,
      duration: 950,
      progress: 0.05
    });
  });

  it('NEXT_PHASE', () => {
    const state = {
      startTime: 100,
      duration: 50,
      progress: 0.5
    };
    const action = actions.nextPhase();

    const result = subject(state, action);

    expect(result).toEqual({
      startTime: null,
      duration: null,
      progress: 0
    });
  });
});

describe('phases', () => {
  it('UPDATE_PHASE_LENGTH', () => {
    const subject = SUT.phases;
    const state = { work: 25, rest: 2 };
    const action = actions.updatePhaseLength('work', 5);

    const result = subject(state, action);

    expect(result).toEqual({ work: 5, rest: state.rest });
  });
});
