import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {toast} from 'react-toastify';
import validate from './ValidatePlan';
import { addPlan } from '../../actions/plans';
import AddPlanDeliveryCharges from './AddPlanDeliveryCharges';
// import AddPlanTaxes from './AddPlanTaxes';
import { shopListingByZone } from '../../actions/shops';
import { regionListing } from '../../actions/regions';
import {MERCHANT_SUPPORT, PACKAGING_CHARGES_PAID_BY} from '../../constants';

class AddPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopList: [],
      regionListing: []
    }
    this.merchantZone = this.merchantZone.bind(this);
  }

  merchantZone (ids) {
    console.log(ids.length, '53543543', ids);
    if(ids.length){
      let zoneIds = Array.isArray(ids)
      ? ids.map(item => (typeof item === 'object' && item !== null ? item.id : item))
      : [];
  
      let newZoneIds = JSON.stringify(typeof zoneIds != 'undefined' ? zoneIds : [])
      // let zoneIds = ids.map((it)=> it.id)
      console.log("zoneIds",newZoneIds)
      shopListingByZone({zoneId : newZoneIds}).then((response) => {
        this.setState({
          shopList: response.data.data ? response.data.data : []
        });
      }).catch(error => {
        console.log('error', JSON.stringify(error));
        //throw new SubmissionError(error.response.data.error);
      })
    } else {
      this.setState({
        shopList: []
      });
    }
  }


  componentDidMount(){
    regionListing({status: 1}).then((response) => {
      this.setState({
        regionListing: response.data.data && response.data.data.region ? response.data.data.region : []
      });
    })
  }

  submitMenuForm(values){
    if(!values.in_app_promotion){
      values = {...values, 'in_app_promotion': false}
    }
    if(!values.listing){
      values = {...values, 'listing': false}
    }
    if(!values.order_scheduling){
      values = {...values, 'order_scheduling': false}
    }
    if(!values.area_wise_analytics){
      values = {...values, 'area_wise_analytics': false}
    }

    if(!values.free_delivery){
      values = {...values, 'free_delivery': false}
    }

    if(values.merchant_surge == ''){
      values = {...values, 'merchant_surge': 0}
    }
    
    console.log('7777777', values);
    return addPlan(values).then((result) => {
      toast.success('Plan added Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/manageplan');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }


  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    const {shopList, regionListing} = this.state;

    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Add Plan</h4>
          </div>

          <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="add-left-block">
                  

                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Details</h4>
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
                              placeholder="e.g. plan title"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="code"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Code"
                              placeholder="e.g. plan code"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="restaurant_visibility_range"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Restaurant Visibility Range (in KM)"
                              placeholder="e.g. 10"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="platform_on_boarding_fee"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Platform onboarding fee (Rs)"
                              placeholder="e.g. 5"
                              maxLength="6"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="minimum_order"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Minimum Order amount (Rs)"
                              placeholder="e.g. 5"
                              maxLength="6"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="menu_updation_charges"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Menu updation charges (Rs)"
                              placeholder="e.g. 5"
                              maxLength="6"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="monthly_payout_request_limit"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Monthly Payout Request limit"
                              placeholder="e.g. 10"
                              maxLength="6"
                            />
                          </div>
                          
                        </div>
                        <div className="row">
                          <div className="form-group ri-block col-lg-6">
                            <ul className="cs-check-box">
                              <li>
                                <div className="os-check-box">
                                  <Field
                                    name="listing"
                                    id="listing"
                                    component="input"
                                    type="checkbox"
                                  />
                                  <label for="listing">Show in listing?</label>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <div className="form-group ri-block col-lg-6">
                            <ul className="cs-check-box">
                              <li>
                                <div className="os-check-box">
                                  <Field
                                    name="in_app_promotion"
                                    id="in_app_promotion"
                                    component="input"
                                    type="checkbox"
                                  />
                                  <label for="in_app_promotion">In app promotion?</label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-group ri-block col-lg-6">
                            <ul className="cs-check-box">
                              <li>
                                <div className="os-check-box">
                                  <Field
                                    name="area_wise_analytics"
                                    id="area_wise_analytics"
                                    component="input"
                                    type="checkbox"
                                  />
                                  <label for="area_wise_analytics">Area analytics?</label>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="form-group ri-block col-lg-6">
                            <ul className="cs-check-box">
                              <li>
                                <div className="os-check-box">
                                  <Field
                                    name="order_scheduling"
                                    id="order_scheduling"
                                    component="input"
                                    type="checkbox"
                                  />
                                  <label for="order_scheduling">Order scheduling?</label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Merchant</h4>
                      </div>
                      <div className="form-block">
                          
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="merchant_delivery_charges"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Delivery Charges (Rs)(Per Km)"
                              placeholder="e.g. 10"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="merchant_multiplier_beyond_normal_delivery_radius"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Multiplier Beyond Normal Delivery Radius (Actual Radius- Normal Range)"
                              placeholder="e.g. plan code"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="merchant_base_price"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Base Price (Rs) (Max)(Cap)"
                              placeholder="e.g. 10"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="merchant_base_percentage"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Base Percentage (%) (Subtotal*Below Percentage)"
                              placeholder="e.g. 10"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6" title="Cap for Long Distance(In case of Long distance(Cap+(Actual Distance-Normal Range)*PerKm*Multiplier))">
                            <Field
                              name="merchant_cap_percentage"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Cap (%) (Subtotal * Below Percentage)"
                              placeholder="e.g. 10"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="merchant_surge"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Surge"
                              placeholder="e.g. 10"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="merchant_normal_delivery_radius"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Normal Delivery Radius (in KM)"
                              placeholder="e.g. 10"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="commission"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Platform Commision (%)"
                              placeholder="e.g. 5"
                              maxLength="6"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              label="Support type : Normal, Priority, Dedicated"
                              name='merchant_support'
                              options={MERCHANT_SUPPORT}
                              component={renderReactSelect}
                              placeholder="Select option"
                              multi={false}
                              className="select-ui"
                              parentDivClass="form-group w-100"
                            />  
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="merchant_max_cap_percentage"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Merchant max cap (%)"
                              placeholder="e.g. 5"
                              maxLength="2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>User</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="order_base_price"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Order Base Price (Rs)"
                              placeholder="e.g. 10"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="user_platform_base"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="User base"
                              placeholder="e.g. 10"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="user_platform_base_divisor"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Platform fee divisor"
                              placeholder="e.g. 10"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="user_delivery_charges"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Delivery Charges (Rs)(Per Km)"
                              placeholder="e.g. 10"
                            />
                          </div>
                          
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="user_delivery_charges_beyond_normal_delivery_radius"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Delivery Charges (Beyond Normal Delivery Radius (Actual Radius- Normal Range)Per Km"
                              placeholder="e.g. 10"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="base_order_price_for_normal_delivery_radius"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Base order Price for normal Delivery Radius (Rs)"
                              placeholder="e.g. 10"
                            />
                          </div>
                          
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="user_normal_delivery_radius"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Normal Delivery Radius (in KM)"
                              placeholder="e.g. 10"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="user_surge"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Weather Surge"
                              placeholder="e.g. 10"
                            />
                          </div>
                          
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="user_low_order_fee"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Low Order Fee(If Order Value is Less than the Base Order value)"
                              placeholder="e.g. 10"
                            />
                          </div>
                          <div className="col-lg-6" title="User Base (if Subtotal is Less Than Order Base Price = User Base), (If SubTotal is greater than Order Base Price = (User Base-(User Base*Subtotal/Divisor), If Value Comes Less Then (0) Then It should be (0)">
                            <Field
                              name="user_platform_fee"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="User platform Fee"
                              placeholder="e.g. 10"
                            />
                          </div>
                          
                        </div>

                        <div className="row">
                          <div className="form-group ri-block col-lg-6">
                            <ul className="cs-check-box">
                              <li>
                                <div className="os-check-box">
                                  <Field
                                    name="free_delivery"
                                    id="free_delivery"
                                    component="input"
                                    type="checkbox"
                                  />
                                  <label for="free_delivery">Free Delivery?</label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>

                  {/*
                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Taxes</h4>
                      </div>
                      <div className="form-block">
                        <FieldArray name="taxes" component={AddPlanTaxes} formProps = {this.props.formProps} />
                      </div>
                    </div>
                  </div>
                  */}
                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Weekly Charges</h4>
                      </div>
                      <div className="form-block">
                        <FieldArray name="weekly_plan_charges" component={AddPlanDeliveryCharges} formProps = {this.props.formProps} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Zone</h4>
                      </div>
                      
                      <div className="form-block">
                        <div className="row">
                          <Field
                            label="Zone"
                            name='zone_ids'
                            optionLabel='name'
                            optionValue='id'
                            options={regionListing}
                            component={renderReactSelect}
                            placeholder="Select Zone"
                            multi={true}
                            className="select-ui"
                            parentDivClass="form-group w-100"
                            parentCallback={ this.merchantZone }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Merchant</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <Field
                            label="Merchants (For private plans)"
                            name='merchant_ids'
                            optionLabel='shop_name'
                            optionValue='id'
                            options={shopList}
                            component={renderReactSelect}
                            placeholder="Select Merchants"
                            multi={true}
                            className="select-ui"
                            parentDivClass="form-group w-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row save-button-block">
                    <div className="col-sm-12 align-self-center">
                      <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    </div>
                  </div>
                    
                </div>
              </div>
            </div>

            
          </form>
        </div>
      </div>
    );
  }
}

AddPlan = reduxForm({
  form: 'AddPlanValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AddPlan)

export default AddPlan;