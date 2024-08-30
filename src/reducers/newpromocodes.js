import { CATEGORY_OBJECT_SUCCESS, ITEM_OBJECT_SUCCESS,CATEGORY_ITEM_SUCCESS,SHOP_OBJECT_SUCCESS, REGION_OBJECT_SUCCESS, ZONE_OBJECT_SUCCESS, NEWPROMOCODE_LIST_SUCCESS, DELETE_PROMO_CODE_SUCCESS, COUPON_REQUEST_LIST_SUCCESS, DELETE_DEAL_SUCCESS,ENROLLMENT_LIST_SUCCESS,BROADCAST_SUCCESS } from '../actions/newpromocodes';
import {
  _dispatch,
} from '../actions/newpromocodes';

const INITIAL_STATE = {status: null, item_Object: [],category_Object:[],categoryItems:[],shop_Object:[],region_Object:[],zone_Object:[],promocodeList:[],dealsList:[],enrollmentList:[],isBroadCast:0};

export default function(state = INITIAL_STATE, action) {
  console.log(action,"HeyAction")
  switch(action.type) {
    case ITEM_OBJECT_SUCCESS:
      return _dispatch({ ...state, item_Object: [...state.item_Object ,action.payload]}, true, 'item_Object');
      break;
      case CATEGORY_OBJECT_SUCCESS:
        return _dispatch({ ...state, category_Object: [...state.category_Object ,action.payload]}, true, 'category_Object')
      break;
      case CATEGORY_ITEM_SUCCESS:
        return _dispatch({ ...state, categoryItems: [...state.categoryItems, action.payload]}, true, 'category_Item')
      break;
      case SHOP_OBJECT_SUCCESS:
        return _dispatch({ ...state, shop_Object: [...state.shop_Object,action.payload]}, true, 'shop_Object')
      break;
      case REGION_OBJECT_SUCCESS:
        return _dispatch({ ...state, region_Object: [...state.region_Object, action.payload]}, true, 'region_Object')
      break;
      case ZONE_OBJECT_SUCCESS:
        return _dispatch({ ...state, zone_Object: [...state.zone_Object,action.payload]}, true, 'zone_Object')
      break;
      case NEWPROMOCODE_LIST_SUCCESS:
        return _dispatch({ ...state, promocodeList: action.payload}, true, 'promocodeList');
        break;
      case DELETE_PROMO_CODE_SUCCESS:
        return (() => {
          const data = [...state.promocodeList];
          data.splice(action.payload, 1);
          return _dispatch({ ...state, promocodeList: data}, true, 'promocodeList');
        })();
        break;
        case COUPON_REQUEST_LIST_SUCCESS:
        return _dispatch({ ...state, dealsList: action.payload}, true, 'dealsList');
        break;
        case BROADCAST_SUCCESS:
        return _dispatch({ ...state, isBroadCast: action.payload}, true, 'isBroadCast');
        break;
      case DELETE_DEAL_SUCCESS:
        return (() => {
          const data = [...state.dealsList];
          data.splice(action.payload, 1);
          return _dispatch({ ...state, dealsList: data}, true, 'dealsList');
        })();
        break;
        case ENROLLMENT_LIST_SUCCESS:
          return _dispatch({ ...state, enrollmentList: action.payload}, true, 'enrollmentList');
          break;
    default:
      return state;
  }
}