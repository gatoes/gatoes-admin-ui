import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};
const ROOT_URL = API_ROOT;
var token = "";
export const PROMOCODE_LIST_SUCCESS = 'PROMOCODE_LIST_SUCCESS';
export const DELETE_PROMO_CODE_SUCCESS = 'DELETE_PROMO_CODE_SUCCESS';

export function promoCodeList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getpromocodelist`,
  });
}

export function promoCodeListSuccess(payload){
  return {
      type: PROMOCODE_LIST_SUCCESS,
      payload: payload
    }
}

export function deletePromoCode(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deletepromorule`
  });
}

export function deletePromoCodeSuccess(payload) {
  return {
    type: DELETE_PROMO_CODE_SUCCESS,
    payload: payload
  };
}

export function savePromoCode(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/savepromocode`
  });
}

export function promoRuleDetail(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/promoruledetail`,
  });
}

export function couponListByRuleId(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getcouponlistbyruleid`,
  });
}

export function setRuleStatus(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/setrulesstatus`
  });
}

export function setFullScreenPromoStatus(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/setFullScreenPromoStatus`
  });
}

export function getPromoCodeById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getpromocodebyid`,
  });
}

export function updatePromoLanguage(data) {
  return axios({
    method: 'PUT',
    data: data,
    url: `${ROOT_URL}/serviceprovider/updatepromolanguage`
  });
}

export function changePromoPosition(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/changePromoPosition`
  });
}