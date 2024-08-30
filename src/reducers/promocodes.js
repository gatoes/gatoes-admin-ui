import {
  _dispatch,
  PROMOCODE_LIST_SUCCESS,
  DELETE_PROMO_CODE_SUCCESS
} from '../actions/promocodes';

const INITIAL_STATE = {status: null, promocode_list: []};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case PROMOCODE_LIST_SUCCESS:
      return _dispatch({ ...state, promocode_list: action.payload}, true, 'promocodelist');
      break;
    case DELETE_PROMO_CODE_SUCCESS:
      return (() => {
        const data = [...state.promocode_list];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, promocode_list: data}, true, 'promocodelist');
      })();
      break;
    default:
      return state;
  }
}