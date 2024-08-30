import {
  _dispatch,
  ORDER_LIST_SUCCESS,
  UNASSIGNED_ORDER_LIST_SUCCESS,
  OUTSTOCK_ORDER_LIST_SUCCESS,
  REBROADCAST_ORDER_SUCCESS,
  HOURLY_ORDER_LIST_SUCCESS,
  UPDATE_ORDER_LISTING_SOCKET,
  UPDATE_ALT_ITEMS,
  CANCEL_OUTSTOCK_ITEM,
  REMOVE_OUTSTOCK_ITEM
} from '../actions/orders';

const INITIAL_STATE = {status: null, order_list: {}, unassigned_order_list: {}, outstock_order_list: {}, activePage: 1, hourly_order_list: [], outstock_alt_items_list: {}};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case UPDATE_ALT_ITEMS:
      return (() => {
        const items = {...state.outstock_alt_items_list};
        const {mainItemId, altItemId, qty} = action.payload;
        if(typeof items[mainItemId] === 'undefined'){
          items[mainItemId] = {}
        };
        if(!parseInt(qty)){
          if(typeof items[mainItemId][altItemId] !== 'undefined')
            delete items[mainItemId][altItemId];
        }else{
          items[mainItemId] = {...items[mainItemId], [altItemId]: parseInt(qty)};
        }
        console.log('items', items);
        return _dispatch({ ...state, outstock_alt_items_list: items}, true, 'outstockAltItems');
      })();
      break;
    case CANCEL_OUTSTOCK_ITEM:
      return (() => {
        const items = {...state.outstock_alt_items_list};
        const mainItemId = action.payload;
        if(typeof items[mainItemId] !== 'undefined'){
          delete items[mainItemId];
        };
        return _dispatch({ ...state, outstock_alt_items_list: items}, true, 'outstockAltItems');
      })();
      break;
    case REMOVE_OUTSTOCK_ITEM:
      return (() => {
        return _dispatch({ ...state, outstock_alt_items_list: {}}, true, 'outstockAltItems');
      })();
      break;
    case ORDER_LIST_SUCCESS:
      return _dispatch({ ...state, order_list: action.payload, activePage: action.activePage}, true, 'orderlist');
      break;
    case UNASSIGNED_ORDER_LIST_SUCCESS:
      return _dispatch({ ...state, unassigned_order_list: action.payload, activePage: action.activePage}, true, 'unassignorderlist');
      break;
    case OUTSTOCK_ORDER_LIST_SUCCESS:
      return _dispatch({ ...state, outstock_order_list: action.payload, activePage: action.activePage}, true, 'outofstockorderlist');
      break;
    case REBROADCAST_ORDER_SUCCESS:
      return (() => {
        const data = [...state.unassigned_order_list.orders];
        data.splice(action.payload, 1);
        let newState = {...state.unassigned_order_list}
        newState.orders = data;
        return _dispatch({...state,unassigned_order_list: newState}, true, 'unassignorderlist');
      })();
      break;
    case UPDATE_ORDER_LISTING_SOCKET:
      return(() => {
        if(action.payload.isUpdate === true){
          const order_updates = [...action.payload.order];
          if(!state.order_list.orders){
            state.order_list.orders = []
          }
          const orders = [...state.order_list.orders];
          order_updates.map((nitem) => {
            orders.map((item, index) => {
              if(item.orderId == nitem.orderId){
                orders[index] = nitem;
              }
            });
          });
          return _dispatch({ ...state, order_list: {...state.order_list, orders: orders}}, true, 'orderlist');
        } else {
          if(!state.order_list.orders){
            state.order_list.orders = []
          }
          return _dispatch({ ...state, order_list: {...state.order_list, orders: [...action.payload.order, ...state.order_list.orders]}}, true, 'orderlist');
        }
      })();
      break;
    case HOURLY_ORDER_LIST_SUCCESS:
      return _dispatch({ ...state, hourly_order_list: action.payload, activePage: action.activePage}, true, 'hourlyorderlist');
      break;
    default:
      return state;
  }
}