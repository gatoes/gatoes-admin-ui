import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import { BEAR_TYPE, COUPON_CODE_FORMAT, OPENING_CLOSING_TIME, OPENING_TIME, USER_TYPE} from '../../constants';
import renderRadio from '../FormFields/renderRadio';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItemImage from '../menu/MenuItemImage';
import CSVReader from 'react-csv-reader';
import renderCustomCreatableSelect from '../FormFields/renderCustomCreatableSelect';
import { withRouter } from 'react-router-dom';
import renderCreatableSelect from '../common/renderCreatableSelect';
import { connect } from 'react-redux';

class PromoNewCodeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCouponBox : false,
      status: props.status,
      startDate: '',
      showDateRagne: 0,
      showCouponForm: false,
      showCouponImage: false,
      showCsvUpload: false,
      showMultipleCoupon: false,
      bearCostBy:0,
      csv_records:[],
      showUserType: true,
      showPhoneNumber:false,
      hideItemAndCategory:false,
      isBroadcast:props.isBroadcast,
      showBannerImage:false,
      // itemImageUrl:props.itemImageUrl,
      // promoBannerImageUrl:props.promoBannerImageUrl
    }
    this.couponChecked = this.couponChecked.bind(this);
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    this.handleCoupon = this.handleCoupon.bind(this);
    this.getItemImage = this.getItemImage.bind(this);
    this.getAnotherItemImage = this.getAnotherItemImage.bind(this);
    this.handleForce = this.handleForce.bind(this);
    this.handleBearCost = this.handleBearCost.bind(this);
    this.userTypeChecked = this.userTypeChecked.bind(this);
    this.handleBroadcast = this.handleBroadcast.bind(this);

  }

  handleForce(data){
    this.setState({
      csv_records: data.flat(),
    });
    this.props.change('csv_records', this.state.csv_records);
  }

  couponChecked(e){
    const chkval = e.value;
    console.log(chkval, "showBannerImages");
    if(chkval == 1){
      this.setState({
        showCouponBox : false,
        showCouponImage : false,
        showMultipleCoupon: true,
        showUserType:true,
        showPhoneNumber:false,
        showBannerImage:false

      });
    } else if(chkval == 2 ){      //specifi coupon
      this.setState({
        showCouponImage : true,
        showCouponBox : true,
        showMultipleCoupon: false,
        showCsvUpload:false,
        showUserType: false,
        showPhoneNumber: true,
        showBannerImage:false


      });
    }else if( chkval == 3){
     this.setState({
      showCouponImage : true,
        showCouponBox : true,
        showMultipleCoupon: false,
        showCsvUpload:true,
        showUserType:true,
        showPhoneNumber: false,
        showBannerImage:false


     })
    }else if(chkval == 4){
      this.setState({
        showCouponImage : true,
          showCouponBox : true,
          showMultipleCoupon: false,
          showCsvUpload:true,
          showUserType:true,
          showPhoneNumber: false,
          showBannerImage:true
  
  
       })
    }

    else if(chkval == 5){
      this.setState({
        showCouponImage : true,
          showCouponBox : true,
          showMultipleCoupon: false,
          showCsvUpload:true,
          showUserType:true,
          showPhoneNumber: false,
          showBannerImage:true
  
  
       })
    }
    
    else {
      this.setState({
        showCouponBox : false,
        showCouponImage : false,
        showUserType:true,
        showBannerImage:false

      });
    }

    this.props.isActionUpdate(chkval);

  }

  userTypeChecked(e){

    console.log(e, "userTypeChecked")
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


  handleAllChecked (e) {
    this.setState({
      showDateRagne : e.target.value
    });
  }

  handleCoupon(e){
    this.setState({
        showCouponForm : e.target.checked
      });
  }

  handleChangeStart(sdate){
    this.setState({
      startDate: sdate
    });
    this.props.updateDateInfo('start_date',sdate);
  }

  handleChangeEnd(edate){
    this.setState({
      endDate: edate
    });
    this.props.updateDateInfo('end_date',edate);
  }

  handleChangeStartTime(stime){
    this.setState({
      startTime: stime
    });
    this.props.updateDateInfo('start_time',stime);
  }

  handleChangeEndTime(etime){
    this.setState({
      endTime: etime
    });
    this.props.updateDateInfo('end_time',etime);
  }

  getItemImage(imageId){
    this.props.change('image', imageId);
    // this.props.change('promocodeImage', imageId)
  }

  getAnotherItemImage(imageId){
    this.props.change('promo_banner_image', imageId);
  }


 handleBearCost(e){
  console.log(e.target.value,"NearBearCost")
  this.setState({
    bearCostBy: e.target.value
  })

 }

// static getDerivedStateFromProps(nextProps, prevState) {
//   console.log(nextProps.existingCouponType,"nextProps1112")
//   if (nextProps.existingCouponType && nextProps.existingCouponType !== prevState.existingCouponType) {
//     return {
//       showUserType: nextProps.existingCouponType.coupon !== 2,
//       existingCouponType: nextProps.existingCouponType,
//     };
//   }
//   if (nextProps.isBroadcast && nextProps.isBroadcast !== prevState.isBroadcast) {
//    return { isBroadcast: nextProps.isBroadcast };
//   }
//   return null;
// }

componentWillReceiveProps(nextProps) {
  console.log(nextProps,"nextProps1112")
 
  if (nextProps.isBroadcast !== this.props.isBroadcast) {
    this.setState({ isBroadcast: nextProps.isBroadcast });
  }
}
handleBroadcast(e) {
  console.log(e, "Received broadcast");
  const isChecked = e.target.checked;
  if (isChecked) {
    this.setState({
      hideItemAndCategory: true,
      bearCostBy: 2
    });
    this.props.change('isMerchantPromo', '2');

  } else {
    this.setState({
      hideItemAndCategory: false,
      bearCostBy: 0
    });
    this.props.change('isMerchantPromo', '0');

  }
}



  render() {
    const {couponType,itemImageUrl,promoBannerImageUrl} = this.props;
    const {showCouponBox, showDateRagne, showCouponForm, showCouponImage,showUserType, showCsvUpload,bearCostBy,showPhoneNumber,isBroadcast,showBannerImage} = this.state;
    const disabled = this.state.showCouponForm && this.state.showCouponForm === true ? 'readOnly' : null;

    // console.log(disabled, 'showCouponForm', showCouponForm);
    // console.log(itemImageUrl,promoBannerImageUrl,"PromoImage")
    console.log(bearCostBy,couponType,showUserType,isBroadcast,"bearCostBy")
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
                  name="title"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Rule Name"
                  placeholder=""
                />
              </div>
              <div className="col-lg-6">
                <Field
                  name="description"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Rule Description"
                  placeholder=""
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 selectbox-block">
                <Field
                  label="Coupon Type"
                  name="coupon"
                  optionLabel='label'
                  optionValue='value'
                  options={couponType.map((item) => ({
                    label: item.title,
                    value: item.id
                  }))}
                  component={renderReactSelect}
                  placeholder="Choose type"
                  multi={false}
                  className="select-ui"
                  parentDivClass="form-group w-100"
                  parentCallback={ this.couponChecked }
                />
              </div>
              <div className="form-group ri-block col-lg-6">
              <ul className="cs-check-box">
                <li>
                  <div className="os-check-box">
                   <Field
                    name="isBroadcast"
                    id="isBroadcast"
                    component="input"
                    type="checkbox"
                  //  onChange={ this.handleBroadcast }
                   onChange = {this.props.updateBroadcast}


                     />
                    <label for="isBroadcast">Broadcast coupon</label>
                    </div>
                </li>
              </ul>
            </div>
              
              <div className="col-lg-8 radio-ui-block radio-ui-margin">
                <Field 
                  type="radio" 
                  value="0"
                  name="isMerchantPromo"
                  id="s-promo" 
                  label="Admin Promo" 
                  disabled={isBroadcast == 2 ? true : false}
                  component={renderRadio}
                  onChange={ this.handleBearCost }
                />
                <Field 
                  type="radio" 
                  value="1"
                  name="isMerchantPromo"
                  id="d-promo" 
                  disabled={isBroadcast == 2 ? true : false}
                  label="Merchant Promo" 
                  component={renderRadio}
                  onChange={ this.handleBearCost }
                />
                    <Field 
                  type="radio" 
                  value="2"
                  name="isMerchantPromo"
                  id="b-promo" 
                  label="Both" 
                  component={renderRadio}
                  onChange={ this.handleBearCost }
                />
              </div>
            </div>
            { showUserType && (
              <div className='row'>
                  <div className="col-lg-12 selectbox-block">
                    <Field
                      label="User type"
                      name="userType"
                      optionLabel='label'
                      optionValue='value'
                      options={USER_TYPE}
                      component={renderReactSelect}
                      placeholder="Choose user type"
                      multi={false}
                      className="select-ui"
                      parentDivClass="form-group w-100"
                    parentCallback={this.userTypeChecked}

                    />
                   </div>
              </div>
           )}
         
             {/* ):( */}
             {showPhoneNumber && (
              <div className="row">
                  <div className="col-lg-12">
                    <Field
                      name="phoneNumber"
                      component={renderCreatableSelect}
                      type="text"
                      className=""
                      label="Add Phone Number(s)"
                      placeholder="e.g. 9817465720"
                    />
                  </div>
                </div>
                )}
          {/* )
 } */}
            {/* {bearCostBy == 0 && (
              <>
              <div className='row'>
                  <div className="col-lg-12 selectbox-block">
                <Field
                  label="Bear type"
                  name="bearOn"
                  optionLabel='label'
                  optionValue='value'
                  options={BEAR_TYPE}
                  component={renderReactSelect}
                  placeholder="Choose bear type"
                  multi={false}
                  className="select-ui"
                  parentDivClass="form-group w-100"
                />
              </div>
              </div>
            <div className="row">
                  <div className="col-lg-12">
                    <Field
                      name="adminBearCost"
                      component={renderField}
                      type="number"
                      className="form-control"
                      // fieldClass="manage-text-case"
                      label="Admin Bear Cost Percentage"
                      placeholder="eg. 30"
                     

                    />
                  </div>
                 
              </div>    
              </>
                )} */}
                 {/* {bearCostBy == 1 && (
                  <>
                   <div className='row'>
                   <div className="col-lg-12 selectbox-block">
                 <Field
                   label="Bear type"
                   name="bearOn"
                   optionLabel='label'
                   optionValue='value'
                   options={BEAR_TYPE}
                   component={renderReactSelect}
                   placeholder="Choose bear type"
                   multi={false}
                   className="select-ui"
                   parentDivClass="form-group w-100"
                 />
               </div>
               </div>
               <div className="row">
                 <div className="col-lg-12">
                    <Field
                      name="merchantBearCost"
                      component={renderField}
                      type="number"
                      className="form-control"
                      // fieldClass="manage-text-case"
                      label="Merchant Bear Cost Percentage"
                      placeholder="eg. 10"
                    />
                  </div>
                  </div>
                  </>
                 )} */}
                 {this.props.bearCostBy == 2 && (
                  <>
                   {/* <div className='row'>
                   <div className="col-lg-12 selectbox-block">
                 <Field
                   label="Bear type"
                   name="bearOn"
                   optionLabel='label'
                   optionValue='value'
                   options={BEAR_TYPE}
                   component={renderReactSelect}
                   placeholder="Choose bear type"
                   multi={false}
                   className="select-ui"
                   parentDivClass="form-group w-100"
                 />
               </div>
               </div> */}
               <div className="row">
                  <div className="col-lg-12">
                    <Field
                      name="adminBearCost"
                      component={renderField}
                      type="number"
                      className="form-control"
                      // fieldClass="manage-text-case"
                      label="Admin Bear Cost Percentage"
                      placeholder="e.g. 30"
                     

                    />
                    
                  </div>
                
                  {/* <div className="col-lg-6">
                    <Field
                      name="merchantBearCost"
                      component={renderField}
                      type="number"
                      className="form-control"
                      // fieldClass="manage-text-case"
                      label="Merchant Bear Cost Percentage"
                      placeholder="eg. 10"
                    />
                  </div> */}
                 
              </div>    
              
                  </>
                 )}
                 
              {
                showCouponBox 
                ?
                <>
                <div className="row">
                  <div className="col-lg-6">
                    <Field
                      name="coupon_code"
                      component={renderField}
                      type="text"
                      className="form-control"
                      fieldClass="manage-text-case"
                      label="Coupon Code"
                      placeholder="e.g. SWITZ11"
                      readOnly = {disabled}
                    />
                  </div>
                  {/* {
                    showMultipleCoupon && showMultipleCoupon == true
                    ?
                    <div className="form-group ri-block col-lg-6">
                      <ul className="cs-check-box">
                        <li>
                          <div className="os-check-box">
                            <Field
                              name="auto_generate"
                              id="recommended-item"
                              component="input"
                              type="checkbox"
                              onChange={ this.handleCoupon }
                            />
                            <label for="recommended-item">Use Auto Generation (if you select and save the rule you will be able to generate multiple coupon codes)</label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    :
                    null
                  } */}

                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Field
                      name="uses_per_customer"
                      component={renderField}
                      type="number"
                      className="form-control"
                      label="Uses per Customer"
                      placeholder=""
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="uses_per_coupon"
                      component={renderField}
                      type="number"
                      className="form-control"
                      label="Uses per Coupon"
                      placeholder=""
                    />
                  </div>
                </div>
                </>
                :
                null
              }
            

            {/* <div className="row">
              <div className="col-lg-6 selectbox-block">
                <Field
                  label="Status"
                  name="status"
                  optionLabel='label'
                  optionValue='value'
                  options={ACTIVE_INACTIVE_STATUS}
                  placeholder="Choose Status"
                  component={renderReactSelect}
                  multi={false}
                  className="select-ui"
                  parentDivClass="form-group w-100"
                />
              </div>
            </div> */}


            <div className="row radio-ui-block">
              <div className="col-lg-6">
                <Field 
                  type="radio" 
                  value="0"
                  name="days_type"
                  id="s-varient" 
                  label="All Days" 
                  component={renderRadio}
                  onChange={ this.handleAllChecked }
                />
                <Field 
                  type="radio" 
                  value="1"
                  name="days_type"
                  id="d-item" 
                  label="Specific Dates" 
                  component={renderRadio}
                  onChange={ this.handleAllChecked }
                />
              </div>
            </div>
            {
              showDateRagne && showDateRagne == true
              ?
              <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <DatePicker
                    name="start_date"
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                    minDate={new Date()}
                    dateFormat= "yyyy-MM-dd"
                    placeholderText="Choose start date"
                  />
                  </div>
                  </div>

                  <div className="col-lg-6">
                  <div className="form-group">
                  <DatePicker
                    name="end_date"
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    minDate={this.state.startDate}
                    dateFormat= "yyyy-MM-dd"
                    placeholderText="Choose end date"
                  />
                </div>
                </div>
              </div>
              :
              null
            }
            <div className="row">
              <div className="col-lg-6 selectbox-block">
                <Field
                  label="Choose start time"
                  name="start_time"
                  optionLabel='label'
                  optionValue='value'
                  options={OPENING_TIME}
                  component={renderReactSelect}
                  placeholder="Start Time"
                  multi={false}
                  className="select-ui"
                  parentDivClass="form-group w-100"
                />
              </div>
              <div className="col-lg-6 selectbox-block">
                <Field
                  label="Choose end time"
                  name="end_time"
                  optionLabel='label'
                  optionValue='value'
                  options={OPENING_CLOSING_TIME}
                  component={renderReactSelect}
                  placeholder="End Time"
                  multi={false}
                  className="select-ui"
                  parentDivClass="form-group w-100"
                />
              </div>
            </div>

            <div className="row">
              {/* <div className="col-lg-6">
                <Field
                  name="priority"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Priority"
                  placeholder="eg. 1"
                />
              </div> */}
              {/* <div className="form-group ri-block col-lg-6">
                <ul className="cs-check-box">
                  <li>
                    <div className="os-check-box">
                      <Field
                        name="promocode_with_other"
                        id="promocode_other"
                        component="input"
                        type="checkbox"
                      />
                      <label for="promocode_other">Used with other</label>
                    </div>
                  </li>
                </ul>
              </div> */}
            </div>
            {showBannerImage && (
            <div className="row">
              <div className='d-flex image_uploading'>
                <div className='promoImage_wrap'>
              <MenuItemImage getItemImage={this.getItemImage} itemImageUrl={itemImageUrl}/>
              <Field
                name="promocodeImage"
                component={renderField}
                type="hidden"
              />
              </div>
              <MenuItemImage getItemImage={this.getAnotherItemImage} itemImageUrl={promoBannerImageUrl}/>
              <input type="hidden" name="promo_banner_image" />
              </div>
            </div>
            )}
            {
              showCsvUpload && showCsvUpload == true
              ?
              <div className="row">
                <CSVReader
                  cssClass="react-csv-input"
                  label="Upload CSV"
                  onFileLoaded={this.handleForce}
                />
              </div>
              :
              null
            }

          </div>
        </div>
      </div>

      {
        showCouponForm && showCouponForm === true
        ?
        <div className="fields-ui-block">
          <div className="basic-details">
            <div className="heading">
              <h4>Manage Coupon Code</h4>
            </div>
            <div className="form-block">
              <div className="row">
                <div className="col-lg-6">
                  <Field
                    name="coupon_quantity"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Coupon Quantity"
                    placeholder=""
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="coupon_code_length"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Code Length (excluding prefix, suffix & separator)"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 selectbox-block">
                  <Field
                    label="Code Format"
                    name="coupon_code_format"
                    optionLabel='label'
                    optionValue='value'
                    options={COUPON_CODE_FORMAT}
                    placeholder="Choose code format"
                    component={renderReactSelect}
                    multi={false}
                    parentDivClass="form-group w-100"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="coupon_code_prefix"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Code Prefix"
                    placeholder=""
                  />
                </div>
              </div> 

              <div className="row">
                <div className="col-lg-6">
                  <Field
                    name="coupon_code_suffix"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Coupon Code Suffix"
                    placeholder=""
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="coupon_code_dash"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Dash Every X Characters (if empty no separation)"
                    placeholder=""
                  />
                </div>
              </div>


            </div>
          </div>
        </div>
        :
        null
      }
      </>
    );
  }
}
const mapStatesToProps = (state, ownProps) => {
  console.log(state.NewPromoCode.isBroadCast, "StateBroadcast2")
  return {
    
      isBroadcast:state.NewPromoCode.isBroadCast
  };
};
PromoNewCodeInfo = withRouter(PromoNewCodeInfo);
PromoNewCodeInfo = reduxForm({
  form: 'AddNewPromoCodeValue',
})(PromoNewCodeInfo)

export default connect(mapStatesToProps,null)(PromoNewCodeInfo);
