import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateWalletMoney } from '../../actions/users';
//import Error from '../common/Error';
import { Redirect } from 'react-router-dom';
import renderReactSelect from '../FormFields/renderReactSelect';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidateWallet';
import {WALLET_ACTION} from '../../constants';

class AddMoneyUserWallet extends Component {
  constructor(props){
    super(props);
    this.state= {
      userId: props.userId,
      current_amount: props.current_amount,
      index: props.index
    }
  }

  componentDidMount(){
    this.props.change('customerId', this.state.userId);
    this.props.change('current_amount', this.state.current_amount);
  }

  submitMenuForm(values){
    const {userId, index} = this.state;
    return updateWalletMoney(values)
    .then((result) => {
      this.props.updateUserData(userId, result.data.data.wallet_total);
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

	render() {
    const {handleSubmit, pristine, submitting } = this.props;
    return ( 
       <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
        <div className="modal-body">
          <div className="popup-content-block">
            <div className="row">
              <div className="col-lg-12">
                <Field
                  name="reason"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Reason"
                  placeholder="Refund for order 1001"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 selectbox-block">
                <Field
                  label="Type"
                  name='is_debit'
                  options={WALLET_ACTION}
                  component={renderReactSelect}
                  placeholder="Select Type"
                  multi={false}
                  className="select-ui"
                  parentDivClass="form-group w-100"
                />
              </div>
              <div className="col-lg-6">
                <Field
                  name="amount"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Amount"
                  placeholder="5"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row save-button-block">
          <Field
            name="current_amount"
            component={renderField}
            type="hidden"
          />
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn">Send{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      </form>
  	);
  }
}

AddMoneyUserWallet = reduxForm({
  form: 'AddMoneyUserWalletValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AddMoneyUserWallet)

export default AddMoneyUserWallet;