import {
  _dispatch,
  COMMUNICATION_TYPE_LISTING_SUCCESS,
  DELETE_COMMUNICATION_TYPE_SUCCESS
} from '../actions/communication';

const INITIAL_STATE = { status: null, msg_type_list: {} };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case COMMUNICATION_TYPE_LISTING_SUCCESS:
      return _dispatch({ ...state, msg_type_list: action.payload }, true, 'communicationtypelist');
      break;
    case DELETE_COMMUNICATION_TYPE_SUCCESS:
      return (() => {
        const data = [...state.msg_type_list];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, msg_type_list: data}, true, 'communicationtypelist');
      })();
      break;
    default:
      return state;
  }
}