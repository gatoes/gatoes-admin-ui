import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {IS_TYPE_COUPON, ACTIVE_INACTIVE_STATUS, COUPON_CODE_FORMAT, OPENING_CLOSING_TIME, OPENING_TIME} from '../../constants';
import renderRadio from '../FormFields/renderRadio';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItemImage from '../menu/MenuItemImage';
import CSVReader from 'react-csv-reader';

class PromoCodeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCouponBox : false,
      status: props.status,
      startDate: '',
      showDateRagne: 0,
      showCouponForm: false,
      showCouponImage: false,
      showMultipleCoupon: false,
      csv_records:[]
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
  }

  handleForce(data){
    this.setState({
      csv_records: data.flat()
    });
    this.props.change('csv_records', this.state.csv_records);
  }

  couponChecked(e){
    const chkval = e.value;
    if(chkval == 1){
      this.setState({
        showCouponBox : true,
        showCouponImage : false,
        showMultipleCoupon: true
      });
    } else if(chkval == 2 || chkval == 3 || chkval == 4){
      this.setState({
        showCouponImage : true,
        showCouponBox : true,
        showMultipleCoupon: false
      });
    } else {
      this.setState({
        showCouponBox : false,
        showCouponImage : false
      });
    }

    this.props.isActionUpdate(chkval);

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

  render() {
    const {showCouponBox, showDateRagne, showCouponForm, showCouponImage, showMultipleCoupon} = this.state;
    const disabled = this.state.showCouponForm && this.state.showCouponForm === true ? 'readOnly' : null;

    console.log(disabled, 'showCouponForm', showCouponForm);
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
                  name="rule_name"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Rule Name"
                  placeholder=""
                />
              </div>
              <div className="col-lg-6">
                <Field
                  name="rule_description"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Rule Description"
                  placeholder=""
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 selectbox-block">
                <Field
                  label="Coupon Type"
                  name="coupon"
                  optionLabel='label'
                  optionValue='value'
                  options={IS_TYPE_COUPON}
                  component={renderReactSelect}
                  placeholder="Choose type"
                  multi={false}
                  className="select-ui"
                  parentDivClass="form-group w-100"
                  parentCallback={ this.couponChecked }
                />
              </div>
              
              <div className="col-lg-6 radio-ui-block radio-ui-margin">
                <Field 
                  type="radio" 
                  value="0"
                  name="isMerchantPromo"
                  id="s-promo" 
                  label="Admin Promo" 
                  component={renderRadio}
                />
                <Field 
                  type="radio" 
                  value="1"
                  name="isMerchantPromo"
                  id="d-promo" 
                  label="Merchant Promo" 
                  component={renderRadio}
                />
              </div>
            </div>
              {
                showCouponBox && showCouponBox == 1
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
                      placeholder="eg. SWITZ11"
                      readOnly = {disabled}
                    />
                  </div>
                  {
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
                  }

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
            

            <div className="row">
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
            </div>


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
              <div className="col-lg-6">
                <Field
                  name="priority"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Priority"
                  placeholder="eg. 1"
                />
              </div>
              <div className="form-group ri-block col-lg-6">
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
              </div>
            </div>
            <div className="row">
              <div className='d-flex image_uploading'>
                <div className='promoImage_wrap'>
              <MenuItemImage getItemImage={this.getItemImage} />
              <Field
                name="promocodeImage"
                component={renderField}
                type="hidden"
              />
              </div>
              <MenuItemImage getItemImage={this.getAnotherItemImage} />
              <input type="hidden" name="promo_banner_image" />
              </div>
            </div>
            {
              showCouponImage && showCouponImage == true
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

export default reduxForm({
  form: 'AddPromoCodeValue'
})(PromoCodeInfo);
