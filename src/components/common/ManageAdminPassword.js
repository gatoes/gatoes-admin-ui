import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import { changeAdminPassword } from '../../actions/settings';
import {toast} from 'react-toastify';
import validate from './ValidatePassword';

class ManageAdminPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false
    }
  }

  componentWillMount(){
    this.props.initialize();
  }

  submitMenuForm(values){
    console.log('form', values);
    return changeAdminPassword(values)
    .then((result) => {
      toast.success('Password updated successfully.');
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
            <h4 className="heading">Update Admin Password</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">

                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Password Info</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-12">
                          <Field
                            name="password"
                            component={renderField}
                            type="password"
                            className="form-control"
                            label="Password"
                          />
                        </div>
                        <div className="col-lg-12">
                          <Field
                            name="confirm_password"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Confirm Password"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                
                <div className="row save-button-block">
                  <div className="col-sm-12 align-self-center">
                    <button type="submit" disabled={submitting} className="btn green-btn">Update{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    
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

ManageAdminPassword = reduxForm({
  form: 'ManageAdminPasswordValue',
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
  validate
})(ManageAdminPassword)

export default ManageAdminPassword;
