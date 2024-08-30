import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import {toast} from 'react-toastify';
import validate from './ValidateAppVersion';
import { getAppVersion, saveAppVersionDetail } from '../../actions/settings';
import ManageAppApk from './ManageAppApk';

class Settings extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    this.state = {
      is_submitting: false,
      status: props.status
    }
  }

  componentWillMount(){
    getAppVersion().then((response) => {
      this.props.initialize(response.data.data);
    });
  }

  submitMenuForm(values){
    console.log('form', values);
    return saveAppVersionDetail(values).then((result) => {
      toast.success('App info updated successfully.');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    const {distanceunit} = this.state;

    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">App Version</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">

                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>User App</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="android_user_version"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="User Version - Android"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="ios_user_version"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="User Version - IOS"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                

                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Merchant App</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="android_merchant_version"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Merchant Version - Android"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="ios_merchant_version"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Merchant Version - IOS"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <ManageAppApk  />
                      </div>

                    </div>
                  </div>
                </div>

                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Rider App</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="android_rider_version"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Rider Version - Android"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="ios_rider_version"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Rider Version - IOS"
                            placeholder=""
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
