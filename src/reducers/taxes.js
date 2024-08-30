import {
  _dispatch,
  TAX_LISTING_SUCCESS,
  DELETE_TAX_SUCCESS
} from '../actions/taxes';

import {FromatValidationErrors} from "../constants";

const INITIAL_STATE = {tax_list: {} };

export default function(state = INITIAL_STATE, action) {
  let error;
  let keys;
  switch(action.type) {
    case TAX_LISTING_SUCCESS:
      return _dispatch({ ...state, tax_list: action.payload }, true, 'taxlist');
      break;
    case DELETE_TAX_SUCCESS:
      return (() => {
        const data = {...state.tax_list};
        data.rows.splice(action.payload, 1);
        return _dispatch({ ...state, tax_list: data}, true, 'taxlist');
      })();
    break;
    
    default:
      return state;
  }
}
