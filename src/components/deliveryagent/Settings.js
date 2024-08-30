import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import {toast} from 'react-toastify';
import renderReactSelect from '../FormFields/renderReactSelect';
import validate from './ValidateSetting';
import { settingsList } from '../../actions/settings';
import { saveRiderSettings, riderSettingsList } from '../../actions/deliveryagent';
import RenderDriverFareSetting from './RenderDriverFareSetting';
import {getCurrencySymbol, getCurrencyCode} from '../../utilities';
import { OPENING_CLOSING_TIME, OPENING_TIME} from '../../constants';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status
    }
  }

  componentWillMount(){
    riderSettingsList().then((response) => {
      this.props.initialize(response.data.data);
    });
  }

  submitMenuForm(values){
    //console.log('form', values);
    return saveRiderSettings(values).then((result) => {
      toast.success('Settings updated successfully.');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props;

    

    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Rider Settings</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                
                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Shifts Timing & Overtime Settings</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-4">
                           <Field
                            label="First Shift Start Time"
                            name="firstShiftStartTime"
                            optionLabel='label'
                            optionValue='value'
                            options={OPENING_TIME}
                            component={renderReactSelect}
                            placeholder="Start Time"
                            multi={false}
                          />    
                        </div>
                        <div className="col-lg-4">
                           <Field
                            label="First Shift End Time"
                            name="firstShiftEndTime"
                            optionLabel='label'
                            optionValue='value'
                            options={OPENING_CLOSING_TIME}
                            component={renderReactSelect}
                            placeholder="End Time"
                            multi={false}
                          />    
                        </div>
                        <div className="col-lg-4">
                          <Field
                            name="firstShiftSalary"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="First Shift Salary"
                            placeholder="eg. 10"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                           <Field
                            label="Second Shift Start Time"
                            name="secondShiftStartTime"
                            optionLabel='label'
                            optionValue='value'
                            options={OPENING_TIME}
                            component={renderReactSelect}
                            placeholder="Start Time"
                            multi={false}
                          />    
                        </div>
                        <div className="col-lg-4">
                           <Field
                            label="Second Shift End Time"
                            name="secondShiftEndTime"
                            optionLabel='label'
                            optionValue='value'
                            options={OPENING_CLOSING_TIME}
                            component={renderReactSelect}
                            placeholder="End Time"
                            multi={false}
                          />    
                        </div>
                        <div className="col-lg-4">
                          <Field
                            name="secondShiftSalary"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Second Shift Salary"
                            placeholder="eg. 10"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="fixedOvertime"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Fixed Overtime (2 hrs)"
                            placeholder="eg. 10"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                              name="overtimePerHour"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Overtime Per Hour"
                              placeholder="eg. 50"
                            />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Incentive & Incentive Settings</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="fixedMinimumOrders"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Fixed Minimum Orders"
                            placeholder="eg. 30"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                              name="requiredAcceptanceRate"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Required Acceptance Rate (%)"
                              placeholder="eg. 50"
                            />
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="fixedIncentivePerOrder"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Fixed Incentive Per Order"
                            placeholder="eg. 30"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                              name="incentiveDeduction"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Incentive Deduction if condition not matched"
                              placeholder="eg. 50"
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
  validate
})(Settings)

export default Settings;
