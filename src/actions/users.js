import axios from 'axios';

import { API_ROOT, _dispatch } from '../constants';

export {_dispatch};
//Sign In User
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_PENDING = 'SIGNIN_USER_PENDING';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const COUNTRY_LIST_SUCCESS = 'COUNTRY_LIST_SUCCESS';


export const USER_DETAIL = 'USER_DETAIL';
export const ADD_SHOP_ORDER_TIMING_SUCCESS = 'ADD_SHOP_ORDER_TIMING_SUCCESS';
export const SHOP_TIMING_SUCCESS ='SHOP_TIMING_SUCCESS';
export const ROLE_LISTING_SUCCESS = 'ROLE_LISTING_SUCCESS';
export const DELETE_ROLE_SUCCESS = 'DELETE_ROLE_SUCCESS';
export const STAFF_LISTING_SUCCESS = 'STAFF_LISTING_SUCCESS';
export const DELETE_STAFF_SUCCESS = 'DELETE_STAFF_SUCCESS';

export const FAQ_LISTING_SUCCESS = 'FAQ_LISTING_SUCCESS';
export const DELETE_FAQ_SUCCESS = 'DELETE_FAQ_SUCCESS';
export const CUSTOMER_LIST_SUCCESS = 'CUSTOMER_LIST_SUCCESS';
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS';
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS"
export const RECOVER_USER_SUCCESS = "RECOVER_USER_SUCCESS"
const ROOT_URL = API_ROOT;
let token = null;

// export function resetToken() {//used for logout
//   return {
//     type: RESET_TOKEN
//   };
// }

export function signInUser(formValues) {
  return axios.post(`${ROOT_URL}/serviceprovider/login`, formValues);
  
  // return axios({
  //   method: 'POST',
  //   data: formValues,
  //   url: `${ROOT_URL}/user/login`,
  // });
}

export function signInUserSuccess(user) {
  return {
    type: SIGNIN_USER_SUCCESS,
    data: user
  };
}

export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    data: error
  };
}

export function logoutUser() {

  return {
    type: LOGOUT_USER
  };
}

export function getCountryList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getcountrylist`,
    
  });
}

export function getCountryListSuccess(payload){
  return {
      type: COUNTRY_LIST_SUCCESS,
      payload: payload
    }
}




export function statusShopAvailability(data){
  return axios({
    method: 'PUT',
    data: data,
    url: `${ROOT_URL}/merchant/markshopavailability`,
  });
}

export function userDetail(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/merchant/getshopavailability`,
    
  });
}

export function savePreparationTime(data){
  return axios({
    method: 'PUT',
    data: data,
    url: `${ROOT_URL}/merchant/updateshop`,
  });
}

export function addShopOrderTiming(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/merchant/addshoptiming`
  });
}

export function addShopOrderTimingSuccess(payload) {
  return {
    type: ADD_SHOP_ORDER_TIMING_SUCCESS,
    payload: payload
  };
}

export function getShopTiming(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/merchant/getshoptiming`,
  });
}

export function getShopTimingSuccess(payload) {
  return {
    type: SHOP_TIMING_SUCCESS,
    payload: payload
  };
}

export function roleListing(props){
  return axios({
    method: 'GET',
    data: props,
    url: `${ROOT_URL}/serviceprovider/rolelisting`
  });
}

export function roleListingSuccess(payload){
  return {
      type: ROLE_LISTING_SUCCESS,
      payload: payload
    }
}
export function permissionListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getallpermissions`,
  });
}

export function addStaffRoles(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addrole`
  });
}
export function roleDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/roledetailbyid`,
  });
}
export function deleteRole(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleterole`
  });
}
export function deleteRoleSuccess(payload) {
  return {
    type: DELETE_ROLE_SUCCESS,
    payload: payload
  };
}


export function staffListing(props){
  return axios({
    method: 'GET',
    data: props,
    url: `${ROOT_URL}/serviceprovider/stafflisting`
  });
}
export function staffListingSuccess(payload){
  return {
      type: STAFF_LISTING_SUCCESS,
      payload: payload
    }
}
export function addStaff(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addstaff`
  });
}
export function staffDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/staffdetailbyid`,
  });
}
export function deleteStaff(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deletestaff`
  });
}
export function deleteStaffSuccess(payload) {
  return {
    type: DELETE_STAFF_SUCCESS,
    payload: payload
  };
}

export function changePassword(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/changepassword`
  });
}

export function setStaffMemberStatus(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/setstaffstatus`
  });
}

export function customerReporting(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/customerreporting`,
  });
}

export function logsReporting(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/logsreporting`,
  });
}

export function faqListing(props){
  return axios({
    method: 'GET',
    data: props,
    url: `${ROOT_URL}/serviceprovider/faqlisting`
  });
}
export function faqListingSuccess(payload){
  return {
      type: FAQ_LISTING_SUCCESS,
      payload: payload
    }
}
export function addFaq(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addfaq`
  });
}
export function faqDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/faqdetailbyid`,
  });
}
export function deleteFaq(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deletefaq`
  });
}
export function deleteFaqSuccess(payload) {
  return {
    type: DELETE_FAQ_SUCCESS,
    payload: payload
  };
}
export function customerListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getcustomerlisting`,
  });
}

export function customerListingSuccess(payload, activePage){
  return {
      type: CUSTOMER_LIST_SUCCESS,
      payload: payload,
      activePage
    }
}

export function updateWalletMoney(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addmoneytowallet`
  });
}

export function getUserWalletTransactions(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getusertransactiondetails`,
  });
}

export function collectCashFromRider(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/updatepaymentfromrider`
  });
}

export function setCustommerStatus(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/setcustommerstatus`
  });
}

export function getAllLanguages(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/common/getalllanguages`,
  });
}

export function logout(props){
  return axios({
    method : 'POST',
    data : props,
    url: `${ROOT_URL}/serviceprovider/logout`
  })
}

export function updateCollectCashFromRider(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/updatedrivertransaction`
  });
}

export function getCustomerDeactivatedAccount(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getCustomerDeactivatedAccount`,
  });
}

export function userListingSuccess(payload, activePage){
  return {
      type: USER_LIST_SUCCESS,
      payload: payload,
      activePage
    }
}

export function deleteUserSuccess(payload) {
  return {
    type: DELETE_USER_SUCCESS,
    payload: payload
  };
}

export function deleteUser(data) {
  return axios({
    method: 'DELETE',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleteUser`
  });
}

export function recoverUser(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/recoverUser`
  });
}
// export function recoverUserSuccess(payload) {
//   return {
//     type: RECOVER_USER_SUCCESS,
//     payload: payload
//   };
// }