import store from 'store';
import { isWorkPhase } from 'store/reducer';

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

const didPhaseEnd = (prevState, nextState) =>
  isWorkPhase(prevState) !== isWorkPhase(nextState);

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
