import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};

export const PLAN_LISTING_SUCCESS = 'PLAN_LISTING_SUCCESS';
export const DELETE_PLAN_SUCCESS = 'DELETE_PLAN_SUCCESS';

const ROOT_URL = API_ROOT;


export function planListing(props){
  return axios({
    method: 'GET',
    data: props,
    url: `${ROOT_URL}/plan/listing`
  });
}
export function planListingSuccess(payload){
  return {
      type: PLAN_LISTING_SUCCESS,
      payload: payload
    }
}
export function addPlan(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/plan/create`
  });
}
export function planDetailById(id) {
  return axios({
    method: 'GET',
    // params: params,
    url: `${ROOT_URL}/plan/get/`+id,
  });
}
export function editPlan(props, id){
  return axios({
    method: 'PATCH',
    data: props,
    url: `${ROOT_URL}/plan/update/`+id
  });
}
export function deletePlan(id) {
  return axios({
    method: 'DELETE',
    url: `${ROOT_URL}/subscription/plan/`+id
  });
}
export function deletePlanSuccess(payload) {
  return {
    type: DELETE_PLAN_SUCCESS,
    payload: payload
  };
}
export function updateStatus(props, id){
  return axios({
    method: 'PATCH',
    data: props,
    url: `${ROOT_URL}/plan/updateStatus/`+id
  });
}

export function getPlanDetails(id) {
  return axios({
    method: 'GET',
    // params: params,
    url: `${ROOT_URL}/plan/getDetail/`+id,
  });
}

export function planListingWithShop(props){
  return axios({
    method: 'GET',
    params: props,
    url: `${ROOT_URL}/plan/belongsToMerchant`
  });
}

export function assignPlanToMerchant(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/subscription/assign`
  });
}

export function removePlan(props, id){
  return axios({
    method: 'PATCH',
    data: props,
    url: `${ROOT_URL}/subscription/updateStatus/`+id
  });
}

