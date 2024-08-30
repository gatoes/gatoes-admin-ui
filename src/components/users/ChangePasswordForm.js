import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import {changePassword} from '../../actions/users';
import Error from '../common/Error';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidatePassword';


class ChangePasswordForm extends Component {
  constructor(props){
    super(props);
    this.state= {
      shopId: props.shopId,
      panel: props.panel,
      errors: {}
    }
  }

  chkItemStatus(e){
    this.setState({
        shopStatus: e.target.value
    }); 
  }

  componentWillMount(){
    this.state.panel == "rider"
    ?
    this.props.change('riderId', this.state.shopId)
    :
    this.state.panel == "supermerchant"
    ?
    this.props.change('merchantId', this.state.shopId)
    :
    this.state.panel == "staff"
    ?
    this.props.change('staffId', this.state.shopId)
    :
    this.props.change('shopId', this.state.shopId)
  }

  submitForm(values){
    console.log('va', values);
    return changePassword(values)
    .then((result) => {
      this.props.reset();
      this.props.updateShop(result);
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
    
  }

	render() {
    const {handleSubmit, pristine, submitting} = this.props;
    const { shopId} = this.state;
    return ( 
      <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
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
                type="password"
                className="form-control"
                label="Confirm Password"
              />
            </div>
          </div>
        </div>
        <div className="row save-button-block">
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SAVE{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      
      </form>
  	);
  }
}

ChangePasswordForm = reduxForm({
  form: 'ChangePasswordFormValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(ChangePasswordForm)

export default ChangePasswordForm;