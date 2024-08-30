import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};
const ROOT_URL = API_ROOT;
var token = "";
export const DELIVERY_LIST_SUCCESS = 'DELIVERY_LIST_SUCCESS';
export const DELETE_DELIVERY_RULE_SUCCESS = 'DELETE_DELIVERY_RULE_SUCCESS';
export const REQUIRED_COUNTER_SUCCESS = 'REQUIRED_COUNTER_SUCCESS';
export const UPDATE_REQUIRED_COUNTER_SUCCESS = 'UPDATE_REQUIRED_COUNTER_SUCCESS';
export const MANAGE_REQUIRED_COUNTER_SUCCESS = 'MANAGE_REQUIRED_COUNTER_SUCCESS';

export function saveSettings(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/savesettings`
  });
}

export function settingsList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getsettingslist`,
  });
}

export function deliverySettingList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshopdeliverysetting`,
  });
}

export function deliverySettingListSuccess(payload){
  return {
      type: DELIVERY_LIST_SUCCESS,
      payload: payload
    }
}

export function saveDeliveryRule(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/adddeliveryrule`
  });
}

export function getDeliveryRuleById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getdeliveryrulebyid`,
  });
}

export function deleteDeliveryRule(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deletedeliveryrule`
  });
}


export function deleteDeliveryRuleSuccess(payload) {
  return {
    type: DELETE_DELIVERY_RULE_SUCCESS,
    payload: payload
  };
}

export function saveAppVersionDetail(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/saveappversiondetail`
  });
}

export function getAppVersion(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getappversion`,
  });
}

export function saveReferToFriendSettings(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/savereferralsetting`
  });
}

export function referToFriendDetail(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getreferfrienddetail`,
  });
}

export function saveUserAppSettings(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/saveuserappsettings`
  });
}

export function userAppSettingsList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getuserappsettings`,
  });
}

export function getRequiredCounter(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getRequiredCounter`,
  });
}

export function getRequiredCounterSuccess(payload) {
  return {
    type: REQUIRED_COUNTER_SUCCESS,
    payload: payload
  };
}

export function updateRequiredCounterSuccess(payload){
  return {
    type: UPDATE_REQUIRED_COUNTER_SUCCESS,
    payload: payload
  };
}

export function manageRequiredCounterSuccess(payload, counter){
  return {
    type: MANAGE_REQUIRED_COUNTER_SUCCESS,
    payload: payload,
    counter: counter
  };
}

export function changeAdminPassword(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/changeAdminPassword`
  });
}