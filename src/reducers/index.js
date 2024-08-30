import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import User from './users';
import Region from './regions';
import Shop from './shops';
import DeliveryAgent from './deliveryagent';
import Menu from './menus';
import Order from './orders';
import Setting from './settings';
import Promocode from './promocodes';
import Communication from './communication';
import Notification from './notification';
import Plan from './plan';
import Taxes from './taxes';
import NewPromoCode from "./newpromocodes"
import NewPromotionCode from "./newpromotion"

const appReducer = combineReducers({
  form: formReducer,
  User,
  Region,
  Shop,
  DeliveryAgent,
  Menu,
  Order,
  Setting,
  Promocode,
  Communication,
  Notification,
  Plan,
  Taxes,
  NewPromoCode,
  NewPromotionCode,
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer;