import * as SUT from './reducer';
import * as actions from './actions';

describe('timer', () => {
  const subject = SUT.timer;

  it('initial state', () => {
    const result = subject(undefined, {});

    expect(result).toEqual({
      inProgress: false,
      startTime: null,
      duration: 25 * 60 * 1000, // 25 mintutes
      progress: 0
    });
  });

  it('START', () => {
    const state = {
      inProgress: false,
      startTime: null,
      duration: 25 * 60 * 1000, // 25 mintutes
      progress: 0
    };
    const action = actions.start(100);

    const result = subject(state, action);

    expect(result).toEqual({
      inProgress: true,
      startTime: 100,
      duration: state.duration,
      progress: state.progress
    });
  });

  it('STOP', () => {
    const state = {
      inProgress: true,
      startTime: 100,
      duration: 1000, // 25 mintutes
      progress: 0
    };
    const action = actions.stop(150, 0.05);

    const result = subject(state, action);

    expect(result).toEqual({
      inProgress: state.inProgress,
      startTime: null,
      duration: 950,
      progress: 0.05
    });
  });

  describe('UPDATE_PHASE_LENGTH', () => {
    it('timer not started yet', () => {
      const state = {
        inProgress: false,
        startTime: null,
        duration: 1000,
        progress: 0
      };
      const action = actions.updatePhaseLength('work', 2000);

      const result = subject(state, action);

      expect(result).toEqual({
        inProgress: state.inProgress,
        startTime: state.startTime,
        duration: 2000,
        progress: state.progress
      });
    });

    it('timer has been started', () => {
      const state = {
        inProgress: true,
        startTime: null,
        duration: 950,
        progress: 0.05
      };
      const action = actions.updatePhaseLength('work', 2000);

      const result = subject(state, action);

      expect(result).toEqual(state);
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
