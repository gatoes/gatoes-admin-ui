import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};

export const CITY_LIST_SUCCESS = 'CITY_LIST_SUCCESS';
export const ADD_NEW_REGION_SUCCESS = 'ADD_NEW_REGION_SUCCESS';
export const REGION_LIST_SUCCESS = 'REGION_LIST_SUCCESS';
export const REGION_DETAIL_SUCCESS = 'REGION_DETAIL_SUCCESS';
export const REGION_DELETE_SUCCESS = 'REGION_DELETE_SUCCESS';
export const DELIVERY_REGION_LIST_SUCCESS = 'DELIVERY_REGION_LIST_SUCCESS';
export const ADD_NEW_GEOFENCE_SUCCESS = 'ADD_NEW_GEOFENCE_SUCCESS';
export const UPDATE_GEOFENCE_SUCCESS = 'UPDATE_GEOFENCE_SUCCESS';
export const BUSINESS_ZONE_LIST_SUCCESS = 'BUSINESS_ZONE_LIST_SUCCESS';
export const ADD_BUSINESS_ZONE_SUCCESS = 'ADD_BUSINESS_ZONE_SUCCESS';
export const UPDATE_BUSINESS_ZONE_SUCCESS = 'UPDATE_BUSINESS_ZONE_SUCCESS';
export const BUSINESS_ZONE_DELETE_SUCCESS = 'BUSINESS_ZONE_DELETE_SUCCESS';

const ROOT_URL = API_ROOT;
var token = "";

export function cityList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getspcities`,
  });
}

export function stateList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getstate`,
  });
}

export function cityListSuccess(payload){
  return {
      type: CITY_LIST_SUCCESS,
      payload: payload
    }
}

export function regionListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getregion`,
  });
}

export function regionListingSuccess(payload){
  return {
      type: REGION_LIST_SUCCESS,
      payload: payload
    }
}

export function addNewRegion(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addregion`
  });
}

export function addNewRegionSuccess(payload) {
  return {
    type: ADD_NEW_REGION_SUCCESS,
    payload: payload
  };
}

export function deleteRegion(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleteregion`
  });
}

export function deleteRegionSuccess(payload) {
  return {
    type: REGION_DELETE_SUCCESS,
    payload: payload
  };
}

export function regionDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getregionbyid`,
  });
}

export function regionItemDetailByIdSuccess(payload) {
  return {
    type: REGION_DETAIL_SUCCESS,
    payload: payload
  };
}

export function addDriverGeofencing(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/adddrivergeofencing`
  });
}

export function addDriverGeofencingSuccess(payload) {
  return {
    type: ADD_NEW_GEOFENCE_SUCCESS,
    payload: payload
  };
}

export function deliveryRegionListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getdeliveryregions`,
  });
}

export function deliveryRegionListingSuccess(payload){
  return {
      type: DELIVERY_REGION_LIST_SUCCESS,
      payload: payload
    }
}
export function getDeliveryRegionById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getdeliveryregionbyid`,
  });
}

export function updateDriverGeofencingSuccess(payload, index) {
  return {
    type: UPDATE_GEOFENCE_SUCCESS,
    payload: payload,
    index: index
  };
}

export function businessZoneListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getbusinesszone`,
  });
}

export function businessZoneListingSuccess(payload){
  return {
      type: BUSINESS_ZONE_LIST_SUCCESS,
      payload: payload
    }
}

export function addBusinessZone(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addbusinesszone`
  });
}

export function addBusinessZoneSuccess(payload) {
  return {
    type: ADD_BUSINESS_ZONE_SUCCESS,
    payload: payload
  };
}

export function getBusinessZoneById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getbusinesszonebyid`,
  });
}

export function updateBusinessZoneSuccess(payload, index) {
  return {
    type: UPDATE_BUSINESS_ZONE_SUCCESS,
    payload: payload,
    index: index
  };
}

export function deleteBusinessZone(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deletebusinesszone`
  });
}

export function deleteBusinessZoneSuccess(payload) {
  return {
    type: BUSINESS_ZONE_DELETE_SUCCESS,
    payload: payload
  };
}

export function getDeliveryRegionGroup(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getdeliveryregionforgroup`,
  });
}
export function updateZoneStatus(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/updatezonestatus`
  });
}

export function getDeliveryRegionWithZone(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getDeliveryRegionWithZone`,
  });
}

export function updateZoneShopStatus(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/updateZoneShopStatus`
  });
}



export function newBusinessZoneListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getbusinesszoneNew`,
  });
}
export function getdeliveryregionsNew(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getdeliveryregionsNew`,
  });
}

export function getRestaurentNew(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshopsNew`,
  });
}

export function getDiscountTypesUsingMicroservice(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getDiscountTypesUsingMicroservice`,
  });
}

export function getCouponsTypesUsingMicroservice(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getCouponsTypesUsingMicroservice`,
  });
}