import { lazy } from 'react';
import moment from 'moment';
import {ROUTES} from './routes';
import has from 'lodash';

export const APP_VERSION = '1.0';

export function load(component){

  return lazy(() => import(`./components/${component}`));
}

export function fromNow(dateTime){
  return moment.utc(dateTime).fromNow();
}

export function utcToLocal(dateTime, format = 'DD-MM-YYYY'){
  return moment.utc(dateTime).local().format(format);
}

export function clearSession(){
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('currencyCode');
  localStorage.removeItem('currencySymbol');
  localStorage.removeItem('auth');
  localStorage.removeItem('contentlanguage');
  localStorage.removeItem('dieterystatus');
  localStorage.removeItem('permissions');
  localStorage.removeItem('hasAllAccess');
  // redirect on root
  window.location = '/';
}

export function verifyAndUpdateAppVersion(){
  // Display App Version
  console.log('APP VERSION', APP_VERSION);

  const version = localStorage.getItem("APP_VERSION");
  if(version === null || version != APP_VERSION){
    localStorage.setItem("APP_VERSION", APP_VERSION);
    clearSession();
  }
}

export function _dispatch(nextState, rerender = false, compName = null) {
  rerender = rerender
    ? new Date().getTime()
    : nextState.status;
  return {
    ...nextState,
    status: rerender,
    compName
  }
}

export function authentication(){
  // With auth token
  if(typeof localStorage.getItem('jwtToken') !== 'undefined' && localStorage.getItem('jwtToken') !== null){
    return true;
  }

  return false;
}

export function getUser(){
  // With auth token
  if(typeof localStorage.getItem('auth') !== 'undefined' && localStorage.getItem('auth') !== null){
    return JSON.parse(localStorage.getItem('auth'));
  }

  return null;
}

export function getCurrencySymbol(){
  // With auth token
  if(typeof localStorage.getItem('currencySymbol') !== 'undefined' && localStorage.getItem('currencySymbol') !== null){
    return localStorage.getItem('currencySymbol')+" ";
  }

  return null;
}

export function getCurrencyCode(){
  // With auth token
  if(typeof localStorage.getItem('currencyCode') !== 'undefined' && localStorage.getItem('currencyCode') !== null){
    return localStorage.getItem('currencyCode')+" ";
  }

  return null;
}

export function getDieteryStatus(){
  // With auth token
  if(typeof localStorage.getItem('dieterystatus') !== 'undefined' && localStorage.getItem('dieterystatus') !== null){
    return localStorage.getItem('dieterystatus');
  }

  return 1;
}

export function getAclChecks(permissionType){
  var result = 0;
  //console.log('aaaaaaaaaa', localStorage.getItem('hasAllAccess'));
  if(localStorage.getItem('hasAllAccess') == 'true'){
    result = 1;
  } else {
    var userpermissions = JSON.parse(localStorage.getItem('permissions'));
    userpermissions && userpermissions.length > 0 && userpermissions.map((obj, index) => (
      permissionType == obj ? result = 1 : null
    ))
  }
  return result;
}

export function differentiateAddons(oldItem, newItem){
  let oldAddonArr = oldItem.fulladdons || [];
  let newAddonArr = newItem.fulladdons  || [];
  let addOnDiff   =  has.differenceBy(oldAddonArr,newAddonArr,'id')
  addOnDiff = has.map(addOnDiff,'id'); 
  addOnDiff =  addOnDiff || []; 
  let oldCust = has.map(oldAddonArr,'semiaddons').flat();
  let newCust =  has.map(newAddonArr,'semiaddons').flat();
  let custDiff = has.differenceBy(oldCust,newCust,'id')
  custDiff = has.map(custDiff,'id');
  return {custDiff:custDiff || [],addOnDiff }
}

export function differentiateVariant(oldItem, newItem){
  let oldVarArr = oldItem.variants || [];
  let newVarArr = newItem.variants  || [];
  let variantOnDiff   =  has.differenceBy(oldVarArr,newVarArr,'id')
  variantOnDiff = has.map(variantOnDiff, 'id');
  return variantOnDiff;
}

export function diffInMinsDate(startdate, enddate){
  var end_date = moment(enddate);//now
  var start_date = moment(startdate);
  return end_date.diff(start_date, 'minutes')+ " mins";
}


