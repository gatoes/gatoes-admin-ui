import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { reduxForm, submit, SubmissionError } from 'redux-form';
import {toast} from 'react-toastify';
import { saveDeliveryRule } from '../../actions/settings';

class AddDeliverySettingFooter extends Component {
  constructor(props){
    super(props);
  }

  submitDeliveryRuleForm(values){
    console.log('form', values);
    return saveDeliveryRule(values)
    .then((result) => {
      toast.success('Delivery rule set Successfully.');
      this.props.reloadMenuListing();
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

	render() {
  	return (
    	<> 
        <button type="button" className="btn btn1" data-dismiss="modal">CANCEL</button> 
        <button type="button" className="btn btn2" onClick={this.props.handleSubmit(this.submitDeliveryRuleForm.bind(this))}>
          <i className="material-icons"> check_circle</i>SAVE CATEGORY
        </button> 
      </>
  	);
	}
}

export default reduxForm({
  form: 'AddDeliverySettingForm'
})(AddDeliverySettingFooter);