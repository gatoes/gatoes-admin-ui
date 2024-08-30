import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePayoutRequest } from '../../actions/shops';
//import Error from '../common/Error';
import { Redirect } from 'react-router-dom';
import renderReactSelect from '../FormFields/renderReactSelect';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidatePayoutRequest';
import { toast } from 'react-toastify';
import {HANDLE_PAYOUT_REQUEST_STATUS} from "../../constants";

class HandleMerchantPayoutRequest extends Component {
  constructor(props){
    super(props);
    this.state= {
      shopId: props.shopId,
      index: props.index,
      requestId: props.requestId,
      depositDate: '',
      showOther: 0
    }
    this.handleStatus = this.handleStatus.bind(this);
  }

  componentDidMount(){
    this.props.change('requestId', this.props.requestId);
  }

  submitMenuForm(values){

    console.log('wewewe', values);

    return updatePayoutRequest(values)
    .then((result) => {
      toast.success('Request has been updated successfully.', {
        position: toast.POSITION.TOP_RIGHT
      }); 
      this.props.refreshData();
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  handleStatus(e){
    console.log('e.value', e.value);
    if(e.value == 2){
      this.setState({
        showOther : 1
      })
    } else {
      this.setState({
        showOther : 0
      })
    }
  }

	render() {
    const {handleSubmit, pristine, submitting } = this.props;
    let {showOther} = this.state;
    return ( 
       <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
        <div className="modal-body">
          <div className="popup-content-block">
            <div className="row">
              <div className="col-lg-12">
                <Field
                  label="Status"
                  name='status'
                  options={HANDLE_PAYOUT_REQUEST_STATUS}
                  component={renderReactSelect}
                  placeholder="Select Request Status"
                  multi={false}
                  parentDivClass="form-group w-100"
                  parentCallback={ this.handleStatus }
                  className="select-ui"
                />
              </div>
            </div>
            {
              showOther
              ?
              <div className="row">
                 <div className="col-lg-6">
                  <Field
                    name="amount"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Amount"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="transactionId"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Transaction ID"
                  />
                </div>
              </div>
              :
              null
            }

          </div>
        </div>
        <div className="row save-button-block">
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn">Save{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      </form>
  	);
  }
}

HandleMerchantPayoutRequest = reduxForm({
  form: 'HandleMerchantPayoutRequestValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(HandleMerchantPayoutRequest)

export default HandleMerchantPayoutRequest;