import store from 'store';
import {
  isWorkPhase,
  getDuration,
  getStartTime,
  isInProgress
} from 'store/reducer';

// See: https://github.com/reactjs/redux/issues/303#issuecomment-125184409
const observeStore = (predicate, action) => {
  let prevState = store.getState();

  const onChange = () => {
    const nextState = store.getState();
    if (predicate(prevState, nextState)) {
      action(nextState);
    }
    prevState = nextState;
  };
  store.subscribe(onChange);
};

// Attempt to prevent notify when the user skips
const wasCloseToEnd = state => {
  const startTime = getStartTime(state);
  const elapsed = startTime ? Date.now() - startTime : 0;
  return isInProgress(state) && getDuration(state) - elapsed < 500;
};
const didPhaseEnd = (prevState, nextState) =>
  wasCloseToEnd(prevState) && !isInProgress(nextState);

const createMessage = state =>
  isWorkPhase(state) ? 'Break over, time to work!' : 'Take a break!';

const onPhaseEnd = runNotify => {
  observeStore(didPhaseEnd, state => runNotify(createMessage(state)));
};

const notifyUser = message => {
  const notification = new window.Notification(message);
  setTimeout(() => notification.close(), 4000);
};

Promise.resolve(window.Notification)
  .then(
    notification => (notification ? notification.requestPermission() : 'denied')
  )
  .then(permission => {
    permission === 'granted'
      ? onPhaseEnd(notifyUser)
      : onPhaseEnd(window.alert);
  });
