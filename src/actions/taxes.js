import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};

export const TAX_LISTING_SUCCESS = 'TAX_LISTING_SUCCESS';
export const DELETE_TAX_SUCCESS = 'DELETE_TAX_SUCCESS';

const ROOT_URL = API_ROOT;


export function taxListing(props){
  return axios({
    method: 'GET',
    data: props,
    url: `${ROOT_URL}/serviceprovider/getTaxList`
  });
}
export function taxListingSuccess(payload){
  return {
      type: TAX_LISTING_SUCCESS,
      payload: payload
    }
}
export function addTax(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addEditTax`
  });
}
export function taxDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getTaxById`,
  });
}
export function editTax(props, id){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addEditTax`
  });
}
export function deleteTax(props) {
  return axios({
    method: 'DELETE',
    data: props,
    url: `${ROOT_URL}/serviceprovider/deleteTax`
  });
}
export function deleteTaxSuccess(payload) {
  return {
    type: DELETE_TAX_SUCCESS,
    payload: payload
  };
}

export function taxCategoryListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getTaxCategoryList`,
  });
}

export function updateStatus(props, id){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/updateTaxStatus/`+id
  });
}
