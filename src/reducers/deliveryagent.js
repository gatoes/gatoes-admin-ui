import {
  _dispatch,
  DRIVER_LIST_SUCCESS,
  DRIVER_DELETE_SUCCESS,
  RIDER_DOCS_LIST_SUCCESS,
  ADD_RIDER_DOCS_SUCCESS,
  UPDATE_RIDER_DOCS_SUCCESS,
  DRIVER_DOC_DELETE_SUCCESS,
  DELIVERY_REGION_GROUP_LIST_SUCCESS,
  REGION_GROUP_DELETE_SUCCESS,
  DRIVER_GEOMAP_LIST_SUCCESS,
  UPDATE_RIDER_STATUS_SOCKET
} from '../actions/deliveryagent';

const INITIAL_STATE = { status: null, driver_list: {}, rider_docs:[], driver_region_group: [], driver_map_list: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  	case DRIVER_LIST_SUCCESS:
      return _dispatch({ ...state, driver_list: action.payload}, true, 'driverlist');
      break;
    case DRIVER_DELETE_SUCCESS:
      return (() => {
        const data = {...state.driver_list};
        data.agent.splice(action.payload, 1);
        return _dispatch({ ...state, driver_list: data}, true, 'driverlist');
      })();
      break;
    case RIDER_DOCS_LIST_SUCCESS:
      return _dispatch({ ...state, rider_docs: action.payload}, true, 'riderdocs');
      break;
    case ADD_RIDER_DOCS_SUCCESS:
      return _dispatch({ ...state, rider_docs: [...state.rider_docs, action.payload]}, true, 'riderdocs');
      break;
    case UPDATE_RIDER_DOCS_SUCCESS:
      return (() => {
        const docs = action.payload;
        const itemIndex = action.index;
        const rider_docs = [...state.rider_docs];
        
        rider_docs.map((item, index) => {
          if(index == itemIndex){
            rider_docs[index].docs_type = docs.docs_type;
            rider_docs[index].expiry_date = docs.expiry_date;
          }
        });
        return _dispatch({ ...state, rider_docs}, true, 'riderdocs');
      })();
      break;
    case DRIVER_DOC_DELETE_SUCCESS:
      return (() => {
        const data = [...state.rider_docs];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, rider_docs: data}, true, 'riderdocs');
      })();
      break;
    case DELIVERY_REGION_GROUP_LIST_SUCCESS:
      return _dispatch({ ...state, driver_region_group: action.payload}, true, 'regiongrouplisting');
      break;
    case REGION_GROUP_DELETE_SUCCESS:
      return (() => {
        const data = [...state.driver_region_group];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, driver_region_group: data}, true, 'regiongrouplisting');
      })();
      break;
    case DRIVER_GEOMAP_LIST_SUCCESS:
      return _dispatch({ ...state, driver_map_list: action.payload}, true, 'drivermaplist');
      break;

    case UPDATE_RIDER_STATUS_SOCKET:
      return(() => {
        const agent_updates = [...action.payload.agent];
        if(!state.driver_list.agent){
          state.driver_list.agent = []
        }
        const agent = [...state.driver_list.agent];
        agent_updates.map((nitem) => {
          agent.map((item, index) => {
            if(item.driverId == nitem.driverId){
              agent[index] = nitem;
            }
          });
        });
        return _dispatch({ ...state, driver_list: {...state.driver_list, agent: agent}}, true, 'driverlist');
        
      })();
      break;

    default:
      return state;
  }
}