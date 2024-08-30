import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import renderField from "../FormFields/renderField";
import renderReactSelect from "../FormFields/renderReactSelect";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";
import { getdeliveryregionsNew, regionListing } from "../../actions/regions";
import { categoryTypeListing } from "../../actions/newpromotion";
import validate from "./ValidatePromoInfo";

class PromotionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCouponBox: false,
      status: props.status,
      zoneListing:[],
      regionListing:[],
      categoryTypeListing:[],
      startDate: null,
      endDate:null
      // itemImageUrl:props.itemImageUrl,
      // promoBannerImageUrl:props.promoBannerImageUrl
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    console.log(props,"propsInfo")
  }

 


  handleChangeStart(sdate) {
    this.setState({
      startDate: sdate,
    });
    this.props.updateDateInfo("start_date", sdate);
  }

  handleChangeEnd(edate) {
    this.setState({
      endDate: edate,
    });
    this.props.updateDateInfo("end_date", edate);
  }

  handleRegions(e){
    getdeliveryregionsNew({regionId:[e.id]}).then((response) => {
      this.setState({
        regionListing: response.data.data,
        zoneId:e.id,
      });
    })
  }

  componentDidMount(){
    regionListing().then((response) => {
      console.log(response,"zoneListing");
      this.setState({
        zoneListing: response.data.data.region,
      });
    });
    categoryTypeListing().then((response) => {
      console.log(response,"categoryListing")
      this.setState({
        categoryTypeListing: response.data.categories,
      });
    })
    getdeliveryregionsNew().then((response) => {
      this.setState({
        regionListing: response.data.data,
      });
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps,prevState,"prevState")
    if (nextProps.initialDate && nextProps.initialDate.start_date !== prevState.startDate) {
      return {
        startDate: nextProps.initialDate.start_date,
        endDate: nextProps.initialDate.end_date,
      };
    }
    return null;
  
}
  render() {
    const {
      zoneListing,
      regionListing,
      categoryTypeListing,
      initialDate
    } = this.state;

    console.log(categoryTypeListing,initialDate,"categoryTypeListing")
    return (
      <>
        <div className="fields-ui-block promocode-ui">
          <div className="basic-details">
            <div className="heading">
              <h4>Basic Information</h4>
            </div>
            <div className="form-block">
              <div className="row">
                <div className="col-lg-6">
                  <Field
                    name="name"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Name"
                    placeholder=""
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="basePrice"
                    component={renderField}
                    type="number"
                    className="form-control"
                    label="Base Price"
                    placeholder=""
                  />
                </div>

              </div>

              <div className="row">
              
                <div className="col-lg-6">
                  <Field
                    name="perClickCharges"
                    component={renderField}
                    type="number"
                    className="form-control"
                    fieldClass="manage-text"
                    label="Per click charges"
                    placeholder=""
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="minimumDays"
                    component={renderField}
                    type="number"
                    className="form-control"
                    fieldClass="manage-text"
                    label="Minimum Days"
                    placeholder="e.g. 7"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <Field
                    name="scheduleHours"
                    component={renderField}
                    type="number"
                    className="form-control"
                    fieldClass="manage-text"
                    label="Minimum Schedule Hours"
                    placeholder="e.g. 4"
                  />
                  </div>
                </div>

             
              <div className="row">
                <div className="col-lg-6">
                  <Field
                    label="Zone"
                    name={`zone`}
                    optionLabel="name"
                    optionValue="id"
                    options={zoneListing}
                    component={renderReactSelect}
                    placeholder="Select Zone"
                    multi={false}
                    disabled={this.props.editSettingId ? true : false}
                    className="select-ui"
                    parentDivClass="form-group w-100"
                    isClearable={true}
                    parentCallback={(e) =>  this.handleRegions(e) }
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    label="Region"
                    name={`region`}
                    optionLabel="name"
                    optionValue="id"
                    options={regionListing}
                    disabled={this.props.editSettingId ? true : false}
                    component={renderReactSelect}
                    placeholder="Select Region"
                    multi={true}
                    clearable={true}
                    className="select-ui"
                    parentDivClass="form-group w-100"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                <Field
                  label="Type"
                  name="promotionType"
                  optionLabel='label'
                  optionValue='value'
                  options={categoryTypeListing.map((item) => ({
                    label: item.title,
                    value: item.id
                  }))}
                  component={renderReactSelect}
                  placeholder="Choose type"
                  multi={false}
                  parentDivClass="form-group w-100"
                  />
                  
                </div>
                
                <div className="col-lg-6">
                  <Field
                    name="limit"
                    component={renderField}
                    type="number"
                    className="form-control"
                    fieldClass="manage-text"
                    label="Limit"
                    placeholder="e.g. 4"
                  />
                </div>
              </div>
              {/* <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-0">
                    <label>Start Date</label>
                    <DatePicker
                      name="start_date"
                      selected={this.state.startDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeStart}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Choose start date"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group mb-0">
                  <label>End Date</label>

                    <DatePicker
                      name="end_date"
                      selected={this.state.endDate}
                      selectsEnd
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeEnd}
                      minDate={this.state.startDate}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Choose end date"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group ri-block row">
                <ul className="cs-check-box">
                  <li>
                    <div className="os-check-box">
                      <Field
                        name="isApplicableToAll"
                        id="isApplicableToAll"
                        component="input"
                        type="checkbox"
                      />
                      <label for="isApplicableToAll">Applicable To All</label>
                    </div>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
PromotionInfo = withRouter(PromotionInfo);
export default reduxForm({
  form: "AddNewPromotionSettingValue",
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
  validate,
})(PromotionInfo);
