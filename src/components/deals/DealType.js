import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { ROLE_ID, USERS_CONSTANTS_TYPE } from "../../constants";
import AddDealForm from "./AddDealForm";
import { connect } from "react-redux";
import { getmenulistNew, getshopcategoryNew } from "../../actions/shops";
import { savePromoCodeUsingMicroservice } from "../../actions/newpromocodes";
import { toast } from "react-toastify";
import validate from "./ValidateDealForm";
import { Link, withRouter } from "react-router-dom"; 


class DealType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      showItems: 0,
      restaurentCategoryList: [],
      shopId: "",
      restaurentCategoryItemList: [],
      discountType:[],
      isAction: true,
    
      apiCategoryData:[],
      apiItemData:[],
      apiFreeCategoryData:[],
      apiFreeitemData:[]

    };
    
    this.isActionUpdate = this.isActionUpdate.bind(this);
    this.updateDateInfo = this.updateDateInfo.bind(this);
    this.extractUniqueValues = this.extractUniqueValues.bind(this);
    this.extractUniqueValuesApi = this.extractUniqueValuesApi.bind(this);
    this.functionApiCall = this.functionApiCall.bind(this);


  }

  

  componentDidMount(){
   
    this.props.change("days_type", "0");
    this.setState({
      shopId: this.props.match.params.index,
    })
  }
  updateDateInfo(datename, date) {
    this.props.change(datename, date);
  }

  

  extractUniqueValuesApi(apiItemsArray, apiCategoriesArray) {
    console.log(apiItemsArray, apiCategoriesArray,"apiItemsArrayapiCategoriesArray")
    let containedCategoryArray = [];
    apiItemsArray.forEach(item => {
      if (apiCategoriesArray.some(category => category.id === item.categoryId) && !containedCategoryArray.includes(item.categoryId)) {
        containedCategoryArray.push(item.categoryId);
      }
    });
    return containedCategoryArray;
  }

  

  async extractUniqueValues(data) {
    console.log(data,"FlatRate")
    const flatPrice = parseInt(data.flatPrice);

    console.log(data.offer_type, "dataOfferType");
    const params = new URLSearchParams(window.location.search);
    console.log(params,"DEALPARAMS");
    const offerType = params.get("type");
    // alert(parseInt(data.offer_type) !== 0)
    console.log(parseInt(data.offerType) !== 0, "ajkhdaskhd")
    console.log(typeof data.offerType !== 0, "TypeAking")

    let finalPayload = [];
    let categoriesArray = [];
      let itemsArray = [];
      let freeCategoriesArray = [];
      let freeItemsArray = [];

    if(parseInt(data.offer_type) !== 0){
      console.log("hellofromhere---")

      console.log("HeyOFFERTYPE")
    
      for (const entry of data.dealOn) {

        console.log("offerType1",offerType)
       
        if(offerType == "buyAndGet"){
           categoriesArray = [];
           itemsArray = [];
           freeCategoriesArray = [];
           freeItemsArray = [];
        }
    
        console.log(entry, "entry");
        if (Array.isArray(entry.category)) {
          categoriesArray.push(...entry.category);
        }
        if (Array.isArray(entry.item)) {
          itemsArray.push(...entry.item);
        }
        if (Array.isArray(entry.category || entry.free_category)) {
          freeCategoriesArray.push(...entry.category || entry.free_category);
        }
        if (Array.isArray(entry.item || entry.free_item )) {
          freeItemsArray.push(...entry.item || entry.free_item );
        }
    
        console.log(freeCategoriesArray, freeItemsArray,"freeCategoriesArray, freeItemsArray")
        let {apiItemsArray, apiCategoriesArray, apiFreeItemsArray, apiFreeCategoriesArray } = await this.functionApiCall(data, categoriesArray, itemsArray, freeCategoriesArray, freeItemsArray);
    
        let containedCategoryArray = [];
        let containedFreeCategoryArray = [];
    
        if (apiItemsArray.length && apiCategoriesArray.length) {
          containedCategoryArray = this.extractUniqueValuesApi(apiItemsArray, apiCategoriesArray);
        }
        if (apiFreeItemsArray.length && apiFreeCategoriesArray.length) {
          containedFreeCategoryArray = this.extractUniqueValuesApi(apiFreeItemsArray, apiFreeCategoriesArray);
        }
    
        let dataObjectArray = [];
        let freeDataObjectArray = [];
    
        if (apiCategoriesArray.length) {
          for (let i = 0; i < apiCategoriesArray.length; i++) {
            let insertObject;
            if (!containedCategoryArray.includes(apiCategoriesArray[i].id)) {

              

              if(offerType == 'buyAndGet'){
                insertObject = {
                  zoneId: apiCategoriesArray[i].zoneId,
                  regionId: apiCategoriesArray[i].regionId,
                  categoryId: apiCategoriesArray[i].id,
                  shopId: apiCategoriesArray[i].shopId,
                  buyQuantity: parseInt(entry.item_quantity),
                  isAllItem: true,
                  isAllCategory: false,
                  applicableCategoryId: apiCategoriesArray[i].id,
                  getQuantity: parseInt(entry.free_item_quantity),
                  isApplicableAllItem: true,
                  isApplicableAllCategory: false,
                  
                };

                finalPayload.push(insertObject);

              }


              else{

                insertObject = {
                  zoneId: apiCategoriesArray[i].zoneId,
                  regionId: apiCategoriesArray[i].regionId,
                  categoryId: apiCategoriesArray[i].id,
                  shopId: apiCategoriesArray[i].shopId,
                  buyQuantity: parseInt(entry.item_quantity),
                  isAllItem: true,
                  isAllCategory: false
                  
                };
        

            
              if(data.flatPrice) {
                insertObject["flatPrice"] = flatPrice;
              }
              dataObjectArray.push(insertObject);


            }


            }
          }
        }
    
        if (apiItemsArray.length) {
          for (let i = 0; i < apiItemsArray.length; i++) {
            let insertObject = {
              zoneId: apiItemsArray[i].zoneId,
              regionId: apiItemsArray[i].regionId,
              categoryId: apiItemsArray[i].categoryId,
              shopId: apiItemsArray[i].shopId,
              buyQuantity: parseInt(entry.item_quantity),
              isAllItem: false,
              isAllCategory: false,
              itemId: apiItemsArray[i].id,

            };
            if(data.flatPrice) {
              insertObject["flatPrice"] = flatPrice;
            }
            dataObjectArray.push(insertObject);
          }
        }
    
        if (apiFreeCategoriesArray.length && offerType !== "buyAndGet") {
          apiFreeCategoriesArray.forEach(category => {
            if (!containedFreeCategoryArray.includes(category.id)) {


              let insertObject = {
                applicableCategoryId: category.id,
                getQuantity: parseInt(entry.free_item_quantity),
                isApplicableAllItem: true,
                isApplicableAllCategory: false,
                

              };
              if(data.flatPrice) {
                insertObject["flatPrice"] = flatPrice;
              }
              
              freeDataObjectArray.push(insertObject);
            }
          });
        }
    
        if (apiFreeItemsArray.length) {
          apiFreeItemsArray.forEach(item => {
            let insertObject = {
              applicableCategoryId: item.categoryId,
              getQuantity: parseInt(entry.free_item_quantity),
              isApplicableAllItem: false,
              isApplicableAllCategory: false,
              applicableItem: item.id,

            };
            if(data.flatPrice) {
              insertObject["flatPrice"] = flatPrice;
            }
            freeDataObjectArray.push(insertObject);
          });
        }
    
        for (let i = 0; i < dataObjectArray.length; i++) {
          for (let j = 0; j < freeDataObjectArray.length; j++) {
            let insertPayload = { ...dataObjectArray[i], ...freeDataObjectArray[j] };
             
            finalPayload.push(insertPayload);
          }
        }
        
      }
    }else{
      if (Array.isArray(data.category || data.free_category)) {
        freeCategoriesArray.push(...data.category || data.free_category);
    }
    if (Array.isArray(data.item || data.free_item)) {
        freeItemsArray.push(...data.item || data.free_item);
    }
    console.log(freeItemsArray,freeCategoriesArray,"freeItemsArray")
      let { apiFreeItemsArray, apiFreeCategoriesArray } = await this.functionApiCall( data,[],[],freeCategoriesArray, freeItemsArray);
    
      console.log("this is the api call ARRAY",apiFreeCategoriesArray,apiFreeItemsArray)
      let containedFreeCategoryArray = [];
  
      if(data.type == 6 || data.type == 7){
        containedFreeCategoryArray = []
      }else {

        if (apiFreeItemsArray.length && apiFreeCategoriesArray.length) {
          containedFreeCategoryArray = this.extractUniqueValuesApi(apiFreeItemsArray, apiFreeCategoriesArray);
        }
      }


     
  
      let freeDataObjectArray = [];
  
      if(data.deal_type == 7){
        if (apiFreeCategoriesArray && apiFreeCategoriesArray.length) {
          apiFreeCategoriesArray.forEach(category => {
            if (!containedFreeCategoryArray.includes(category.id)) {
              let insertObject = {
                categoryId: category.categoryId,
                flatPrice: data.flatPrice,
                isAllItem: true,
                shopId:this.state.shopId,
                isAllCategory: false,

              };
              if(data.flatPrice) {
                insertObject["flatPrice"] = flatPrice;
              }
              freeDataObjectArray.push(insertObject);
            }
          });
        }
    
        if (apiFreeItemsArray && apiFreeItemsArray.length) {
          apiFreeItemsArray.forEach(item => {
            let insertObject = {
              categoryId: item.categoryId,
              isAllItem: false,
              isAllCategory: false,
              shopId:this.state.shopId,
              itemId: item.id
            };
            if(data.flatPrice) {
              insertObject["flatPrice"] = flatPrice;
            }

            freeDataObjectArray.push(insertObject);
          });
        }
    
          for (let j = 0; j < freeDataObjectArray.length; j++) {
            let insertPayload =  {
            ...freeDataObjectArray[j]}
            finalPayload.push(insertPayload)
        }
      }else{
        console.log(apiFreeItemsArray, "apiFreeItemsArray");

        console.log(data.free_item_quantity, "data.free_item_quantity")
        if (apiFreeCategoriesArray && apiFreeCategoriesArray.length) {
          apiFreeCategoriesArray.forEach(category => {
            if (!containedFreeCategoryArray.includes(category.id)) {
              let insertObject = {
                applicableCategoryId: category.id,
                getQuantity: (data.free_item_quantity && parseInt(data.free_item_quantity)) ? parseInt(data.free_item_quantity) : 1,
                 isApplicableAllItem: true,
                isApplicableAllCategory: false,

              };
              if(data.flatPrice) {
                insertObject["flatPrice"] = flatPrice;
              }
              freeDataObjectArray.push(insertObject);
            }
          });
        }
    
        if (apiFreeItemsArray && apiFreeItemsArray.length) {
          apiFreeItemsArray.forEach(item => {
            let insertObject = {
              applicableCategoryId: item.categoryId,
              getQuantity: (data.free_item_quantity && parseInt(data.free_item_quantity)) ? parseInt(data.free_item_quantity) : 1,
              isApplicableAllItem: false,
              isApplicableAllCategory: false,
              applicableItem: item.id,

            };
            if(data.flatPrice) {
              insertObject["flatPrice"] = flatPrice;
            }

            freeDataObjectArray.push(insertObject);
          });
        }
    
          for (let j = 0; j < freeDataObjectArray.length; j++) {
            let insertPayload =  {
              getQuantity: (data.free_item_quantity && parseInt(data.free_item_quantity)) ? parseInt(data.free_item_quantity) : 1, ...freeDataObjectArray[j]}
            finalPayload.push(insertPayload)
        }
      }
  
     
     
    }
   
  
    console.log("Final Payload:", finalPayload);
    return finalPayload;
  }
  
  
 functionApiCall(data,categoriesArray, itemsArray, freeCategoriesArray, freeItemsArray,) {
  console.log(data,"FunctionApiCalldata")
  console.log(freeCategoriesArray,freeItemsArray,"freeItemsArray","freeCategoriesArray")
  // if(parseInt(data.offer_type) !== 0){
    const params = new URLSearchParams(window.location.search);
    console.log(params,"DEALPARAMS");
    const offerType = params.get("type");
  if(data.type == 5){
    return Promise.all([
      getshopcategoryNew({ categoryId: categoriesArray }),
      getmenulistNew({ itemId: itemsArray, isDeal:true }),
      getshopcategoryNew({ categoryId: freeCategoriesArray }),
      getmenulistNew({ itemId: freeItemsArray, isDeal:true })
    ])
    .then((responses) => {
      const [
        categoryResponse,
        itemResponse,
        freeCategoryResponse,
        freeItemResponse,
      ] = responses;
  
      const apiCategoriesArray = categoryResponse.data.data || [];
      const apiItemsArray = itemsArray && itemsArray.length ? itemResponse.data.data.menu : [];
      const apiFreeCategoriesArray = freeCategoryResponse.data.data || [];
      const apiFreeItemsArray = freeItemsArray && freeItemsArray.length ? freeItemResponse.data.data.menu : [];
  
      this.setState({
        apiCategoryData: apiCategoriesArray,
        apiItemData: apiItemsArray,
        apiFreeCategoryData: apiFreeCategoriesArray,
        apiFreeitemData: apiFreeItemsArray,
      });
  
      return { apiItemsArray, apiCategoriesArray, apiFreeItemsArray, apiFreeCategoriesArray };
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return { apiItemsArray: [], apiCategoriesArray: [], apiFreeItemsArray: [], apiFreeCategoriesArray: [] };
    });
  }
  
  else{
    return Promise.all([
      getmenulistNew({ itemId: freeItemsArray })
    ])
    .then((responses) => {
      const [
        freeItemResponse,
      ] = responses;
  
      const apiFreeItemsArray = freeItemResponse.data.data.menu || [];
  
      console.log(apiFreeItemsArray,"apiFreeCategoriesArray")
      this.setState({
        apiFreeitemData: apiFreeItemsArray,
      });
  
      return { apiFreeItemsArray };
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return {  apiFreeItemsArray: [] };
    });
  }
    
  }

  async submitMenuForm(values) {
    console.log(values, "DealsValue");
    const params = new URLSearchParams(window.location.search);
    console.log(params,"DEALPARAMS");
    const offerType = params.get("type");

    let formData = {};
  
    let data = values;
  
    let finalPayload = await this.extractUniqueValues(data);

    console.log(finalPayload, "finalPayloadSubmitted");
    let phoneNumbers = [];
    if (values.phoneNumber) {
      values.phoneNumber.forEach((item) => {
        phoneNumbers.push(item.value);
      });
    }

    formData = {
      title:values.name,
      description:values.description,
      totalCoupons: values.uses_per_coupons ? values.uses_per_coupons : -1,
      validPerUser: values.uses_per_customer ? values.uses_per_customer : -1,
      userType:values.coupon == 2 ? USERS_CONSTANTS_TYPE.SPECIFIC_USER : values.userType ? values.userType : USERS_CONSTANTS_TYPE.ALL_USER,
      discountType:values.type,
      minimumOrderAmount:parseInt(values.min_subtotal),
     
      buyAndGetItems:finalPayload,

      totalCoupons: values.uses_per_coupons ? values.uses_per_coupons : -1,
      validPerUser: values.uses_per_customer ? values.uses_per_customer : -1,
      // discountType : values.discountType,
      isCreatedByAdmin:true,
      startDate:values.start_date,
      endDate:values.end_date,
      startTime:values.start_time,
      endTime:values.end_time,
      userRole: ROLE_ID.MERCHANT,
      specificUsersContact: phoneNumbers,
      couponType:1,
      merchantShopId:this.state.shopId
    }

    formData["metaData"] = { ...values };
    console.log(formData,"DealFormData");
// return
    savePromoCodeUsingMicroservice(formData).then((result) => {
      toast.success('Deal added successfully.');
      this.props.reset();
      this.props.history.push(`/dashboard/deals?tab=create`);
    }).catch(error => {
      // Handle error
    });
  
  
  }
  

  isActionUpdate(type) {
    this.setState({
      isAction: type ? false : true,
    });
  }


  componentWillMount() {
    if (this.props.fields && this.props.fields.length == 0) {
      this.props.fields.push();
    }
  }
  
  

 
  render() {
    const { restaurentCategoryList, showItems, restaurentCategoryItemList,discountType } =
      this.state;
    const { handleSubmit, formProps, fields } = this.props;
    console.log(showItems,"showItems")
    let queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams,"queryParams");
    const queryParamsType = queryParams.get("type");
    console.log(queryParamsType,"queryParamsType");
    return (
      <>
        <div className="container ani-ui-block">
          <div className="row menu-top-block">
            <div className="col-sm-12 tl-block align-self-center">
              <h4 className="heading">Add {queryParamsType == "buyAndGet" ? "Buy One & Get Offer" : queryParamsType == "freebies" ? "Freebie Offer" : queryParamsType == "flatRate" ? "Flat Rate Offer":"Deal"}</h4>
            </div>
          </div>
          <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
            <>
          
            <AddDealForm
            isActionUpdate={this.isActionUpdate}
            updateDateInfo={this.updateDateInfo}
            />
            </>
          </form>
        </div>
      </>
    );
  }
}



const mapStatesToProps = (state, ownProps) => {
  console.log(state, "DealState")
  return {
   
  };
};
DealType = reduxForm({
  form: "AddNewDealType",
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
  validate,
})(withRouter(DealType));

export default connect(mapStatesToProps)(DealType);
