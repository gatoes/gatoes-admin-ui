import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};

export const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS';
export const UNASSIGNED_ORDER_LIST_SUCCESS = 'UNASSIGNED_ORDER_LIST_SUCCESS';
export const OUTSTOCK_ORDER_LIST_SUCCESS = 'OUTSTOCK_ORDER_LIST_SUCCESS';
export const REBROADCAST_ORDER_SUCCESS = 'REBROADCAST_ORDER_SUCCESS';
export const HOURLY_ORDER_LIST_SUCCESS = 'HOURLY_ORDER_LIST_SUCCESS';
export const UPDATE_ORDER_LISTING_SOCKET = 'UPDATE_ORDER_LISTING_SOCKET';
export const UPDATE_ALT_ITEMS = 'UPDATE_ALT_ITEMS';
export const CANCEL_OUTSTOCK_ITEM = 'CANCEL_OUTSTOCK_ITEM';
export const REMOVE_OUTSTOCK_ITEM = 'REMOVE_OUTSTOCK_ITEM';

const ROOT_URL = API_ROOT;
var token = "";

export function orderListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getallorders`,
  });
}

export function orderListingSuccess(payload, activePage){
  return {
      type: ORDER_LIST_SUCCESS,
      payload: payload,
      activePage
    }
}

export function unassignedOrdersListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getunassignedtrip`,
  });
}

export function unassignedOrdersListingSuccess(payload, activePage){
  return {
      type: UNASSIGNED_ORDER_LIST_SUCCESS,
      payload: payload,
      activePage
    }
}

export function outOfStockOrdersListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getoutofstocklist`,
  });
}

export function outOfStockOrdersListingSuccess(payload, activePage){
  return {
      type: OUTSTOCK_ORDER_LIST_SUCCESS,
      payload: payload,
      activePage
    }
}

export function reBroadCastOrder(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/reassineorder`
  });
}
export function reBroadCastOrderSuccess(payload) {
  return {
    type: REBROADCAST_ORDER_SUCCESS,
    payload: payload
  };
}
export function orderDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/orderdetailbyid`,
  });
}
export function reorderByAdmin(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/reorderbyadmin`
  });
}
export function orderReporting(params){
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getorderreporting`
  });
}
export function getBasicOrderAnalytics(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/dashboard/getbasicorderanalytics`,
  });
}
export function getBasicRevenueAnalytics(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/dashboard/getbasicrevenueanalytics`,
  });
}
export function getLocationAnalytics(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/dashboard/getlocationanalytics`,
  });
}
export function getShopAnalytics(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/dashboard/getrestaurentanalytics`,
  });
}
export function getDetailOrderAnalytics(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/dashboard/getdetailorderanalytics`,
  });
}
export function getDetailLocationRevenue(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/dashboard/getdetaillocationrevenue`,
  });
}
export function getDetailRestaurentAnalytics(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/dashboard/getdetailrestaurentanalytics`,
  });
}

export function getZoneNewOldUserData(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/dashboard/getnewuserinzone`,
  });
}

export function cancelOrderByAdmin(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/cancelorderbyadmin`
  });
}
export function getHourlyReports(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/gethourlyreports`,
  });
}

export function getHourlyReportsSuccess(payload, activePage){
  return {
      type: HOURLY_ORDER_LIST_SUCCESS,
      payload: payload,
      activePage
    }
}

export function updateOutOfStockOrder(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/updateoutofstockorder`
  });
}

export function updateOrderListingSocket(payload){
  if(!payload.isUpdate){
    window.triggerAlert();
  }

  return {
      type: UPDATE_ORDER_LISTING_SOCKET,
      payload: payload
    }
}

export function setDeliveredByAdmin(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/setorderdelivered`,
  });
}

export function updateOrderStatusByAdmin(data){
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/updateOrderStatus`,
  });
}

export function cancelOutofStockOrderByAdmin(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/canceloutofstockorder`
  });
}

export function updateOutOfStockItemsAltQty(mainItemId, altItemId, qty){
  return {
      type: UPDATE_ALT_ITEMS,
      payload: {mainItemId, altItemId, qty}
    }
}

export function cancelOutOfStockItem(mainItemId){
  return {
      type: CANCEL_OUTSTOCK_ITEM,
      payload: mainItemId
    }
}

export function removeOutStockItem(){
  return {
    type: REMOVE_OUTSTOCK_ITEM
  }
}

export function refundByAdmin(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/refundByAdmin`
  });
}

export function refundListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/refundListing`,
  });
}

export function updateRefundStatus(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/updateRefundStatus`
  });
}

export function updateUnassignOrder(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/updateUnassignOrder`
  });
}

export function getDashboardDetails(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/dashboard/getDashboasrdDetails`,
  });
}