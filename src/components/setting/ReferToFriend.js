import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import { saveReferToFriendSettings, referToFriendDetail } from '../../actions/settings';
import {toast} from 'react-toastify';
import validate from './ValidateReferFriend';
import {getCurrencySymbol} from '../../utilities';

class ReferToFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status
    }
  }

  componentWillMount(){
    referToFriendDetail().then((response) => {
      this.props.initialize(response.data.data);
    });
  }

  submitMenuForm(values){
    console.log('form', values);
    return saveReferToFriendSettings(values)
    .then((result) => {
      toast.success('Settings updated successfully.');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    let currecySymbol = getCurrencySymbol();
    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Refer to Friend</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">

                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Settings</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="referring_user"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Order percentage for Reffering User(%)"
                            placeholder="eg. 5"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="referred_user"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Order percentage for Reffered User on first order(%)"
                            placeholder="eg. 5"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="max_order_discount"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Max Amount"
                            placeholder="eg. 5"
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

ReferToFriend = reduxForm({
  form: 'ReferToFriendValue',
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
  validate
})(ReferToFriend)

export default ReferToFriend;
