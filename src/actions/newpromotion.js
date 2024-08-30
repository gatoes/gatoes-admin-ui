import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};
export const PROMOTION_LISTING_SUCCESS = 'PROMOTION_LISTING_SUCCESS';
export const DELETE_PROMOTION_SUCCESS = 'DELETE_PROMOTION_SUCCESS'
export const PROMOTION_CATEGORY_LISTING_SUCCESS = 'PROMOTION_CATEGORY_LISTING_SUCCESS'
const ROOT_URL = API_ROOT;

export function categoryTypeListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getPromotionCategoryUsingMicroservice`,
  });
}


export function createPromotionUsingMicroservice(data) {
    return axios({
      method: 'POST',
      data: data,
      url: `${ROOT_URL}/serviceprovider/createPromotionUsingMicroservice`
    });
  }


export function promotionListingUsingMicroservice(params) {
    return axios({
      method: 'GET',
      params: params,
      url: `${ROOT_URL}/serviceprovider/promotionListingUsingMicroservice`,
    });
  }
  
  export function promotionListingSuccess(payload){
    return {
        type: PROMOTION_LISTING_SUCCESS,
        payload: payload
      }
  }

  
export function deletePromotionSuccess(payload) {
    return {
      type: DELETE_PROMOTION_SUCCESS,
      payload: payload
    };
  }


export function deletePromotionUsingMicroservice(data) {
    console.log(data,"dataPayload")
    return axios({
      method: 'DELETE',
      data: data,
      url: `${ROOT_URL}/serviceprovider/deletePromotionUsingMicroservice`
    });
  }
  
  export function promotionByIdUsingMicroservice(params) {
    return axios({
      method: 'GET',
      params: params,
      url: `${ROOT_URL}/serviceprovider/promotionByIdUsingMicroservice`,
    });
  }
  
  export function updatePromotionUsingMicroservice(data) {
    return axios({
      method: 'POST',
      data: data,
      url: `${ROOT_URL}/serviceprovider/updatePromotionUsingMicroservice`
    });
  }


export function createPromotionCategoryUsingMicroservice(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/createPromotionCategoryUsingMicroservice`
  });
}
export function updatePromotionCategoryUsingMicroservice(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/updatePromotionCategoryUsingMicroservice`
  });
}


  
export function getPromotionCategoryUsingMicroservice(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getPromotionCategoryUsingMicroservice`,
  });
}

export function promotionCatListingSuccess(payload){
  return {
      type: PROMOTION_CATEGORY_LISTING_SUCCESS,
      payload: payload
    }
}

export function getPromotionCategoryByIdUsingMicroservice(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getPromotionCategoryByIdUsingMicroservice`,
  });
}

export function enrollPromotionThroughAdminUsingMicroservice(data) {
  return axios({
    method: "POST",
    data: data,
    url: `${ROOT_URL}/serviceprovider/enrollPromotionThroughAdminUsingMicroservice`,
  });
}

export function promotionReporting(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/promotionReportingUsingMicroservice`,
  });
}