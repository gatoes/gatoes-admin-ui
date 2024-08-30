import {
  _dispatch,
  USER_NOTIFICATION_COUNTER
} from '../actions/notifications';

const INITIAL_STATE = {status: null, notification_count: 0};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case USER_NOTIFICATION_COUNTER:
      return _dispatch({ state, notification_count: action.payload}, true, 'notices');
      break;
    default:
      return state;
  }
}