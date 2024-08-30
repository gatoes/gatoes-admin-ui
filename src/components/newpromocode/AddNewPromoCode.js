import React, { Component } from 'react';
import { reduxForm} from 'redux-form';
import {toast} from 'react-toastify';
import validate from './ValidateNewPromoCode';
import PromoNewCodeInfo from './PromoNewCodeInfo';
import PromoNewCodeCondition from './PromoNewCodeCondition';
import PromoNewCodeAction from './PromoNewCodeAction';
import RenderBusinessZoneCondition from './RenderBusinessZoneCondition';
import { deliveryRegionListing, getCouponsTypesUsingMicroservice, getRestaurentNew, getdeliveryregionsNew, regionListing } from '../../actions/regions';
import { ROLE_ID } from '../../constants';
import { connect } from 'react-redux';
import { getCouponsByIdUsingMicroservice, isBroadcastSuccess, savePromoCodeUsingMicroservice, updatePromoCodeUsingMicroservice } from '../../actions/newpromocodes';
import { getmenulistNew, getshopcategoryNew } from '../../actions/shops';

class AddNewPromoCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status,
      isAction: true,
      couponType:[],
      itemObject:props.itemObject,
      categoryObject:props.categoryObject,
      categoryItems:props.categoryItems,
      shopObject:props.shopObject,
      regionObject:props.regionObject,
      zoneObject:props.zoneObject,
      itemImageUrl:null,
      promoBannerImageUrl:null,
      getCouponType:null,
      apiRegionData:[],
      apiRestaurantData:[],
      apiCategoryData:[],
      apiItemData:[],
      hideItemCategory:false,
      bearCostBy:0

    }
    // console.log(this.props.match.params.index,"this.props.match.params.index")
    this.updateDateInfo = this.updateDateInfo.bind(this);
    this.isActionUpdate = this.isActionUpdate.bind(this);
    this.extractUniqueValuesApi = this.extractUniqueValuesApi.bind(this);
    this.submitMenuForm = this.submitMenuForm.bind(this);
    this.enrichPayloadArrays = this.enrichPayloadArrays.bind(this);
    this.extractUniqueValues = this.extractUniqueValues.bind(this);
    this.handleBroadcast = this.handleBroadcast.bind(this);


  }

  componentDidMount(){
    this.props.change('days_type', '0'); 
    this.props.change('isMerchantPromo', '0');
    getCouponsTypesUsingMicroservice().then((response) => {
      this.setState({
        couponType: response.data.responseData.rows,
      });
    });
  }

  updateDateInfo(datename, date){
    this.props.change(datename, date); 
  }

  isActionUpdate(type){
    this.setState({
      isAction: type == 4 ? false : true
    })
  }

 

  // extractUniqueValuesApi() {
   
  //   let containedZoneArray = [];
  //   let containedRegionArray = [];
  //   let containedShopArray = [];
  //   let containedCategoryArray = [];

  //   this.state.apiRegionData.forEach((region) => {
  //     if (region.zoneId && !containedZoneArray.includes(region.zoneId)) {
  //       containedZoneArray.push(region.zoneId);
  //     }
  //   });

  //   this.state.apiRestaurantData.forEach((shop) => {
  //     if (shop.zoneId && !containedZoneArray.includes(shop.zoneId)) {
  //       containedZoneArray.push(shop.zoneId);
  //     }
  //     if (shop.regionId && !containedRegionArray.includes(shop.regionId)) {
  //       containedRegionArray.push(shop.regionId);
  //     }
  //     if (shop.shopId && !containedShopArray.includes(shop.shopId)) {
  //       containedShopArray.push(shop.shopId);
  //     }
  //   });

  //   this.state.apiCategoryData.forEach((category) => {
  //     if (category.zoneId && !containedZoneArray.includes(category.zoneId)) {
  //       containedZoneArray.push(category.zoneId);
  //     }
  //     if (category.regionId && !containedRegionArray.includes(category.regionId)) {
  //       containedRegionArray.push(category.regionId);
  //     }
  //     if (category.shopId && !containedShopArray.includes(category.shopId)) {
  //       containedShopArray.push(category.shopId);
  //     }
  //   });

  //   this.state.apiItemData.forEach((item) => {
  //     if (item.zoneId && !containedZoneArray.includes(item.zoneId)) {
  //       containedZoneArray.push(item.zoneId);
  //     }
  //     if (item.regionId && !containedRegionArray.includes(item.regionId)) {
  //       containedRegionArray.push(item.regionId);
  //     }
  //     if (item.shopId && !containedShopArray.includes(item.shopId)) {
  //       containedShopArray.push(item.shopId);
  //     }
  //     if (item.categoryId && !containedCategoryArray.includes(item.categoryId)) {
  //       containedCategoryArray.push(item.categoryId);
  //     }
  //   });

  //   return { containedZoneArray, containedRegionArray, containedShopArray, containedCategoryArray };
  // }

  


//   submitMenuForm(values){
//     console.log(values,"valuesNewPromo")
//     // return
//     let {
//       containedZoneArray,
//       containedRegionArray,
//       containedShopArray,
//       containedCategoryArray,
//     } = this.extractUniqueValuesApi();

//     let formData = {}
//     // let zones = [];
//     // let regions = []
//     // let shops = [];
//     // let categories = [];
//     // let items = [];

// // starts Here


//     let data = values

//     let newItemArray = []
//     let categoriesId = []
//     let newCategoryArray = []
//     let shopsId = []
//     let newShopArray = []
//     let regionsId = []
//     let shopZonesId = []
//     let newRegionArray = []
//     let newZoneArray = []
//     let zonesId = []


  

// function extractUniqueValues(data) {
//   let zoneArray = [];
//   let regionArray = [];
//   let restaurantArray = [];
//   let categoryArray = [];
//   let itemArray = [];

//   data.conditionpromo.forEach(promo => {
//     if (!zoneArray.includes(promo.zone)) {
//       zoneArray.push(promo.zone);
//     }
//     if (!regionArray.includes(promo.region)) {
//       regionArray.push(promo.region);
//     }

//     promo.restcategory.forEach(restcat => {
//       if (!restaurantArray.includes(restcat.restaurant)) {
//         restaurantArray.push(restcat.restaurant);
//       }
//       restcat.category.forEach(cat => {
//         if (!categoryArray.includes(cat)) {
//           categoryArray.push(cat);
//         }
//       });
//       restcat.item.forEach(itm => {
//         if (!itemArray.includes(itm)) {
//           itemArray.push(itm);
//         }
//       });
//     });
//   });

//   return { zoneArray, regionArray, restaurantArray, categoryArray, itemArray };
// }

// // Extract unique zones, regions, restaurants, categories, and items
// let { zoneArray, regionArray, restaurantArray, categoryArray, itemArray } = extractUniqueValues(data);

// console.log('Zone Array:', zoneArray);
// console.log('Region Array:', regionArray);
// console.log('Restaurant Array:', restaurantArray);
// console.log('Category Array:', categoryArray);
// console.log('Item Array:', itemArray);




// console.log("---------------------------------------------")

// // let apiRegionData = []
// // let apiRestaurantData = []
// // let apiCategoryData = []
// // let apiItemData = []
// //------------------------------API--------------------------------------------   
// Promise.all([
//   getdeliveryregionsNew({ deliverRegionId: regionArray }),
//   getRestaurentNew({ shopId: restaurantArray }),
//   getshopcategoryNew({ categoryId: categoryArray }),
//   getmenulistNew({ itemId: itemArray }),
// ])
//   .then((responses) => {
//     console.log("API Responses:", responses); // Log the API responses

//     const [
//       regionResponse,
//       restaurantResponse,
//       categoryResponse,
//       itemResponse,
//     ] = responses;

//     this.setState(
//       {
//         apiRegionData: regionResponse.data.data,
//         apiRestaurantData: restaurantResponse.data.data.shop,
//         apiCategoryData: categoryResponse.data.data,
//         apiItemData: itemResponse.data.data.menu,
//       },
//       () => {
//         console.log("State Updated:", this.state); // Log the updated state
//         this.enrichPayloadArrays();
//         // Call enrichPayloadArrays after state update
//       }
//     );
//   })
//   .then(() => {
//     console.log("All API calls are complete.");
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });
// console.log(this.state.apiRegionData,this.state.apiCategoryData,this.state.apiRestaurantData,this.state.apiItemData,"REGION_DATA")
// function  enrichPayloadArrays(){
//   let { apiRegionData, apiRestaurantData, apiCategoryData, apiItemData } = this.state;

//   // Enrich Payload Region Array
//   regionObjectArray.forEach(region => {
//     let matchingRegion = apiRegionData.find(apiRegion => apiRegion.id === region.regionId);
//     if (matchingRegion) {
//       region.zoneId = matchingRegion.zoneId;
//     }
//   });

//   // Enrich Payload Shop Array
//   shopObjectArray.forEach(shop => {
//     let matchingShop = apiRestaurantData.find(apiShop => apiShop.shopId === shop.shopId);
//     if (matchingShop) {
//       shop.zoneId = matchingShop.zoneId;
//       shop.regionId = matchingShop.regionId;
//     }
//   });

//   // Enrich Payload Category Array
//   categoryObjectArray.forEach(category => {
//     let matchingCategory = state.apiCategoryData.find(apiCategory => apiCategory.id === category.categoryId);
//     if (matchingCategory) {
//       category.zoneId = matchingCategory.zoneId;
//       category.regionId = matchingCategory.regionId;
//       category.shopId = matchingCategory.shopId;
//     }
//   });
  
  
  
//    // Enrich Payload Item Array
//   itemObjectArray.forEach(item => {
//     let matchingItem = apiItemData.find(apiItem => apiItem.id === item.itemId);
//     if (matchingItem) {
//       item.zoneId = matchingItem.zoneId;
//       item.regionId = matchingItem.regionId;
//       item.shopId = matchingItem.shopId;
//       item.categoryId = matchingItem.categoryId;
//     }
//   });
  
  
// }
// let zoneObjectArray = []

// for(let i = 0; i<zoneArray.length; i++){
//     let zoneObject = {}
//     zoneObject['zoneId'] = zoneArray[i]
//     if(containedZoneArray.includes(zoneArray[i])){
        
//         zoneObject['isApplicableToAllRegion'] = false;
//     }else{
//          zoneObject['isApplicableToAllRegion'] = true;
//     }
    
//     zoneObjectArray.push(zoneObject)
// }


// let regionObjectArray = []
// for(let i = 0; i<regionArray.length; i++){
//     let regionObject = {}
//     regionObject['regionId'] = regionArray[i]
//     if(containedRegionArray.includes(regionArray[i])){
//         regionObject['isApplicableToAllShops'] = false;
//     }else{
//          regionObject['isApplicableToAllShops'] = true;
//     }
    
//     regionObjectArray.push(regionObject)
// }


// let shopObjectArray = []
// for(let i = 0; i<restaurantArray.length; i++){
//     let shopObject = {}
//     shopObject['shopId'] = restaurantArray[i]
//     if(containedShopArray.includes(restaurantArray[i])){
//         shopObject['isApplicableToAllCategory'] = false;
//     }else{
//          shopObject['isApplicableToAllCategory'] = true;
//     }
    
//     shopObjectArray.push(shopObject)
// }

// let categoryObjectArray = []
// for(let i = 0; i<categoryArray.length; i++){
//     let categoryObject = {}
//     categoryObject['categoryId'] = categoryArray[i]
//     if(containedShopArray.includes(categoryArray[i])){
//         categoryObject['isApplicableToAllItems'] = false;
//     }else{
//          categoryObject['isApplicableToAllItems'] = true;
//     }
    
//     categoryObjectArray.push(categoryObject)
// }


// let itemObjectArray = []
// for(let i = 0; i<itemArray.length; i++){
//     let itemObject = {}
//     itemObject['itemId'] = itemArray[i]
    
//     itemObjectArray.push(itemObject)
// }

// console.log("")
// console.log("--------------------------------------------------")
// console.log("")

// console.log('Payload Zone Array:', zoneObjectArray);
// console.log('Payload Region Array:', regionObjectArray);
// console.log('Payload Shop Array:', shopObjectArray);
// console.log('Payload Category Array:', categoryObjectArray);
// console.log('Payload Item Array:', itemObjectArray);




// console.log("")
// console.log("--------------------------------------------------")
// console.log("")


 

// // Enrich the payload arrays with additional data
// console.log('Payload Zone Array:', zoneObjectArray);
// console.log('Payload Region Array:', regionObjectArray);
// console.log('Payload Shop Array:', shopObjectArray);
// console.log('Payload Category Array:', categoryObjectArray);
// console.log('Payload Item Array:', itemObjectArray);


//     // ends Here
//     return
//      values.conditionpromo.forEach((item) => {
//       if (item.zone) {
//           zones.push(item.zone);
//       }
//       if (item.region) {
//           regions.push(item.region);
//       }
//   });
//     values.conditionpromo.forEach(item => {
//       if (item.restcategory && Array.isArray(item.restcategory)) {
//         item.restcategory.forEach(rest => {
//           if (rest && rest.restaurant && Array.isArray(rest.restaurant)) {
//             shops = shops.concat(rest.restaurant);
//           }
//           if (rest && rest.category && Array.isArray(rest.category)) {
//             categories = categories.concat(rest.category);
//           }
//           if (rest && rest.item && Array.isArray(rest.item)) {
//             items = items.concat(rest.item);
//           }
//         });
//       }
//     });

//     // console.log(shops, categories, items,zones,regions,"Reiigeijg")
//     const hasEmptyFields = (shops.length === 0 && categories.length === 0 && items.length === 0 &&  zones.length === 0 && regions.length === 0 && !values.business_zone ) 

   
    
     
//     let itemObjectModify =this.props.itemObject
//     let shopObject = this.props.shopObject
//     let regionObject = this.props.regionObject
//     let zoneObject = this.props.zoneObject
//     let categoryObject = this.props.categoryObject
//     // let newItemArray = []
//     // let categoriesId = []
//     // let newCategoryArray = []
//     // let shopsId = []
//     // let newShopArray = []
//     // let regionsId = []
//     // let shopZonesId = []
//     // let newRegionArray = []
//     // let newZoneArray = []
//     // let zonesId = []
  

//     if(itemObjectModify && Array.isArray(itemObjectModify) &&  itemObjectModify.length > 0){
//     itemObjectModify.forEach((item)=>{
//       let newObject = {}

//       if(item){
//         newObject["itemId"] = item.id
//         newObject["categoryId"] = item.categoryId
//         newObject["shopId"] = item.shopId
//         newObject["regionId"] = item.regionId
//         newObject["zoneId"] = item.zoneId
//         newItemArray.push(newObject)
//         categoriesId.push(item.categoryId)
//       }
     
//     })
//   }
     
    
//   if(categoryObject && Array.isArray(categoryObject) &&  categoryObject.length > 0){ 
//     categoryObject.forEach((item)=>{
//       let newObject = {}

//       if(item){
//         newObject["categoryId"] = item.id
//         newObject["shopId"] = item.shopId
//         newObject["regionId"] = item.regionId
//         newObject["zoneId"] = item.zoneId
//         if(categoriesId.includes(item.id)){
//           newObject["isApplicableToAllItems"] = false
//         }else{
//           newObject["isApplicableToAllItems"] = true
//         }
       
//         newCategoryArray.push(newObject)
//         shopsId.push(item.shopId)
//       }
     
    
//     })
//   }


 
//   if(shopObject && Array.isArray(shopObject) &&  shopObject.length > 0){
//     shopObject.forEach((item)=>{
//       let newObject = {}
      
//       if(item){
//         newObject["shopId"] = item.shopId
//         newObject["regionId"] = item.regionId
//         newObject["zoneId"] = item.zoneId
//         if(shopsId.includes(item.shopId)){
//           newObject["isApplicableToAllCategories"] = false
//         }else{
//           newObject["isApplicableToAllCategories"] = true
//         }
//         newShopArray.push(newObject)
//         regionsId.push(item.regionId)
//         shopZonesId.push(item.zoneId)
//       }
     
//     })
//   }


    
//   if(regionObject && Array.isArray(regionObject) &&  regionObject.length > 0){
//     regionObject.forEach((item)=>{
//       let newObject = {}
     
//       if(item){
//         console.log(item,"RegionItem")
//         newObject["regionId"] = item.id
//         newObject["zoneId"] = item.zoneId
//         if(regionsId.includes(item.id)){
//           newObject["isApplicableToAllShops"] = false
//         }else{
//           newObject["isApplicableToAllShops"] = true
//         }
//         newRegionArray.push(newObject)
//         zonesId.push(item.zoneId)
//       }
      

//     })
//   }


    
//   if(zoneObject && Array.isArray(zoneObject) &&  zoneObject.length > 0){
//     zoneObject.forEach((item)=>{
//       let newObject = {}

//       if(item){
//         newObject["zoneId"] = item.id
//         if(zonesId.includes(item.id) || shopZonesId.includes(item.id)){
//           newObject["isApplicableToAllRegions"] = false
//         }else{
//           newObject["isApplicableToAllRegions"] = true
//         }
//         newZoneArray.push(newObject)
//       }
      
     
//     })
//   }


//   let phoneNumbers = [];

//   if(values.phoneNumber){
//     values.phoneNumber.forEach((item) => {
//       phoneNumbers.push(item.value)
//     })
//   }



//     formData = {
//       userRole:ROLE_ID.SERVICE_PROVIDER,
//       couponCode:values.coupon_code ? values.coupon_code : null,
//       couponType:values.coupon,
//       status:0,
//       daysType:parseInt(values.days_type),
//       discountType:values.discount_type,
//       // imageId:values.image,
//       // secondaryImageId:values.promo_banner_image,
//       isOtherCouponApplicable:values.promocode_with_other ? true : false,
//       title:values.title,
//       description:values.description,
//       minOrderAmount:parseInt(values.minimum_subtotal),
//       maxDiscount:parseInt(values.max_discount),
//       businessZones : values.business_zone,
//       zones:newZoneArray,
//       regions:newRegionArray,
//       shops:newShopArray,
//       categories:newCategoryArray,
//       items:newItemArray,
//       discount:parseInt(values.discount),
//       totalCoupons:values.uses_per_coupons ? values.uses_per_coupons : -1,
//       validPerUser:values.uses_per_customer ? values.uses_per_customer : -1 ,
//       isAdminPromo:parseInt(values.isMerchantPromo),
//       adminBearPercentage:values.adminBearCost,
//       // merchantBearPercentage:values.merchantBearCost,
//       userType:values.userType ? values.userType : 1,
//       isCreateByAdmin:true,
//       specificUsersContact:phoneNumbers,
//       csv_records:values.csv_records
   

      
//     }
//     if(values.image){
//       formData["imageId"] = values.image
//     }
//     if(values.promo_banner_image){
//       formData["secondaryImageId"]=values.promo_banner_image
//     }
//     if(values.days_type == 1) {
//       formData["startDate"] = values.startDate;
//       formData["endDate"] = values.endDate;
//       formData["startTime"] = values.start_time;
//       formData["endTime"] = values.end_time;
//     }else{
//       formData["startTime"] = values.start_time;
//       formData["endTime"] = values.end_time;
//     }
//     // if(values.isMerchantPromo == 0){
//     //   formData["userType"] = ROLE_ID.MERCHANT
//     // }else{
//     //   formData["userType"]= ROLE_ID.SERVICE_PROVIDER
//     // }
    
//     if(hasEmptyFields){
//       formData["applicableTo"] = true
//     }else{
//       formData["applicableTo"] = false
//     }
//     if(ROLE_ID.SERVICE_PROVIDER){
//       formData["isApprovalRequired"] = false
//     }else{
//       formData["isApprovalRequired"] = true

//     }
//     if(values.couponType == 1 || (values.discount_type == 5 || values.discount_type == 6)){
//       formData["isAutoApply"] = true
//     }else{
//       formData["isAutoApply"] = false

//     }
//      // Create metaData object containing formData
//      let metaData = { ...values };

//      // Include metaData within formData
//      formData["metaData"] = metaData;
//      if(this.props.match.params.index){
//       formData["id"] = parseInt(this.props.match.params.index);
//      }

//      console.log(formData,"formData")
//      if(this.props.match.params.index){
//       return updatePromoCodeUsingMicroservice(formData).then((result) => {
//         toast.success('Promo code updated successfully.');
//         this.props.reset();
//         this.props.history.push('/dashboard/newpromocodes');
//       }).catch(error => {
//         //throw new SubmissionError(error.response.data.error);
//       })
//      }else {
//       return savePromoCodeUsingMicroservice(formData).then((result) => {
//         toast.success('Promo code added successfully.');
//         this.props.reset();
//         this.props.history.push('/dashboard/newpromocodes');
//       }).catch(error => {
//         //throw new SubmissionError(error.response.data.error);
//       })
//      }

   
//   }

extractUniqueValuesApi() {
  let containedZoneArray = [];
  let containedRegionArray = [];
  let containedShopArray = [];
  let containedCategoryArray = [];
console.log('================================',this.state.apiRegionData)
  this.state.apiRegionData.forEach((region) => {
    if (region.zoneId && !containedZoneArray.includes(region.zoneId)) {
      containedZoneArray.push(region.zoneId);
    }
  });

  this.state.apiRestaurantData.forEach((shop) => {
    if (shop.zoneId && !containedZoneArray.includes(shop.zoneId)) {
      containedZoneArray.push(shop.zoneId);
    }
    if (shop.regionId && !containedRegionArray.includes(shop.regionId)) {
      containedRegionArray.push(shop.regionId);
    }
    // if (shop.shopId && !containedShopArray.includes(shop.shopId)) {
    //   containedShopArray.push(shop.shopId);
    // }
  });

  this.state.apiCategoryData.forEach((category) => {
    if (category.zoneId && !containedZoneArray.includes(category.zoneId)) {
      containedZoneArray.push(category.zoneId);
    }
    if (category.regionId && !containedRegionArray.includes(category.regionId)) {
      containedRegionArray.push(category.regionId);
    }
    if (category.shopId && !containedShopArray.includes(category.shopId)) {
      containedShopArray.push(category.shopId);
    }
  });

  this.state.apiItemData.forEach((item) => {
    if (item.zoneId && !containedZoneArray.includes(item.zoneId)) {
      containedZoneArray.push(item.zoneId);
    }
    if (item.regionId && !containedRegionArray.includes(item.regionId)) {
      containedRegionArray.push(item.regionId);
    }
    if (item.shopId && !containedShopArray.includes(item.shopId)) {
      containedShopArray.push(item.shopId);
    }
    if (item.categoryId && !containedCategoryArray.includes(item.categoryId)) {
      containedCategoryArray.push(item.categoryId);
    }
  });

  console.log(containedZoneArray,containedRegionArray,containedShopArray,containedCategoryArray,"containedZoneArray")
  return {
    containedZoneArray,
    containedRegionArray,
    containedShopArray,
    containedCategoryArray,
  };
}

extractUniqueValues(data) {
  let zoneArray = [];
  let regionArray = [];
  let restaurantArray = [];
  let categoryArray = [];
  let itemArray = [];

  data.conditionpromo.forEach((promo) => {
    if (!zoneArray.includes(promo.zone)) {
      zoneArray.push(promo.zone);
    }
    if (!regionArray.includes(promo.region)) {
      regionArray.push(promo.region);
    }

    if (Array.isArray(promo.restcategory) && promo.restcategory.length > 0) {
      promo.restcategory.forEach((restcat) => {
        if (restcat && restcat.restaurant && !restaurantArray.includes(restcat.restaurant)) {
          restaurantArray.push(restcat.restaurant);
        }
        if (restcat && Array.isArray(restcat.category)) {
          restcat.category.forEach((cat) => {
            if (cat && !categoryArray.includes(cat)) {
              categoryArray.push(cat);
            }
          });
        }
        if (restcat && Array.isArray(restcat.item)) {
          restcat.item.forEach((itm) => {
            if (itm && !itemArray.includes(itm)) {
              itemArray.push(itm);
            }
          });
        }
      });
    }
  });

  return {
    zoneArray,
    regionArray,
    restaurantArray,
    categoryArray,
    itemArray,
  };
}

submitMenuForm(values) {
  console.log(values, "valuesNewPromo");

  let formData = {};

  let data = values;
  let { zoneArray, regionArray, restaurantArray, categoryArray, itemArray } = this.extractUniqueValues(data);

  console.log('Zone Array:', zoneArray);
  console.log('Region Array:', regionArray);
  console.log('Restaurant Array:', restaurantArray);
  console.log('Category Array:', categoryArray);
  console.log('Item Array:', itemArray);

  Promise.all([
    getdeliveryregionsNew({ deliverRegionId: regionArray ? regionArray :[] }),
    getRestaurentNew({ shopId: restaurantArray }),
    getshopcategoryNew({ categoryId: categoryArray }),
    getmenulistNew({ itemId: itemArray }),
  ])
  .then((responses) => {
    const [
      regionResponse,
      restaurantResponse,
      categoryResponse,
      itemResponse,
    ] = responses;

    console.log(regionArray,"regionArray1")
    this.setState(
      {
        apiRegionData: regionArray.length == 0 || (regionArray.length == 1 && regionArray[0] == undefined) ? []: regionResponse.data.data ,
        apiRestaurantData: restaurantArray.length ? restaurantResponse.data.data.shop : [],
        apiCategoryData: categoryArray.length ? categoryResponse.data.data : [],
        apiItemData: itemArray.length ? itemResponse.data.data.menu: [],
      },
      () => {
        console.log("State Updated:", this.state); // Log the updated state
        let {
          containedZoneArray,
          containedRegionArray,
          containedShopArray,
          containedCategoryArray,
        } = this.extractUniqueValuesApi();

        let {
          zoneObjectArray,
          regionObjectArray,
          shopObjectArray,
          categoryObjectArray,
          itemObjectArray
        } = this.enrichPayloadArrays(zoneArray, regionArray, restaurantArray, categoryArray, itemArray, containedZoneArray, containedRegionArray, containedShopArray, containedCategoryArray);
        console.log("zoneObjectArray", zoneObjectArray,regionObjectArray,shopObjectArray,categoryObjectArray,itemObjectArray); // Log the updated state
        

        // Add other form data
        let phoneNumbers = [];
        if (values.phoneNumber) {
          values.phoneNumber.forEach((item) => {
            phoneNumbers.push(item.value);
          });
        }
        const hasEmptyFields = (shopObjectArray.length === 0 && categoryObjectArray.length === 0 && itemObjectArray.length === 0 &&  zoneObjectArray.length === 0 && regionObjectArray.length === 0 && !values.business_zone ) 

        console.log(hasEmptyFields && values.isBroadcast, "Broadcast field")
       
        if(hasEmptyFields){
          formData["applicableTo"] = true;
        }else{
          formData["applicableTo"] = false;
          formData["isBroadcastToAll"] = false;

        }
        if(ROLE_ID.SERVICE_PROVIDER){
          formData["isApprovalRequired"] = false
        }else{
          formData["isApprovalRequired"] = true
    
        }
        
        
        formData = {
          userRole: ROLE_ID.SERVICE_PROVIDER,
          couponCode: values.coupon_code ? values.coupon_code : null,
          couponType: values.coupon,
          status: 0,
          daysType: parseInt(values.days_type),
          discountType: values.discount_type,
          isOtherCouponApplicable: values.promocode_with_other ? true : false,
          title: values.title,
          description: values.description,
          minOrderAmount: parseInt(values.minimum_subtotal),
          maxDiscount: !values.max_discount ? parseInt(values.discount) : parseInt(values.max_discount),          businessZones: values.business_zone,
          discount: parseInt(values.discount),
          totalCoupons: values.uses_per_coupon ? values.uses_per_coupon : -1,
          validPerUser: values.uses_per_customer ? values.uses_per_customer : -1,
          isAdminPromo: parseInt(values.isMerchantPromo),
          adminBearPercentage: values.adminBearCost,
          merchantBearPercentage: values.merchantBearCost,
          userType: values.userType ? values.userType : 1,
          zones:zoneObjectArray,
          regions:regionObjectArray.flat(),
          shops:shopObjectArray,
          categories:categoryObjectArray,
          items:itemObjectArray,
          applicableTo:hasEmptyFields ? true:false,
          isApprovalRequired:ROLE_ID.SERVICE_PROVIDER ? true : false,
          isApplicableToAll:hasEmptyFields ? true :false,
          isCreatedByAdmin: true,
          specificUsersContact: phoneNumbers,
          csv_records: values.csv_records,
          isBroadcast:values.isBroadcast,
        };

        if (values.image) {
          formData["imageId"] = values.image;
        }
        if (values.promo_banner_image) {
          formData["secondaryImageId"] = values.promo_banner_image;
        }
        
        if (values.days_type == 1) {
          formData["startDate"] = values.start_date;
          formData["endDate"] = values.end_date;
          formData["startTime"] = values.start_time;
          formData["endTime"] = values.end_time;
        } else {
          formData["startTime"] = values.start_time;
          formData["endTime"] = values.end_time;
        }
        if(hasEmptyFields && values.isBroadcast){
          formData["isBroadcastToAll"] = true;
        }else{
          formData["isBroadcastToAll"] = false;
        }

        formData["metaData"] = { ...values };
        if (this.props.match.params.index) {
          formData["id"] = parseInt(this.props.match.params.index);
        }

        console.log(formData, "formData");

        if (this.props.match.params.index) {
          return updatePromoCodeUsingMicroservice(formData).then((result) => {
            toast.success('Promo code updated successfully.');
            this.props.reset();
            this.props.history.push('/dashboard/newpromocodes');
          }).catch(error => {
            // Handle error
          });
        } else {
          return savePromoCodeUsingMicroservice(formData).then((result) => {
            toast.success('Promo code added successfully.');
            this.props.reset();
            this.props.history.push('/dashboard/newpromocodes');
          }).catch(error => {
            // Handle error
          });
        }
      }
    );
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });


}

enrichPayloadArrays(zoneArray, regionArray, restaurantArray, categoryArray, itemArray, containedZoneArray, containedRegionArray, containedShopArray, containedCategoryArray) {
  let { apiRegionData, apiRestaurantData, apiCategoryData, apiItemData } = this.state;
  console.log(zoneArray,containedZoneArray,"ZONNE")
  console.log(regionArray,containedRegionArray,"REGIONS")
  console.log(restaurantArray,containedShopArray,"SHOPSS")
  console.log(categoryArray,containedCategoryArray,"CATEGORY")
  let zoneObjectArray = zoneArray.map(zoneId => {
    if (zoneId) {
        return {
            zoneId,
            isApplicableToAllRegions: !containedZoneArray.includes(zoneId)
        };
    
    }
    return null

}).filter(zoneObj => zoneObj !== null);

  let regionObjectArray = []
  if (Array.isArray(regionArray) && regionArray.length > 0) {

    if(regionArray[0]){

    regionObjectArray = regionArray[0].map(regionId => {
    console.log(regionId,"regionId")
    console.log(containedRegionArray.includes(regionId),"containedRegionArray.includes(regionId)")

    return(
    {
    regionId,
    isApplicableToAllShops: !containedRegionArray.includes(regionId),
  })});
}

}

  let shopObjectArray = [] ;
  if (Array.isArray(restaurantArray) && restaurantArray.length > 0) {
    if(restaurantArray[0]){

    shopObjectArray = restaurantArray.map(shopId => ({
    shopId,
    isApplicableToAllCategories: !containedShopArray.includes(shopId),
  }));
}
}

  let categoryObjectArray = []
  if (Array.isArray(categoryArray) && categoryArray.length > 0) {

    if(categoryArray){
      categoryObjectArray = categoryArray.map(categoryId => ({
    categoryId,
    isApplicableToAllItems: !containedCategoryArray.includes(categoryId),
  }));
}

}
  let itemObjectArray = itemArray.map(itemId => ({ itemId }));

  // Enrich payload arrays
  regionObjectArray.forEach(region => {
    let matchingRegion = apiRegionData.find(apiRegion => apiRegion.id === region.regionId);
    if (matchingRegion) {
      region.zoneId = matchingRegion.zoneId;
    }
  });

  shopObjectArray.forEach(shop => {
    let matchingShop = apiRestaurantData.find(apiShop => apiShop.shopId === shop.shopId);
    if (matchingShop) {
      shop.zoneId = matchingShop.zoneId;
      shop.regionId = matchingShop.regionId;
    }
  });

  categoryObjectArray.forEach(category => {
    let matchingCategory = apiCategoryData.find(apiCategory => apiCategory.id === category.categoryId);
    if (matchingCategory) {
      category.zoneId = matchingCategory.zoneId;
      category.regionId = matchingCategory.regionId;
      category.shopId = matchingCategory.shopId;
    }
  });

  itemObjectArray.forEach(item => {
    let matchingItem = apiItemData.find(apiItem => apiItem.id === item.itemId);
    if (matchingItem) {
      item.zoneId = matchingItem.zoneId;
      item.regionId = matchingItem.regionId;
      item.shopId = matchingItem.shopId;
      item.categoryId = matchingItem.categoryId;
    }
  });
  console.log('Payload Zone Array:', zoneObjectArray);
  console.log('Payload Region Array:', regionObjectArray);
  console.log('Payload Shop Array:', shopObjectArray);
  console.log('Payload Category Array:', categoryObjectArray);
  console.log('Payload Item Array:', itemObjectArray);
  return {
    zoneObjectArray,
    regionObjectArray,
    shopObjectArray,
    categoryObjectArray,
    itemObjectArray
  };
  
}

  componentWillMount(){
    if(this.props.match.params.index){
    getCouponsByIdUsingMicroservice({couponId : this.props.match.params.index}).then((response) => {
      // console.log(response.data.responseData.data,"responseWillMount")
      this.props.initialize(response.data.responseData.data.metadata);
      this.setState({
        itemImageUrl: response.data.responseData.data && response.data.responseData.data.imageDetails && response.data.responseData.data.imageDetails.thumbnail ? response.data.responseData.data.imageDetails.thumbnail  : null,
        getCouponType: response.data.responseData.data.metadata
      });
      this.setState({
        promoBannerImageUrl: response.data.responseData.data && response.data.responseData.data.secondaryImageDetails && response.data.responseData.data.secondaryImageDetails.thumbnail ? response.data.responseData.data.secondaryImageDetails.thumbnail  : null
      });
    });
  }
  }
 
  handleBroadcast(e) {
    console.log(e, "Received broadcast");
    const isChecked = e.target.checked;
    console.log(isChecked,"isChecked")
    if (isChecked) {
      this.setState({
        hideItemAndCategory: true,
        bearCostBy:2
      });
      this.props.change('isMerchantPromo', '2');
      this.props.isBroadcastSuccess(2)
  
    } else {
      this.setState({
        hideItemAndCategory: false,
        bearCostBy:0

      });
      this.props.change('isMerchantPromo', '0');
      this.props.isBroadcastSuccess(0)

  
    }
  }

  render() {
    const {handleSubmit, pristine, submitting,itemObject,categoryObject} = this.props;
    const {isAction,couponType,promoBannerImageUrl,itemImageUrl,hideItemCategory,bearCostBy} = this.state;
    // console.log(itemImageUrl,promoBannerImageUrl,"itemObject")
    // console.log(categoryObject,"categoryObject")
    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">{this.props.match.params.index ? "Edit New Promocode" : "Add New Promocode"}</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                <PromoNewCodeInfo couponType={couponType} updateDateInfo={this.updateDateInfo} isActionUpdate={this.isActionUpdate} promoBannerImageUrl={promoBannerImageUrl} itemImageUrl={itemImageUrl} 
                existingCouponType={this.state.getCouponType} updateBroadcast={this.handleBroadcast}
                bearCostBy={bearCostBy}
                />
               
              
                  <PromoNewCodeAction 
                isActionUpdate={this.isActionUpdate}

                  />
                  
                {/* <RenderBusinessZoneCondition/> */}
                <PromoNewCodeCondition hideItemCategory={hideItemCategory} />
                

                <div className="row save-button-block">
                  <div className="col-sm-12 align-self-center">
                    <button type="submit" disabled={submitting} className="btn green-btn">Submit details{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    
                  </div>
                </div>
                  
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
   isBroadcastSuccess: (payload) => {
      dispatch(isBroadcastSuccess(payload));
    },
  
  };
}
const mapStatesToProps = (state, ownProps) => {
  
  // console.log(state.NewPromoCode,"categoryItems")
  return {
    itemObject: Object.values(state.NewPromoCode.item_Object),
    categoryObject:state.NewPromoCode.category_Object,
    categoryItems:state.NewPromoCode.categoryItems,
    shopObject:state.NewPromoCode.shop_Object,
    regionObject:state.NewPromoCode.region_Object,
    zoneObject:state.NewPromoCode.zone_Object
  }
}
AddNewPromoCode = reduxForm({
  form: 'AddNewPromoCodeValue',
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
  validate
})(AddNewPromoCode)

export default connect(mapStatesToProps,mapDispatchToProps)(AddNewPromoCode);

