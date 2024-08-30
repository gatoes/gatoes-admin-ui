import {
  _dispatch,
	SIGNIN_USER,
  SIGNIN_USER_PENDING,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
  COUNTRY_LIST_SUCCESS,
  LOGOUT_USER,
  ROLE_LISTING_SUCCESS,
  DELETE_ROLE_SUCCESS,
  STAFF_LISTING_SUCCESS,
  DELETE_STAFF_SUCCESS,
  FAQ_LISTING_SUCCESS,
  DELETE_FAQ_SUCCESS,
  CUSTOMER_LIST_SUCCESS,
  USER_LIST_SUCCESS,
  DELETE_USER_SUCCESS,
  RECOVER_USER_SUCCESS
} from '../actions/users';

import {FromatValidationErrors} from "../constants";

const INITIAL_STATE = {user: null, status:null, error:null, loading: false, auth: false, country_list: [], role_list: [], staff_list: [], faq_list: [], customer_list: {},user_list:{} };

export default function(state = INITIAL_STATE, action) {
  let error;
  let keys;
  switch(action.type) {
    case SIGNIN_USER_PENDING:// sign in user,  set loading = true and status = signin
      return { ...state, user: null, status:'signin', error:null, loading: true};

    case SIGNIN_USER_SUCCESS:
      console.log('action', action);
      return { ...state, user: action.data, auth: true, error:null, loading: false}; //<-- authenticated

    case SIGNIN_USER_FAILURE:// return error and make loading = false
      keys = {email: '', password: '', sub_domain: ''};
      error = FromatValidationErrors(action.data, keys);
      return { ...state, user: null, status:'signin', error: error, loading: false};

    case COUNTRY_LIST_SUCCESS:
      return _dispatch({ ...state, country_list: action.payload}, true, 'country');
      break;
    case ROLE_LISTING_SUCCESS:
      return _dispatch({ ...state, role_list: action.payload }, true, 'rolelist');
      break;
    case DELETE_ROLE_SUCCESS:
      return (() => {
        const data = [...state.role_list];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, role_list: data}, true, 'rolelist');
      })();
      break;
    case STAFF_LISTING_SUCCESS:
      return _dispatch({ ...state, staff_list: action.payload }, true, 'stafflist');
      break;
    case DELETE_STAFF_SUCCESS:
      return (() => {
        const data = [...state.staff_list];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, staff_list: data}, true, 'stafflist');
      })();
      break;
    case FAQ_LISTING_SUCCESS:
      return _dispatch({ ...state, faq_list: action.payload }, true, 'faqlist');
      break;
    case DELETE_FAQ_SUCCESS:
      return (() => {
        const data = [...state.faq_list];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, faq_list: data}, true, 'faqlist');
      })();
      break;
    case CUSTOMER_LIST_SUCCESS:
      return _dispatch({ ...state, customer_list: action.payload, activePage: action.activePage}, true, 'customerlist');
      break;
      case USER_LIST_SUCCESS:
        return _dispatch({ ...state, user_list: action.payload, activePage: action.activePage}, true, 'userlist');
        break;
        case DELETE_USER_SUCCESS:
          return (() => {
            const data = {...state.user_list};
            console.log(data, "DataDelete")
            data.user.splice(action.payload, 1);
            return _dispatch({ ...state, user_list: data}, true, 'user_list');
          })();
        break;
      
    case LOGOUT_USER:

      return INITIAL_STATE;

    
    default:
      return state;
  }
}
