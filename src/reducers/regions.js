import {
  _dispatch,
  CITY_LIST_SUCCESS,
  REGION_LIST_SUCCESS,
  REGION_DELETE_SUCCESS,
  DELIVERY_REGION_LIST_SUCCESS,
  ADD_NEW_GEOFENCE_SUCCESS,
  UPDATE_GEOFENCE_SUCCESS,
  BUSINESS_ZONE_LIST_SUCCESS,
  ADD_BUSINESS_ZONE_SUCCESS,
  UPDATE_BUSINESS_ZONE_SUCCESS,
  BUSINESS_ZONE_DELETE_SUCCESS
} from '../actions/regions';

const INITIAL_STATE = {status: null, city_list: [], region_list:{}, delivery_region_list: [], business_zone_list:[] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CITY_LIST_SUCCESS:
      return _dispatch({ ...state, city_list: action.payload}, true, 'citylist');
      break;
    case REGION_LIST_SUCCESS:
      return _dispatch({ ...state, region_list: action.payload}, true, 'regionlist');
      break;
    case DELIVERY_REGION_LIST_SUCCESS:
      return _dispatch({ ...state, delivery_region_list: action.payload}, true, 'deliveryregionlist');
      break;
    case ADD_NEW_GEOFENCE_SUCCESS:
      return _dispatch({ ...state, delivery_region_list: [...state.delivery_region_list, action.payload]}, true, 'deliveryregionlist');
      break;
    case UPDATE_GEOFENCE_SUCCESS:
      return (() => {
        const geofence = action.payload;
        const itemIndex = action.index;
        const delivery_region_list = [...state.delivery_region_list];
        delivery_region_list.map((item, index) => {
          if(index == itemIndex){
            delivery_region_list[index].name = geofence.name;
          }
        });
        return _dispatch({ ...state, delivery_region_list}, true, 'deliveryregionlist');
      })();
      break;
    case REGION_DELETE_SUCCESS:
      return (() => {
        const data = {...state.region_list};
        data.region.splice(action.payload, 1);
        return _dispatch({ ...state, region_list: data}, true, 'regionlist');
      })();
      break;
    case BUSINESS_ZONE_LIST_SUCCESS:
      return _dispatch({ ...state, business_zone_list: action.payload}, true, 'businesszonelist');
      break;
    case ADD_BUSINESS_ZONE_SUCCESS:
      return _dispatch({ ...state, business_zone_list: [...state.business_zone_list, action.payload]}, true, 'businesszonelist');
      break;
    case UPDATE_BUSINESS_ZONE_SUCCESS:
      return (() => {
        const geofence = action.payload;
        const itemIndex = action.index;
        const business_zone_list = [...state.business_zone_list];
        business_zone_list.map((item, index) => {
          if(index == itemIndex){
            business_zone_list[index].name = geofence.name;
          }
        });
        return _dispatch({ ...state, business_zone_list}, true, 'businesszonelist');
      })();
      break;
      case BUSINESS_ZONE_DELETE_SUCCESS:
      return (() => {
        const data = [...state.business_zone_list];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, business_zone_list: data}, true, 'businesszonelist');
      })();
      break;


    default:
      return state;
  }
}