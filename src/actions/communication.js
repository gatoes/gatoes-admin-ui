import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};

export const COMMUNICATION_TYPE_LISTING_SUCCESS = 'COMMUNICATION_TYPE_LISTING_SUCCESS';
export const DELETE_COMMUNICATION_TYPE_SUCCESS = 'DELETE_COMMUNICATION_TYPE_SUCCESS';

const ROOT_URL = API_ROOT;
// var token = "";


export function communitcationTypeListing(params){
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/communitcationtypelisting`
  });
}
export function communitcationTypeListingSuccess(payload){
  return {
      type: COMMUNICATION_TYPE_LISTING_SUCCESS,
      payload: payload
    }
}
export function addCommunicationType(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/sendbulknotification`
  });
}
export function communicationTypeDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/communicationtypedetailbyid`,
  });
}
export function deleteCommunicationType(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deletecommunicationtype`
  });
}
export function deleteCommunicationTypeSuccess(payload) {
  return {
    type: DELETE_COMMUNICATION_TYPE_SUCCESS,
    payload: payload
  };
}

