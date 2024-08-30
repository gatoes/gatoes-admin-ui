import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import renderField from "../FormFields/renderField";
import renderReactSelect from "../FormFields/renderReactSelect";
import {  FLAT_DISCOUNT, MINIMUM_SUBTOTAL, OPENING_CLOSING_TIME, OPENING_TIME, USER_TYPE } from "../../constants";
import { getmenulistNew, getshopcategoryNew } from "../../actions/shops";
import renderRadio from "../FormFields/renderRadio";
import RenderNewDealOption from "./RenderNewDealOption";
import DatePicker from "react-datepicker";
import { Link, withRouter } from "react-router-dom"; 
import "react-datepicker/dist/react-datepicker.css";
import renderDatePicker from '../FormFields/renderDatePicker';

import { getDiscountTypesUsingMicroservice } from "../../actions/regions";
import RenderCreatableSelect from "../common/renderCreatableSelect";
import moment from "moment";
class AddDealForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: "",
          showItems: 0,
          restaurentCategoryList: [],
          shopId: "",
          restaurentCategoryItemList: [],
          discountType:[],
          freeCategoryItemList:[],
          freeCategoryList:[],
          isAction: true,
          startDate: "",
          showDateRange: 0,
         showPhoneNumber:false,
         hideSubtotal:false,
         showFlatPrice:false,
         showFlatPriceInput:false,
         showSubtotalInput:false,

    
        };
        this.handleAllChecked = this.handleAllChecked.bind(this);
        this.handleRadioChecked = this.handleRadioChecked.bind(this);
        this.handleCatItem = this.handleCatItem.bind(this);
        this.couponChecked = this.couponChecked.bind(this);
        this.handleFreeCatItem = this.handleFreeCatItem.bind(this);
        this.userTypeChecked = this.userTypeChecked.bind(this)
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleShowFlatInput = this.handleShowFlatInput.bind(this)
        this.handleShowSubtotalInput = this.handleShowSubtotalInput.bind(this)
      }

     

  componentDidMount() {

    // let getShopId = JSON.parse(localStorage.getItem('auth'))
    this.props.change("offer_type", "0");
    const params = new URLSearchParams(window.location.search);
    
    const type = params.get("type");
    this.setState({
      shopId: this.props.match.params.index,
    })
    console.log(this.props.match.params.index,"this.props.match.params.index");
    getshopcategoryNew({ shopId: [this.props.match.params.index] }).then((response) => {
      this.setState({
        restaurentCategoryList: response.data.data ? response.data.data : [],
      });
    });
    getmenulistNew({ shopId: [this.props.match.params.index], isDeal:true }).then((response) => {
      this.setState({
        restaurentCategoryItemList: response.data.data.menu
          ? response.data.data.menu
          : [],
      });
    });
    getDiscountTypesUsingMicroservice({isDeal:1}).then((response) => {
      this.setState({
        discountType: response.data.responseData.rows,
      });
      
    });

    if(type == "buyAndGet"){
      this.setState({
        hideSubtotal:true,
        showItems: 1,
        showFlatPrice:false
      });
    this.props.change("offer_type", "1");

    }else if(type == "flatRate"){
      this.setState({
        showFlatPrice: true,
        hideSubtotal:false,
        showItems: 0
      });
    this.props.change("offer_type", "0");
    }else if(type == "freebies"){
      this.setState({
        showItems: 0,
        showFlatPrice:false,
        hideSubtotal:false
      })
    this.props.change("offer_type", "0");
    }else{
      this.setState({
        showItems: 0,
        showFlatPrice:false

      });
    this.props.change("offer_type", "0");
    }
     
    this.setState({
      minTime : this.calculateMinTime(new Date())
    })
  }

  calculateMinTime = date => {
    let isToday = moment(date).isSame(moment(), 'day');
    if (isToday) {
        let nowAddOneHour = moment(new Date()).toDate();
        return nowAddOneHour;
    }
    return moment().startOf('day').toDate(); // set to 12:00 am today
  }

  handleCatItem(e) {
    const categoryIds = e.map((cat) => cat.id);

    getmenulistNew({ shopId: this.state.shopId, categoryId: categoryIds, isDeal:true }).then(
      (response) => {
        this.setState({
          restaurentCategoryItemList: response.data.data.menu,
        });
      }
    );
  }

  handleAllChecked(e) {
    // console.log(e.target.value, "Checking EE");
    this.setState({
      showItems: e.target.value,
    });
  }

  handleRadioChecked(e) {
    // console.log(e.target.value, "Checking EE");
    this.setState({
      // showItems: e.target.value,
      showDateRange: e.target.value,
    });
  }

  handleChangeStart(sdate) {
    let isToday = moment(sdate).isSame(moment(), 'day');
    this.setState({
      startDate: sdate,
      minTime: isToday ? this.calculateMinTime(new Date()) : moment().startOf('day').toDate()
    });
    this.props.updateDateInfo("start_date", sdate);
  }

  handleChangeEnd(edate) {
    let isToday = moment(edate).isSame(moment(), 'day');
    this.setState({
      startDate: edate,
      minTime: isToday ? this.calculateMinTime(new Date()) : moment().startOf('day').toDate()
    });
    this.props.updateDateInfo("end_date", edate);
  }

  handleChangeStartTime(stime) {
    this.setState({
      startTime: stime,
    });
    this.props.updateDateInfo("start_time", stime);
  }

  handleChangeEndTime(etime) {
    this.setState({
      endTime: etime,
    });
    this.props.updateDateInfo("end_time", etime);
  }

  couponChecked(e){
    console.log(e,"HeyEvent")
    const chkval = e.value;
    // const chkval = e.target.id;
    console.log(chkval, "CheckValue");
    if(chkval == 5){
      this.setState({
        hideSubtotal:true,
        showItems: 1,
        showFlatPrice:false
      });
    this.props.change("offer_type", "1");

    }else if(chkval == 7){
      this.setState({
        showFlatPrice: true,
        hideSubtotal:false,
        showItems: 0
      });
    this.props.change("offer_type", "0");

    }else if(chkval == 6){
      this.setState({
        showItems: 0,
        showFlatPrice:false,
        hideSubtotal:false
      })
    this.props.change("offer_type", "0");

    } else {
      this.setState({
        showItems: 0,
        showFlatPrice:false

      });
    this.props.change("offer_type", "0");

    }
    this.props.isActionUpdate(chkval)
  }

// function to handle free item category 
handleFreeCatItem(e) {
    let freecategoryIds = e.map((cat) => cat.id);
    // // console.log(e,"EventcategoryIds")

    // if(e.length == 0){
    //   this.setState({
    //     freeCategoryItemList: [],
    //   });
    // }else{
      getmenulistNew({ shopId: this.state.shopId, categoryId: freecategoryIds, isDeal:true }).then(
        (response) => {
          this.setState({
            freeCategoryItemList: response.data.data.menu,
          });
        }
      );
    // }
   
  }

  userTypeChecked(e){

    let findUser  = e.value;
    if(findUser == 5){
      this.setState({
        showPhoneNumber:true
      });
    } 
    else {
      this.setState({
        showPhoneNumber:false
      });
    }
    this.props.isActionUpdate(findUser);
  }
  
  handleShowFlatInput(e){
    this.setState({
      showFlatPriceInput:!this.state.showFlatPriceInput
    });
  }

  handleShowSubtotalInput(e){
    this.setState({
      showSubtotalInput:!this.state.showSubtotalInput
    });
  }
  render() {

    const { restaurentCategoryList,showFlatPriceInput, showItems, showPhoneNumber, restaurentCategoryItemList,discountType,showDateRange,hideSubtotal,showFlatPrice,showSubtotalInput } =
    this.state;
  const { handleSubmit, formProps, fields } = this.props;
  const minStartDate = new Date(new Date().getTime() + 12 * 60 * 60 * 1000);

  console.log(showItems,hideSubtotal, "ShowItems")
  console.log(discountType,restaurentCategoryItemList, "DiscountType")
    return (
     <div className="row">
              <div className="container col-lg-12 col-md-12">
                <div className="add-left-block">
                  <div className="fields-ui-block promocode-ui">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Basic Information</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              label="Title"
                              name="name"
                              component={renderField}
                              placeholder="Enter title"
                              className="form-control"
                              parentDivClass="form-group w-100"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              label="Description"
                              name="description"
                              placeholder="Enter description"
                              component={renderField}
                              className="form-control"
                              parentDivClass="form-group w-100"
                            />
                          </div>
                          
                        </div>
                        <Field
                            label="Discount Type"
                            name="type"
                            optionLabel='label'
                            optionValue='value'
                            options={discountType.map((item) => ({
                              label: item.title,
                              value: item.id
                            }))}
                             component={renderReactSelect}
                                placeholder="Choose Type"
                                multi={false}
                                className="select-ui"
                                parentDivClass="form-group "
                                parentCallback={(e) => this.couponChecked(e)}
                                />
                        
                      <div className="row">
                        <div className="col-lg-6">

                        <Field
                 name="start_date"
                  component={renderDatePicker}
                             label="Start Date & Time (Optional)"
                             className="form-control"
                             innerParentDivClass="expirydate"
                             labelClass="control-label"
                             minDate={new Date()}
                             startDate={this.state.startDate}
                             endDate={this.state.endDate}
                             showTimeSelect={true}
                             minTime={this.state.minTime}
                             onChange={this.handleChangeStart}
                             maxTime={moment().endOf('day').toDate()}
                             timeFormat="HH:mm"
                             timeIntervals={15}
                             dateFormat="yyyy-MM-dd h:mm aa"
                             timeCaption="Time"
                             selectsEnd={true}
                             placeholderText="Choose start date and time"

                          />
                         
                          {/* <div className="form-group">
                         
                          <label class="">Start Date & Time (Optional)</label>

                             <DatePicker
                      name="start_date"
                      selected={this.state.startDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeStart}
                      minDate={minStartDate}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd h:mm aa"
                      timeCaption="Time"
                      placeholderText="Choose Start date and time"
                    />
                          </div> */}
                        </div>

                        <div className="col-lg-6">
                        <Field
                 name="end_date"
                  component={renderDatePicker}
                             label="End Date & Time (Optional)"
                             className="form-control"
                             innerParentDivClass="expirydate"
                             labelClass="control-label"
                             minDate={this.state.startDate != "" ? this.state.startDate : minStartDate}
                             startDate={this.state.startDate != "" ? this.state.startDate : minStartDate}
                             endDate={this.state.endDate}
                             showTimeSelect={true}
                             onChange={this.handleChangeEnd}
                             maxTime={moment().endOf('day').toDate()}
                             timeFormat="HH:mm"
                             selected={this.state.endDate}
                             timeIntervals={15}
                             dateFormat="yyyy-MM-dd h:mm aa"
                             timeCaption="Time"
                             selectsEnd={true}
                             placeholderText="Choose end date and time"

                          />
                          {/* <div className="form-group">
                          <label class="">End Date & Time (Optional)
                          </label>
                          <DatePicker
                      name="end_date"
                      selected={this.state.endDate}
                      selectsEnd
                      startDate={this.state.startDate != "" ? this.state.startDate : minStartDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeEnd}
                      minDate={this.state.startDate != "" ? this.state.startDate : minStartDate}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd h:mm aa"
                      timeCaption="Time"
                      placeholderText="Choose End date and time"
                    />
                           
                          </div> */}
                        </div>
                      </div>
                   
                      </div>
                    </div>
                  </div>
                 
                  {showItems == 1 ? (
                    <>
                      <FieldArray
                        name={`dealOn`}
                        component={RenderNewDealOption}
                        formProps={formProps}
                      />
                    </>
                  ) : (
                    <div className="fields-ui-block promocode-ui action_ui">
                      <div className="basic-details">
                        <div className="form-block">
                          
                          {showFlatPrice ? (
                            <div className="row">
                             <div className="form-group col-lg-12 mb-0">
                             <label className="b-label">Flat Price</label>
                             <div className='d-flex'>
                            
                      </div>
                             <Field
                             name="flatPrice"
                             component={renderField}
                             type="number"
                             className="form-control"
                             label=""
                             placeholder="eg. 50"
                             />
                             </div>
                           </div>
                          
                          ):(
                            <div className="row">
                            <div className="form-group col-lg-12">
                            <label className="b-label">Minimum Subtotal</label>
                            <div className='d-flex custom_checkbox'>

                            <ul className="cs-check-box item-types custom_types">
                              {
                                MINIMUM_SUBTOTAL.map((obj, index) => (
                                  <li key={obj.value}>
                                    <div className="os-check-box">
                                      <Field 
                                        type="radio" 
                                        value={obj.value.toString()}
                                        name="min_subtotal"
                                        id={""+index} 
                                        label={obj.label} 
                                        component={renderRadio}
                                      />
                                    </div>
                                  </li>
                                ))
                              }
                            </ul>
                            <ul className="cs-check-box customize_box">
                                  <li>
                                    <div className="os-check-box">
                                      <Field
                                        name="min_subtotal_show"
                                        id="show_min_subtotal"
                                        component="input"
                                        type="checkbox"
                                        onChange={this.handleShowSubtotalInput}
                                      />
                                      <label for="show_min_subtotal">Any other
                                      </label>
                                    </div>
                                  </li>
                      </ul>
                      </div>
                    
                      {showSubtotalInput && (

                            <Field
                              name="min_subtotal"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label=""
                              placeholder="eg. 50"
                            />
                      )}
                      <Field
                   label="Name"
                    name="minimum_subtotal_error"
                     component={renderField}
                     parentDivClass="ml-3"
                    type="hidden"
                            />
                            </div>
                          </div>
                         
                          )}
                          
                          <div className="row">
                          
                            <div className="col">
                              <Field
                                label={showFlatPrice ? "Choose Item(s)" : "Choose Free Item"}
                                name={`free_item`}
                                optionLabel="name"
                                optionValue="id"
                                options={restaurentCategoryItemList}
                                component={renderReactSelect}
                                placeholder={showFlatPrice ? "Choose Item" : "Choose Free Item"}
                                multi={true}
                                className="select-ui"
                                parentDivClass="form-group "
                              />
                            </div>
                           { !showFlatPrice && (
                            <div className="col">
                              <Field
                                name={`free_item_quantity`}
                                component={renderField}
                                type="number"
                                className="form-control"
                                label="Choose Free Item Quantity"
                                placeholder="eg. 30"
                              />
                            </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="row save-button-block">
                    <button
                      type="submit"
                      className="btn green-btn"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div> 
    );
  }
}
export default reduxForm({
  form: "AddNewDealType",
  enableReinitialize: true,
})(withRouter(AddDealForm)); 
