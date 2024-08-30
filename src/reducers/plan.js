import {
  _dispatch,
  PLAN_LISTING_SUCCESS,
  DELETE_PLAN_SUCCESS
} from '../actions/plans';

import {FromatValidationErrors} from "../constants";

const INITIAL_STATE = {plan_list: {} };

export default function(state = INITIAL_STATE, action) {
  let error;
  let keys;
  switch(action.type) {
    case PLAN_LISTING_SUCCESS:
      return _dispatch({ ...state, plan_list: action.payload }, true, 'planlist');
      break;
    case DELETE_PLAN_SUCCESS:
      return (() => {
        const data = {...state.plan_list};
        data.rows.splice(action.payload, 1);
        return _dispatch({ ...state, plan_list: data}, true, 'planlist');
      })();
    break;
    
    default:
      return state;
  }
}
