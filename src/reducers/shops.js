import {
  _dispatch,
  SHOP_LIST_SUCCESS,
  CUISINE_LIST_SUCCESS,
  DELETE_SHOP_SUCCESS,
  UPDATE_SHOP_STATUS_SUCCESS,
  SHOP_DOCS_LIST_SUCCESS,
  ADD_SHOP_DOCS_SUCCESS,
  UPDATE_SHOP_DOCS_SUCCESS,
  SHOP_DOC_DELETE_SUCCESS,
  SHOP_CATEGORY_LIST_SUCCESS,
  DELETE_SHOP_CAT_SUCCESS,
  ADD_CUISINES_SUCCESS,
  UPDATE_CUISINES_SUCCESS,
  CUISINES_DELETE_SUCCESS,
  GALLERY_SUCCESS,
  DELETE_GALLERY,
  SHOP_BANNER_SUCCESS,
  DELETE_SHOP_BANNER,
  SUPER_SHOP_LIST_SUCCESS,
  DELETE_SUPER_MERCHANT
} from '../actions/shops';

const INITIAL_STATE = {status: null, shop_list: {shop:[]}, cuisine_list:[], activePage: 1, shop_docs:[], cat_list: [], gallery_list: [], banner_list: {}};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SHOP_LIST_SUCCESS:
      return _dispatch({ ...state, shop_list: action.payload, activePage: action.activePage}, true, 'shoplist');
      break;
    case CUISINE_LIST_SUCCESS:
      return _dispatch({ ...state, cuisine_list: action.payload}, true, 'cuisinelist');
      break;
    case DELETE_SHOP_SUCCESS:
      return (() => {
        const data = {...state.shop_list};
        data.shop.splice(action.payload, 1);
        return _dispatch({ ...state, shop_list: data}, true, 'shoplist');
      })();
      break;
    case UPDATE_SHOP_STATUS_SUCCESS:
      const data = {...state.shop_list};
      data.shop.map((item, index) =>{
        if(item.shopId == action.payload){
          data.shop[index].shopStatus = parseInt(action.status); 
        }
      });
      return _dispatch({ ...state, shop_list: data}, true, 'shoplist');
      break;

    case SHOP_DOCS_LIST_SUCCESS:
      return _dispatch({ ...state, shop_docs: action.payload}, true, 'shopdocs');
      break;
    case ADD_SHOP_DOCS_SUCCESS:
      return _dispatch({ ...state, shop_docs: [...state.shop_docs, action.payload]}, true, 'shopdocs');
      break;
    case UPDATE_SHOP_DOCS_SUCCESS:
      return (() => {
        const docs = action.payload;
        const itemIndex = action.index;
        const shop_docs = [...state.shop_docs];
        
        shop_docs.map((item, index) => {
          if(index == itemIndex){
            shop_docs[index].docs_type = docs.docs_type;
            shop_docs[index].expiry_date = docs.expiry_date;
          }
        });
        return _dispatch({ ...state, shop_docs}, true, 'shopdocs');
      })();
      break;
    case SHOP_DOC_DELETE_SUCCESS:
      return (() => {
        const data = [...state.shop_docs];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, shop_docs: data}, true, 'shopdocs');
      })();
      break;

    case SHOP_CATEGORY_LIST_SUCCESS:
      return _dispatch({ ...state, cat_list: action.payload}, true, 'catlist');
      break;
    case DELETE_SHOP_CAT_SUCCESS:
      return (() => {
        const data = {...state.cat_list};
        data.category.splice(action.payload, 1);
        return _dispatch({ ...state, cat_list: data}, true, 'catlist');
      })();
      break;
    case ADD_CUISINES_SUCCESS:
      return (() => {
        return _dispatch({ ...state, cuisine_list: [action.payload, ...state.cuisine_list]}, true, 'cuisinelist');
      })()
      break;

    case UPDATE_CUISINES_SUCCESS:
      return (() => {
        const cuisine = action.payload;
        const itemIndex = action.index;
        const cuisine_list = [...state.cuisine_list];
        cuisine_list.map((item, index) => {
          if(index == itemIndex){
            cuisine_list[index].cuisinesName = cuisine.cuisinesName;
          }
        });
        return _dispatch({ ...state, cuisine_list}, true, 'cuisinelist');
      })();
      break;
    case CUISINES_DELETE_SUCCESS:
      return (() => {
        const data = [...state.cuisine_list];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, cuisine_list: data}, true, 'cuisinelist');
      })();
      break;
    case GALLERY_SUCCESS:
      return _dispatch({ ...state, gallery_list: action.payload}, true, 'gallerylist');
      break;
    case DELETE_GALLERY:
      return (() => {
        const data = [...state.gallery_list];
        data.splice(action.payload, 1);
        return _dispatch({ ...state, gallery_list: data}, true, 'gallerylist');
      })();
      break;
    case SHOP_BANNER_SUCCESS:
      return _dispatch({ ...state, banner_list: action.payload}, true, 'bannerlist');
      break;
    case DELETE_SHOP_BANNER:
      return (() => {
        const data = {...state.banner_list};
        data.banners.splice(action.payload, 1);
        return _dispatch({ ...state, banner_list: data}, true, 'bannerlist');
      })();
      break;
    case SUPER_SHOP_LIST_SUCCESS:
      return _dispatch({ ...state, super_shop_list: action.payload, activePage: action.activePage}, true, 'supershoplist');
      break;
    case DELETE_SUPER_MERCHANT:
      return (() => {
        const data = {...state.super_shop_list};
        data.merchant.splice(action.payload, 1);
        return _dispatch({ ...state, super_shop_list: data}, true, 'supershoplist');
      })();
      break;
      
    default:
      return state;
  }
}