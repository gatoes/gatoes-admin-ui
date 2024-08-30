import { DELETE_PROMOTION_SUCCESS, PROMOTION_CATEGORY_LISTING_SUCCESS, PROMOTION_LISTING_SUCCESS } from '../actions/newpromotion';

const INITIAL_STATE = { status: null, promotionList: [],promotionCategoryList:[] };

export default function (state = INITIAL_STATE, action) {
  console.log(action, "HeyActionState", state)
  switch (action.type) {
    case PROMOTION_LISTING_SUCCESS:
      return {
        ...state,
        promotionList: action.payload,
        status: action.type,
        compName: 'promotionList'
      };
      case PROMOTION_CATEGORY_LISTING_SUCCESS:
        return {
          ...state,
          promotionCategoryList: action.payload,
          status: action.type,
          compName: 'promotionCategoryList'
        };
      
    case DELETE_PROMOTION_SUCCESS:
      const data = [...state.promotionList.promotions];
      data.splice(action.payload, 1);
      return {
        ...state,
        promotionList: {
          ...state.promotionList,
          promotions: data
        },
        status: action.type,
        compName: 'promotionList'
      };
    default:
      return state;
  }
}
