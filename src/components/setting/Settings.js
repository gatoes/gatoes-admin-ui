import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import { saveSettings, settingsList } from '../../actions/settings';
import {toast} from 'react-toastify';
import renderReactSelect from '../FormFields/renderReactSelect';
import validate from './ValidateSetting';
import { DISTANCE_UNIT, VEG_VISIBILITY_STATUS, ALLOW_DELIVER_STATUS } from "../../constants";
import {getCurrencySymbol} from '../../utilities';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status
    }
    this.changeKmToMiles = this.changeKmToMiles.bind(this);
    this.changeMilesToKm = this.changeMilesToKm.bind(this);
  }

  changeKmToMiles(e){
    const calmiles = parseFloat(e.target.value/1.6).toFixed(2);
    this.props.change('user_view_distance_mile', calmiles);
  }

  changeMilesToKm(e){
    const calkm = parseFloat(e.target.value*1.6).toFixed(2);
    this.props.change('user_view_distance_km', calkm);
  }

  componentWillMount(){
    settingsList().then((response) => {
      this.props.initialize(response.data.data);
    });
  }

  submitMenuForm(values){
    console.log('form', values);
    let payout = 0;
    if(values.payoutRequestLimitAll == true){
      payout = 1;
    } else {
      payout = 0;
    }


    return saveSettings({...values, payoutRequestLimitAll: payout})
    .then((result) => {
      toast.success('Settings updated successfully.');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    console.log('submitting', submitting);
    let currecySymbol = getCurrencySymbol();
    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Settings</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                
                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Basic Settings</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="user_view_distance_km"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="User view radius for restaurants(KM)"
                            placeholder="in km"
                            onChange={this.changeKmToMiles}
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="user_view_distance_mile"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="User view radius for restaurants(Miles)"
                            placeholder="in miles"
                            onChange={this.changeMilesToKm}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="rider_request_acceptance_time"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Rider request acceptance time(secs)"
                            placeholder="in secs"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="request_rider_time_before_prep"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Request timing for rider before preparation time(mins)"
                            placeholder="in mins"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="trip_minimum_order"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Trip maximum orders"
                            placeholder="ex. 2"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="rider_request_timeout"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Rider order request timeout (mins)"
                            placeholder="in mins"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6 selectbox-block">
                          <Field
                            label="Veg/Nonveg Visibility"
                            name="veg_visibility_status"
                            optionLabel='label'
                            optionValue='value'
                            options={VEG_VISIBILITY_STATUS}
                            component={renderReactSelect}
                            multi={false}
                            parentDivClass="form-group w-100"
                            className="select-ui"
                          />
                        </div>
                        <div className="col-lg-6 selectbox-block">
                          <Field
                            label="Distance unit for riders"
                            name="distance_unit"
                            optionLabel='label'
                            optionValue='value'
                            options={DISTANCE_UNIT}
                            component={renderReactSelect}
                            placeholder="Choose distance unit"
                            multi={false}
                            parentDivClass="form-group w-100"
                            className="select-ui"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="minimum_order"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label={"Minimum Order - " + currecySymbol }
                            placeholder="ex.2"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="merchant_reminder"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Merchant reminder for pending order(mins)"
                            placeholder="ex.1"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="maxCashOrderLimit"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label={"Maximum Cash Order Limit - " + currecySymbol }
                            placeholder="ex.80"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="maxCashRiderCarry"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label={"Maximum Cash Limit for Rider - " + currecySymbol }
                            placeholder="ex.100"
                          />
                        </div>
                      </div>


                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="maxTripRiderCarry"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Maximum trip should rider have"
                            placeholder="ex.100"
                          />
                        </div>

                        <div className="col-lg-6">
                          <Field
                            name="coupon_gap_hours"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Coupon gap hours"
                            placeholder="ex.1"
                          />
                        </div>
                        
                        
                      </div>

                      


                    </div>
                  </div>
                </div>


                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Payout Settings</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="fastTrackPayout"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Merchant Fast-track Payout Charges"
                            placeholder="ex.30"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="normalPayout"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Merchant Normal Payout Charges"
                            placeholder="ex.0"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="payoutRequestLimit"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Payout Request Limitaion"
                            placeholder="ex.2"
                          />
                        </div>
                        <div className="form-group ri-block">
                          <label></label>
                          <ul className="cs-check-box">
                            <li>
                              <div className="os-check-box">
                                <Field
                                  name="payoutRequestLimitAll"
                                  id="payout-item"
                                  component="input"
                                  type="checkbox"
                                />
                                <label for="payout-item">Overwrite all restaurant payout settings</label>
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
                      <h4>Scheduled Order Settings</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="numberOfDays"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Number of days"
                            placeholder="ex. 5"
                            onChange={this.changeKmToMiles}
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="timeBetweenEndAndStart"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Time slot difference (in mins)"
                            placeholder="ex. 30"
                            onChange={this.changeMilesToKm}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="timeAfterNow"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Time after now"
                            placeholder="ex 1"
                            onChange={this.changeKmToMiles}
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="schedule_order_time"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Manage schedule order time alert to merchant (mins)"
                            placeholder="ex.30"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>


                
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

Settings = reduxForm({
  form: 'SettingsValue',
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
  validate
})(Settings)

export default Settings;
