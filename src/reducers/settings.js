import {
  _dispatch,
  DELIVERY_LIST_SUCCESS,
  DELETE_DELIVERY_RULE_SUCCESS,
  REQUIRED_COUNTER_SUCCESS,
  UPDATE_REQUIRED_COUNTER_SUCCESS,
  MANAGE_REQUIRED_COUNTER_SUCCESS
} from '../actions/settings';

const INITIAL_STATE = {status: null, delivery_list: []};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case DELIVERY_LIST_SUCCESS:
      return _dispatch({ ...state, delivery_list: action.payload}, true, 'deliverysetting');
      break;
    case DELETE_DELIVERY_RULE_SUCCESS:
      return (() => {
        const data = [...state.delivery_list];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, delivery_list: data}, true, 'deliverysetting');
      })();
      break;
    case REQUIRED_COUNTER_SUCCESS:
      return _dispatch({ ...state, required_counter: action.payload}, true, 'requiredcounter');
      break;
    case UPDATE_REQUIRED_COUNTER_SUCCESS:
      if(action.payload == 'outofstock'){
        let data = state.required_counter.outOfStockOrders - 1;
        return _dispatch({ ...state, required_counter: {...state.required_counter, outOfStockOrders: data}}, true, 'requiredcounter');  
      } else if(action.payload == 'unassignedorder'){
        let data = state.required_counter.unassignedOrder - 1;
        return _dispatch({ ...state, required_counter: {...state.required_counter, unassignedOrder: data}}, true, 'requiredcounter'); 
      } else if(action.payload == 'requesteditems'){
        let data = state.required_counter.requestedMenuItems - 1;
        return _dispatch({ ...state, required_counter: {...state.required_counter, requestedMenuItems: data}}, true, 'requiredcounter'); 
      }else {
        return state;
      }
      
      break;
    case MANAGE_REQUIRED_COUNTER_SUCCESS:
      if(action.payload == 'outofstock'){
        return _dispatch({ ...state, required_counter: {...state.required_counter, outOfStockOrders: action.counter}}, true, 'requiredcounter');  
      } else if(action.payload == 'unassignedorder'){
        return _dispatch({ ...state, required_counter: {...state.required_counter, unassignedOrder: action.counter}}, true, 'requiredcounter'); 
      } else if(action.payload == 'requesteditems'){
        return _dispatch({ ...state, required_counter: {...state.required_counter, requestedMenuItems: action.counter}}, true, 'requiredcounter'); 
      }else {
        return state;
      }
      
      break;
    default:
      return state;
  }
}