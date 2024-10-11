import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};

export const ADD_NEW_SHOP_SUCCESS = 'ADD_NEW_SHOP_SUCCESS';
export const SHOP_LIST_SUCCESS = 'SHOP_LIST_SUCCESS';
export const SHOP_DETAIL_SUCCESS = 'SHOP_DETAIL_SUCCESS';
export const CUISINE_LIST_SUCCESS = 'CUISINE_LIST_SUCCESS';
export const DELETE_SHOP_SUCCESS = 'DELETE_SHOP_SUCCESS';
export const DELETE_SHOP = 'DELETE_SHOP';
export const UPDATE_SHOP_STATUS_SUCCESS = 'UPDATE_SHOP_STATUS_SUCCESS'
export const SHOP_DOCS_LIST_SUCCESS = 'SHOP_DOCS_LIST_SUCCESS';
export const ADD_SHOP_DOCS_SUCCESS = 'ADD_SHOP_DOCS_SUCCESS';
export const UPDATE_SHOP_DOCS_SUCCESS ='UPDATE_SHOP_DOCS_SUCCESS';
export const SHOP_DOC_DELETE_SUCCESS = 'SHOP_DOC_DELETE_SUCCESS';

export const SHOP_CATEGORY_LIST_SUCCESS = 'SHOP_CATEGORY_LIST_SUCCESS';
export const DELETE_SHOP_CAT_SUCCESS = 'DELETE_SHOP_CAT_SUCCESS';
export const ADD_CUISINES_SUCCESS = 'ADD_CUISINES_SUCCESS';
export const UPDATE_CUISINES_SUCCESS = 'UPDATE_CUISINES_SUCCESS';
export const CUISINES_DELETE_SUCCESS = 'CUISINES_DELETE_SUCCESS';
export const GALLERY_SUCCESS = 'GALLERY_SUCCESS';
export const DELETE_GALLERY = 'DELETE_GALLERY';
export const SHOP_BANNER_SUCCESS = 'SHOP_BANNER_SUCCESS';
export const DELETE_SHOP_BANNER = 'DELETE_SHOP_BANNER';
export const SUPER_SHOP_LIST_SUCCESS = 'SUPER_SHOP_LIST_SUCCESS';
export const DELETE_SUPER_MERCHANT = 'DELETE_SUPER_MERCHANT';

const ROOT_URL = API_ROOT;
const MERCHANT_URL = 'http://localhost:6969/api/v1'
var token = "";

export function shopListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshops`,
  });
}

export function shopListingSuccess(payload, activePage){
  return {
      type: SHOP_LIST_SUCCESS,
      payload: payload,
      activePage
    }
}

export function addNewShop(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addshop`
  });
}

export function editShopDetails(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${MERCHANT_URL}/shop/edit-shop-details`
  });
}

export function addShopTiming(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addshoptiming`
  });
}

export function updateShopImage(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/updateshopimage`
  });
}

export function addNewShopSuccess(payload) {
  return {
    type: ADD_NEW_SHOP_SUCCESS,
    payload: payload
  };
}

export function deleteShop(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleteshop`
  });
}


export function deleteShopSuccess(payload) {
  return {
    type: DELETE_SHOP_SUCCESS,
    payload: payload
  };
}

export function shopDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshopbyid`,
  });
}

export function shopDetailByIdSuccess(payload) {
  return {
    type: SHOP_DETAIL_SUCCESS,
    payload: payload
  };
}

export function cuisineListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getcuisine`,
  });
}

export function cuisineListingSuccess(payload){
  return {
      type: CUISINE_LIST_SUCCESS,
      payload: payload
    }
}
export function getShopTimingById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshoptiming`,
  });
}
export function getShopImageById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshopimage`,
  });
}
export function getShopListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshoplist`,
  });
}

export function restaurantCategoryListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshopcategory`,
  });
}

export function deactivateShop(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/updateshopstatus`
  });
}

export function deactivateShopSuccess(payload, status) {
  return {
    type: UPDATE_SHOP_STATUS_SUCCESS,
    payload: payload,
    status: status
  };
}

export function getRestaurantCsvDownload(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getcsvforshops`,
  });
}

export function shopDocsListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshopdocumentlisting`,
  });
}

export function shopDocsListingSuccess(payload){
  return {
      type: SHOP_DOCS_LIST_SUCCESS,
      payload: payload
    }
}

export function addShopDocs(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addshopdocument`
  });
}

export function addShopDocsSuccess(payload){
  return {
      type: ADD_SHOP_DOCS_SUCCESS,
      payload: payload
    }
}

export function updateShopDocsSuccess(payload, index) {
  return {
    type: UPDATE_SHOP_DOCS_SUCCESS,
    payload: payload,
    index: index
  }
}

export function getShopDocsById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshopdocumentbyid`,
  });
}

export function deleteShopDocument(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleteshopdocument`
  });
}
export function deleteShopDocumentSuccess(payload) {
  return {
    type: SHOP_DOC_DELETE_SUCCESS,
    payload: payload
  };
}
export function merchantReporting(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getmerchantreporting`,
  });
}
export function shopBannerDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/shopbannerdetailbyid`,
  });
}
export function addShopBannerDetail(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/addshopbannerdetail`
  });
}

export function categoryListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/shopcategories`,
  });
}
export function categoryListingSuccess(payload, activePage){
  return {
      type: SHOP_CATEGORY_LIST_SUCCESS,
      payload: payload,
      activePage
    }
}
export function deleteShopCategory(data) {
  return axios({
    method: 'POST',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleteshopcategory`
  });
}
export function deleteShopCategorySuccess(payload) {
  return {
    type: DELETE_SHOP_CAT_SUCCESS,
    payload: payload
  };
}
export function addNewShopCateogry(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addshopcategory`
  });
}

export function shopCategoryDetailById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/shopcategorydetailbyid`,
  });
}
export function downloadMerchantReporting(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getmerchantpdfreport`,
  });
}
export function getBankList(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getbanklist`,
  });
}


export function restauarnttaglisting(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getrestauranttags`,
  });
}


export function getIsWithGatoesOptions(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getIsWithGatoesOptions`,
  });
}


export function addCuisines(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/saveCuisine`
  });
}

export function addCuisinesSuccess(payload) {
  return {
    type: ADD_CUISINES_SUCCESS,
    payload: payload
  };
}

export function getCuisinesById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getcusinebyid`,
  });
}

export function updateCuisinesSuccess(payload, index) {
  return {
    type: UPDATE_CUISINES_SUCCESS,
    payload: payload,
    index: index
  };
}

export function deleteCuisines(data) {
  return axios({
    method: 'DELETE',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deletecuisines`
  });
}

export function deleteCuisinesSuccess(payload) {
  return {
    type: CUISINES_DELETE_SUCCESS,
    payload: payload
  };
}

export function getGallery(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getGallery`,
  });
}

export function getGallerySuccess(payload){
  return {
      type: GALLERY_SUCCESS,
      payload: payload
    }
}

export function addGallery(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/saveGallery`
  });
}

export function deleteGallery(data) {
  return axios({
    method: 'DELETE',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleteGallery`
  });
}

export function deleteGallerySuccess(payload) {
  return {
    type: DELETE_GALLERY,
    payload: payload
  };
}

export function getGalleryById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getGalleryById`,
  });
}

export function getShopAvalablitytimingById(params){
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getShopAvalablitytimingById`
  })
}


export function getShopBanners(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getShopPromotion`,
  });
}

export function getShopBannersSuccess(payload){
  return {
      type: SHOP_BANNER_SUCCESS,
      payload: payload
    }
}

export function addShopsBanner(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/saveShopPromotion`
  });
}

export function deleteShopBanner(data) {
  return axios({
    method: 'DELETE',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleteShopBanner`
  });
}

export function deleteBannerSuccess(payload) {
  return {
    type: DELETE_SHOP_BANNER,
    payload: payload
  };
}

export function getShopsBannerById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getShopPromotionById`,
  });
}

export function changeRestaurantBannerPosition(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/changeShopPromoPosition`
  });
}

export function superShopListing(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getSuperMerchant`,
  });
}

export function superShopListingSuccess(payload, activePage){
  return {
      type: SUPER_SHOP_LIST_SUCCESS,
      payload: payload,
      activePage
    }
}

export function addSuperMerchant(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addSuperMerchant`
  });
}

export function getSuperMerchantById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getSuperMerchantById`,
  });
}

export function deleteSuperMerchant(data) {
  return axios({
    method: 'DELETE',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleteSuperMerchant`
  });
}

export function deleteSuperMerchantSuccess(payload) {
  return {
    type: DELETE_SUPER_MERCHANT,
    payload: payload
  };
}

export function addshoptaxes(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/addshoptaxes`
  });
}

export function gettshoptaxes(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshoptaxesbyshopid`,
  });
}

export function getRestaurantPatner(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getRestaurantPatner`,
  });
}

export function getFeedback(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getFeedback`,
  });
}

export function addFeedback(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/updateFeedback`
  });
}

export function getFeedbackById(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getFeedbackById`,
  });
}

export function deleteFeedback(data) {
  return axios({
    method: 'DELETE',
    data: data,
    url: `${ROOT_URL}/serviceprovider/deleteFeedback`
  });
}

export function getShopRating(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getShopRating`,
  });
}

export function sentCashToShop(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/sentCashToShop`
  });
}

export function getShopCash(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getShopCash`,
  });
}

export function getMerchantEarning(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getMerchantEarning`,
  });
}

export function updateSentCashToShop(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/updatemerchanttransaction`
  });
}

export function updateZoneRestaurantRadius(props){
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/updateZoneRestaurantServiceRadius`
  });
}

export function getMerchantPaoutRequest(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/payout/listRequest`,
  });
}

export function updatePayoutRequest(props){
  return axios({
    method: 'PATCH',
    data: props,
    url: `${ROOT_URL}/payout/updateRequest`
  });
}

export function getshopcategoryNew(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getshopcategoryNew`,
  });
}

export function getmenulistNew(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getmenulistNew`,
  });
}
export function shopListingByZone(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/merchant/listingByZones`,
  });
}

export function getPromotionCategoryUsingMicroservice(params) {
  return axios({
    method: "GET",
    params: params,
    url: `${ROOT_URL}/serviceprovider/getPromotionCategoryUsingMicroservice`,
  });
}

export function promotionListingByZoneRegionUsingMicroservice(params) {
  return axios({
    method: "GET",
    params: params,
    url: `${ROOT_URL}/serviceprovider/promotionListingByZoneRegionUsingMicroservice`,
  });
}

