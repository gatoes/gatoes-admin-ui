import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};
export const DRIVER_LIST_SUCCESS = 'DRIVER_LIST_SUCCESS';
export const DRIVER_DELETE_SUCCESS = 'DRIVER_DELETE_SUCCESS';
export const RIDER_DOCS_LIST_SUCCESS = 'RIDER_DOCS_LIST_SUCCESS';
export const ADD_RIDER_DOCS_SUCCESS = 'ADD_RIDER_DOCS_SUCCESS';
export const UPDATE_RIDER_DOCS_SUCCESS ='UPDATE_RIDER_DOCS_SUCCESS';
export const DRIVER_DOC_DELETE_SUCCESS = 'DRIVER_DOC_DELETE_SUCCESS';
export const DELIVERY_REGION_GROUP_LIST_SUCCESS = 'DELIVERY_REGION_GROUP_LIST_SUCCESS';
export const REGION_GROUP_DELETE_SUCCESS = 'REGION_GROUP_DELETE_SUCCESS';
export const DRIVER_GEOMAP_LIST_SUCCESS = 'DRIVER_GEOMAP_LIST_SUCCESS';
export const UPDATE_RIDER_STATUS_SOCKET = 'UPDATE_RIDER_STATUS_SOCKET';

const ROOT_URL = API_ROOT;
var token = "";

export function addDeliveryAgent(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/registerdriver`
  });
}

export function assignDriverToOrder(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/assigndrivertoorder`
  }); 
}

export function driverListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getdriverslist`,
  });
}

export function shopDriverListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getdriverbyshop`,
  });
}


export function driverListingSuccess(payload){
  return {
      type: DRIVER_LIST_SUCCESS,
      payload: payload
    }
}

export function driverDetailById(params){
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getdriversbyid`,
  });
}

export function deleteDriver(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deletedriver`
  });
}

export function deleteDriverSuccess(payload) {
  return {
    type: DRIVER_DELETE_SUCCESS,
    payload: payload
  };
}

export function setDriverStatus(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/activeinactivedriver`
  });
}

export function saveRiderSettings(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/saveridersetting`
  });
}

export function riderSettingsList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getridersettingslist`,
  });
}

export function getRiderCsvDownload(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getcsvfordriver`,
  });
}

export function riderDocsListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getriderdocumentlisting`,
  });
}

export function riderDocsListingSuccess(payload){
  return {
      type: RIDER_DOCS_LIST_SUCCESS,
      payload: payload
    }
}

export function addDriverDocs(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/adddriverdocument`
  });
}

export function addDriverDocsSuccess(payload){
  return {
      type: ADD_RIDER_DOCS_SUCCESS,
      payload: payload
    }
}

export function updateDriverDocsSuccess(payload, index) {
  return {
    type: UPDATE_RIDER_DOCS_SUCCESS,
    payload: payload,
    index: index
  }
}

export function getRiderDocsById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getriderdocumentbyid`,
  });
}

export function deleteRiderDocument(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleteriderdocument`
  });
}
export function deleteRiderDocumentSuccess(payload) {
  return {
    type: DRIVER_DOC_DELETE_SUCCESS,
    payload: payload
  };
}

export function driverRegionGroupList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getdeliveryregiongroup`,
  });
}

export function driverRegionGroupListSuccess(payload){
  return {
      type: DELIVERY_REGION_GROUP_LIST_SUCCESS,
      payload: payload
    }
}

export function addDeleveryRegionGroup(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/adddeliveryregiongroup`
  });
}

export function getDeliveryRegionGroupById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getdeliveryregiongroupbyid`,
  });
}

export function deleteDriverRegionGroup(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deletedeliveryregiongroup`
  });
}
export function deleteDriverRegionGroupSuccess(payload) {
  return {
    type: REGION_GROUP_DELETE_SUCCESS,
    payload: payload
  };
}

export function riderReporting(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getridersreporting`,
  });
}

export function reAssignRiderToOrder(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/reassignridertoorder`
  });
}

export function downloadRiderReporting(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getridepdfreport`,
  });
}

export function getRiderGeolocation(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getridersgeolocation`,
  });
}

export function getRiderGeolocationSuccess(payload){
  return {
      type: DRIVER_GEOMAP_LIST_SUCCESS,
      payload: payload
    }
}
export function updateRiderStatusSocket(payload){
  return {
      type: UPDATE_RIDER_STATUS_SOCKET,
      payload: payload
    }
}

export function getRiderTransactions(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getdrivertransaction`,
  });
}

export function getDriverAvailabiltyTimingById(params){
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getDriverAvailabiltyTimingById`
  })
}

export function getRiderPatner(params){
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getRiderPatner`
  })
}

export function freeDriverFromOrder(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/freeDriverFromOrder`
  });
}