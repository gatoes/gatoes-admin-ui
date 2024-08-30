import {
  _dispatch,
  MENU_LIST_SUCCESS,
  MENU_CATEGORY_SUCCESS,
  REQUESTED_ITEM_LIST_SUCCESS,
  UPDATE_REQUESTED_ITEM_SUCCESS,
  DELETE_MENU_ITEM_SUCCESS
} from '../actions/menus';

const INITIAL_STATE = {status: null, menu_list: [], menu_category:[], requested_item_list:[] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case MENU_LIST_SUCCESS:
      return _dispatch({ ...state, menu_list: action.payload}, true, 'menuFullList');
      break;
    case MENU_CATEGORY_SUCCESS:
      return _dispatch({ ...state, menu_category: action.payload}, true, 'menuCategory');
      break;
    case REQUESTED_ITEM_LIST_SUCCESS:
      return _dispatch({ ...state, requested_item_list: action.payload, activePage: action.activePage}, true, 'requesteditemlist');
      break;
    case UPDATE_REQUESTED_ITEM_SUCCESS:
      return (() => {
        const data = {...state.requested_item_list};
        data.items.splice(action.payload, 1);
        return _dispatch({ ...state, requested_item_list: data}, true, 'requesteditemlist');
      })();
      break;
    case DELETE_MENU_ITEM_SUCCESS:
      return _dispatch({ ...state, menu_list: action.payload}, true, 'menuFullList');
      break;
    default:
      return state;
  }
}