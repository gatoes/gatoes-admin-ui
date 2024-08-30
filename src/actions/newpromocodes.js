import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};
const ROOT_URL = API_ROOT;
var token = "";
export const ITEM_OBJECT_SUCCESS = 'ITEM_OBJECT_SUCCESS';
export const CATEGORY_OBJECT_SUCCESS = 'CATEGORY_OBJECT_SUCCESS'
export const CATEGORY_ITEM_SUCCESS = 'CATEGORY_ITEM_SUCCESS'
export const SHOP_OBJECT_SUCCESS = 'SHOP_OBJECT_SUCCESS'
export const REGION_OBJECT_SUCCESS = 'REGION_OBJECT_SUCCESS'
export const ZONE_OBJECT_SUCCESS = 'ZONE_OBJECT_SUCCESS'
export const NEWPROMOCODE_LIST_SUCCESS = 'NEWPROMOCODE_LIST_SUCCESS'
export const DELETE_PROMO_CODE_SUCCESS = 'DELETE_PROMO_CODE_SUCCESS'
export const COUPON_REQUEST_LIST_SUCCESS = 'COUPON_REQUEST_LIST_SUCCESS'
export const DELETE_DEAL_SUCCESS = 'DELETE_DEAL_SUCCESS'
export const ENROLLMENT_LIST_SUCCESS = 'ENROLLMENT_LIST_SUCCESS'
export const BROADCAST_SUCCESS = 'BROADCAST_SUCCESS'
export function itemObjectSuccess(payload){
  return {
      type: ITEM_OBJECT_SUCCESS,
      payload: payload
    }
}

export function categoryObjectSuccess(payload){
  return {
      type: CATEGORY_OBJECT_SUCCESS,
      payload: payload
    }
}

export function categoryItemSuccess(payload){
  return {
      type: CATEGORY_ITEM_SUCCESS,
      payload: payload
    }
}
export function isBroadcastSuccess(payload){
  return {
      type: BROADCAST_SUCCESS,
      payload: payload
    }
}


export function shopObjectSuccess(payload){
  return {
      type: SHOP_OBJECT_SUCCESS,
      payload: payload
    }
}

export function regionObjectSuccess(payload){
  return {
      type: REGION_OBJECT_SUCCESS,
      payload: payload
    }
}


export function zoneObjectSuccess(payload){
  return {
      type: ZONE_OBJECT_SUCCESS,
      payload: payload
    }
}
export function savePromoCodeUsingMicroservice(data) {
  console.log(data,"DataFOrm")
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/savePromoCodeUsingMicroservice`
  });
}

export function promoCodeList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getCouponsUsingMicroservice`,
  });
}


export function promoCodeListSuccess(payload){
  return {
      type: NEWPROMOCODE_LIST_SUCCESS,
      payload: payload
    }
}


export function changeSequenceOrder(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/changeSequenceOrder`
  });
}

export function deletePromoCodeSuccess(payload) {
  return {
    type: DELETE_PROMO_CODE_SUCCESS,
    payload: payload
  };
}

export function deletePromoCode(data) {
  return axios({
    method: 'POST',
    params: data,
    url: `${ROOT_URL}/serviceprovider/deleteCoupon`
  });
}

export function changeCouponStatusUsingMicroservice(data) {
  return axios({
    method: 'POST',
    params: data,
    url: `${ROOT_URL}/serviceprovider/changeCouponStatusUsingMicroservice`
  });
}

export function changeCouponRestaurantStatusUsingMicroservice(data) {
  return axios({
    method: 'POST',
    params: data,
    url: `${ROOT_URL}/serviceprovider/changeCouponRestaurantStatusUsingMicroservice`
  });
}

export function getCouponsByIdUsingMicroservice(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getCouponsByIdUsingMicroservice`,
  });
}

export function updatePromoCodeUsingMicroservice(data) {
  console.log(data,"DataFOrm")
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/updatePromoCodeUsingMicroservice`
  });
}

export function couponRequestListSuccess(payload){
  return {
      type: COUPON_REQUEST_LIST_SUCCESS,
      payload: payload
    }
}
export function deleteDealSuccess(payload) {
  return {
    type: DELETE_DEAL_SUCCESS,
    payload: payload
  };
}
export function couponActionUsingMicroservice(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/couponActionUsingMicroservice`
  });
}


export function promotionEnrollmentListingUsingMicroservice(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/promotionEnrollmentListingUsingMicroservice`,
  });
}

export function enrollmentListSuccess(payload){
  return {
      type: ENROLLMENT_LIST_SUCCESS,
      payload: payload
    }
}
export function updateEnrollmentStatusUsingMicroservice(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/updateEnrollmentStatusUsingMicroservice`
  });
}

export function promotionBannerListingUsingMicroservice(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/promotionBannerListingUsingMicroservice`,
  });
}
export function activateCurativeFavouriteForShop(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/activateCurativeFavouriteForShop`
  });
}

export function activateAdsForShop(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/activateAdsForShop`
  });
}
