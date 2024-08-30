import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import { saveUserAppSettings, userAppSettingsList } from '../../actions/settings';
import {toast} from 'react-toastify';
import renderReactSelect from '../FormFields/renderReactSelect';
import validate from './ValidateAppSetting';
import { VEG_VISIBILITY_STATUS } from "../../constants";

class UserAppSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status
    }
  }

  componentWillMount(){
    userAppSettingsList().then((response) => {
      this.props.initialize(response.data.data);
    });
  }

  submitMenuForm(values){
    console.log('form', values);
    return saveUserAppSettings(values)
    .then((result) => {
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
            <h4 className="heading">App Settings</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                
                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>User App Settings</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6 selectbox-block">
                          <Field
                            label="Show avg. cost per person"
                            name="show_avg_cost"
                            optionLabel='label'
                            optionValue='value'
                            options={VEG_VISIBILITY_STATUS}
                            component={renderReactSelect}
                            multi={false}
                            parentDivClass="form-group w-100"
                            className="select-ui"
                            placeholder="Choose Option"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row save-button-block">
                  <div className="col-sm-12 align-self-center">
                    <button type="submit" disabled={submitting} className="btn green-btn">Save{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    
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

UserAppSettings = reduxForm({
  form: 'SettingsValue',
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
  validate
})(UserAppSettings)

export default UserAppSettings;
