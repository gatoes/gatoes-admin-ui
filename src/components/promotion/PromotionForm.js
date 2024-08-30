import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import renderField from "../FormFields/renderField";
import renderReactSelect from "../FormFields/renderReactSelect";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";
import { getdeliveryregionsNew, regionListing } from "../../actions/regions";
import { categoryTypeListing, getPromotionCategoryByIdUsingMicroservice } from "../../actions/newpromotion";
import MenuItemImage from "../menu/MenuItemImage";
import renderDatePicker from "../FormFields/renderDatePicker";
import { getShopListing, promotionListingByZoneRegionUsingMicroservice } from "../../actions/shops";
import validate from "./ValidateForm";

class PromotionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCouponBox: false,
      status: props.status,
      restaurentListing: [],
      categoryTypeListing: [],
      startDate: null,
      endDate: null,
      minimumDays: null,
      perClickCharges: null,
      basePrice: null,
      getPromotionId:null,
      minEndDate:null,
      merchantId:null
      // itemImageUrl:props.itemImageUrl,
      // promoBannerImageUrl:props.promoBannerImageUrl
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
   this.handleType = this.handleType.bind(this);
   this.handleSetting = this.handleSetting.bind(this);


    console.log(props, "propsInfo");
  }

  handleChangeStart(sdate) {
    const minEndDate = new Date(sdate.getTime() + 12 * 24 * 60 * 60 * 1000); 
  this.setState({
    startDate: sdate,
    minEndDate: minEndDate,
  });
  this.props.updateDateInfo("start_date", sdate);
   
  }

  handleChangeEnd(edate) {
    this.setState({
      endDate: edate,
    });
    this.props.updateDateInfo("end_date", edate);
  }


  componentDidMount() {
    getShopListing({is_all: true}).then((response) => {
      console.log(response, "restaurentListing");
      this.setState({
        restaurentListing: response.data.data,
      });
    });
    categoryTypeListing().then((response) => {
      console.log(response, "categoryListing");
      this.setState({
        categoryTypeListing: response.data.categories,
      });
    });
   
  }

 
  // handleChangeEnd(edate) {
  //   this.setState({
  //     endDate: edate,
  //   });
  //   this.props.updateDateInfo("end_date", edate);
  // }

  // handleChangeStart(sdate) {
  //   const minEndDate = new Date(sdate.getTime() + 12 * 24 * 60 * 60 * 1000); // 12 days later
  //   this.setState({
  //     startDate: sdate,
  //     minEndDate: minEndDate,
  //   });
  //   this.props.updateDateInfo("start_date", sdate);
  // }
  
  handleChangeStart(sdate) {
    const minEndDate = new Date(sdate.getTime() + 12 * 24 * 60 * 60 * 1000); // 12 days later
    this.setState({
      startDate: sdate,
      minEndDate: minEndDate,
      // endDate: this.state.endDate < minEndDate ? null : this.state.endDate, // Reset end date if it's invalid
    });
    this.props.updateDateInfo("start_date", sdate);
  }
  
  handleChangeEnd(edate) {
    // if (edate >= this.state.minEndDate) {
      this.setState({
        endDate: edate,
      });
      this.props.updateDateInfo("end_date", edate);
    }
  // }

  
  handleType(e) {
    console.log(this.props, "Props")
    console.log(e,"HandleType")
    this.setState({
      minimumDays: e.metaData.minimumDays,
      perClickCharges: e.metaData.perClickCharges,
      basePrice:parseInt(e.metaData.basePrice),
    });
  }

 
  handleSetting(e) {
    console.log( e, "SettingId")
    promotionListingByZoneRegionUsingMicroservice({ shopId: e.value, promotionType: 3 }).then((response) => {
      const promotion = response.data.responseData.promotions[0];
      const promotionDetails = promotion ? {
        getPromotionId: promotion.id,
        merchantId: e.value,
        minimumDays: promotion.minimumDays,
        perClickCharges: promotion.perClickCharges,
        basePrice: parseInt(promotion.basePrice),
        scheduleHours: promotion.scheduleHours,
      } : {};

      this.setState(promotionDetails);

      this.props.updatePromotionDetails(promotionDetails);

      if (!promotion) {
        getPromotionCategoryByIdUsingMicroservice({ categoryId: 3 }).then((response) => {
          const category = response.data.category;
          const categoryDetails = {
            minimumDays: category.minimumDays,
            merchantId: e.value,
            perClickCharges: category.perClickCharges,
            basePrice: parseInt(category.basePrice),
            scheduleHours: category.scheduleHours,
          };

          this.setState(categoryDetails);

          this.props.updatePromotionDetails(categoryDetails);
        });
      }
    });
  }


  render() {
    const { restaurentListing, categoryTypeListing, minimumDays, perClickCharges, basePrice, initialDate, startDate, endDate, minEndDate } =
    this.state;

    const minStartDate = new Date();

    console.log(categoryTypeListing, initialDate, "categoryTypeListing");
    console.log(restaurentListing,"restaurentListing")
    console.log(minStartDate,startDate,"minStartDate")
    return (
      <>
        <div className="fields-ui-block promocode-ui">
          <div className="basic-details">
            <div className="heading">
              <h4>Basic Information</h4>
            </div>
            <div className="form-block">
            <div className="row">
                <div className="col">
                  <Field
                    label="Restaurant Name"
                    name="shopId"
                    optionLabel="label"
                    optionValue="value"
                    options={restaurentListing.map((item) => ({
                      label: item.shopName,
                      value: item.id,
                    }))}
                    component={renderReactSelect}
                    placeholder="Choose restaurant"
                    multi={false}
                    parentDivClass="form-group w-100"
                    parentCallback={(e) => {
                      this.handleSetting(e);
                    }}

                  /> 
                </div>

               
              </div>
              <div className="row">
              <div className="col-lg-6">
                <Field
                  name="start_date"
                  component={renderDatePicker}
                  label="Start Date & Time"
                  className="form-control"
                  innerParentDivClass="expirydate"
                  labelClass="control-label"
                  minDate={minStartDate}
                  startDate={startDate}
                  endDate={endDate}
                  showTimeSelect={true}
                  onChange={this.handleChangeStart}
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd h:mm aa"
                  timeCaption="Time"
                  selectsEnd={true}
                  placeholderText="Choose start date and time"
                />
              </div>
              <div className="col-lg-6">
                <Field
                  name="end_date"
                  component={renderDatePicker}
                  label="End Date & Time"
                  className="form-control"
                  innerParentDivClass="expirydate"
                  labelClass="control-label"
                  minDate={minStartDate}
                  startDate={startDate}
                  endDate={endDate}
                  showTimeSelect={true}
                  onChange={this.handleChangeEnd}
                  timeFormat="HH:mm"
                  selected={endDate}
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd h:mm aa"
                  timeCaption="Time"
                  selectsEnd={true}
                  placeholderText="Choose end date and time"
                />
              </div>
            </div>
              <div className="row">
                
                <div className="col-lg-12">
                  <Field
                    name="budget"
                    component={renderField}
                    type="number"
                     className="form-control"
                   label="Budget"
                    fieldClass="manage-text"
                    placeholder="e.g. 7000"
                  />
                </div>
              </div>

              <p className="divider_minDays"><span className="minimumDays">* Minimum number of days for promotion is:</span> <span className="subTitle_headline">{minimumDays ? `${minimumDays}`: ""}</span></p>
                <p className="divider_minDays"><span className="minimumDays">* Per Click Charges for promotion is:</span> <span className="subTitle_headline">{perClickCharges ? `₹${perClickCharges}`: ""}</span></p>
                <p className="divider_minDays"><span className="minimumDays">* Base Price of promotion is:</span> <span className="subTitle_headline">{basePrice ? `₹${basePrice}` : ""} </span></p>
              
            </div>
          </div>
         
        </div>
      </>
    );
  }
}
PromotionForm = withRouter(PromotionForm);
export default reduxForm({
  form: "AddPromotionValue",
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(PromotionForm);
