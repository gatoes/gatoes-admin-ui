import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';

export {_dispatch};

export const RECOMMENDED_ITEM_SUCCESS = 'RECOMMENDED_ITEM_SUCCESS';
export const MENU_LIST_SUCCESS = 'MENU_LIST_SUCCESS';
export const MENU_CATEGORY_SUCCESS = 'MENU_CATEGORY_SUCCESS';
export const ADD_MENU_ITEM_SUCCESS = 'ADD_MENU_ITEM_SUCCESS';
export const ADD_MENU_CATEGORY_SUCCESS = 'ADD_MENU_CATEGORY_SUCCESS';
export const CATEGORY_DETAIL = 'CATEGORY_DETAIL';
export const CATEGORY_DETAIL_SUCCESS = 'CATEGORY_DETAIL_SUCCESS';
export const MENU_ITEM_DETAIL_SUCCESS = 'MENU_ITEM_DETAIL_SUCCESS';
export const UPDATE_MENU_CATEGORY_ORDER_SUCCESS = 'UPDATE_MENU_CATEGORY_ORDER_SUCCESS';
export const REQUESTED_ITEM_LIST_SUCCESS = 'REQUESTED_ITEM_LIST_SUCCESS';
export const UPDATE_REQUESTED_ITEM_SUCCESS = 'UPDATE_REQUESTED_ITEM_SUCCESS';
export const DELETE_MENU_ITEM_SUCCESS = 'DELETE_MENU_ITEM_SUCCESS';

const ROOT_URL = API_ROOT;
var token = "";

export function getRecommendedItems(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getitemrecommended`,
    
  });
}

export function getRecommendedItemsSuccess(payload){
  return {
      type: RECOMMENDED_ITEM_SUCCESS,
      payload: payload
    }
}

export function menuListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getmenulist`,
    
  });
}

export function menuListingSuccess(payload){
  return {
      type: MENU_LIST_SUCCESS,
      payload: payload
    }
}

export function menuCategory(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshopcategories`,
    
  });
}

export function menuCategorySuccess(payload){
  return {
      type: MENU_CATEGORY_SUCCESS,
      payload: payload
    }
}

export function addMenuItems(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addItems`
  });
}

export function addMenuItemsSuccess(payload) {
  return {
    type: ADD_MENU_ITEM_SUCCESS,
    payload: payload
  };
}

export function deleteMenuItem(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deletemenuitem`
  });
}

export function deleteMenuItemSuccess(payload){
  return {
      type: DELETE_MENU_ITEM_SUCCESS,
      payload: payload
    }
}

export function addMenuCategories(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addcategory`
  });
}

export function addMenuCategoriesSuccess(payload) {
  return {
    type: ADD_MENU_CATEGORY_SUCCESS,
    payload: payload
  };
}

export function deleteMenuCategory(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deletecategory`
  });
}

export function categoryDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getcategorybyid`,
  });
}

export function categoryDetailByIdSuccess(payload) {
  return {
    type: CATEGORY_DETAIL_SUCCESS,
    payload: payload
  };
}

export function menuItemDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getitemsformid`,
  });
}

export function menuItemDetailByIdSuccess(payload) {
  return {
    type: MENU_ITEM_DETAIL_SUCCESS,
    payload: payload
  };
}

export function statusItemAvailability(data){
  return axios({
    method: 'PUT',
    data: data,
    url: `${ROOT_URL}/serviceprovider/markitemavailability`,
  });
}

export function updateMenuCategoryOrder(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/changecategoryposition`
  });
}

export function requestedItemListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getunapproveditems`,
  });
}

export function requestedItemListingSuccess(payload, activePage){
  return {
      type: REQUESTED_ITEM_LIST_SUCCESS,
      payload: payload,
      activePage
    }
}

export function updateRequestedItemStatus(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/acceptrejectitem`
  });
}

export function updateRequestedItemStatusSuccess(payload) {
  return {
    type: UPDATE_REQUESTED_ITEM_SUCCESS,
    payload: payload
  };
}

export function getItemRejectedReasonList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getrejectreasons`,
  });
}
export function changeItemPosition(data){
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/changeitemposition`
  });
}
export function addItemInfoCsv(data){
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/additeminfocsv`
  });
}
export function addItemVariantCsv(data){
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/additemvariantcsv`
  });
}
export function addItemAddonCsv(data){
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/additemaddoncsv`
  });
}
export function getShopCategoryCsv(params){
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/makeitemcsv`
  });
}
export function getItemReporting(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getitemreporting`,
  });
}

export function deleteMenuMultipleItems(data) {
  return axios({
    method: 'DELETE',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleteallitem`,
  });
}





