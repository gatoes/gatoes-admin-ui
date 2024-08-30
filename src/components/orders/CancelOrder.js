import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {toast} from 'react-toastify';
import {cancelOrderByAdmin} from '../../actions/orders';
import validate from './ValidateCancelOrder';
import {WHO_BEAR_COST_CANCEL_ORDER} from '../../constants';

class CancelOrder extends Component {
  constructor(props){
    super(props);
    this.state = {
      shopId: props.shopId,
      orderId: props.orderId
    };
  }

  componentWillMount(){
    this.props.change('orderId', this.state.orderId);
  }

  submitReassignForm(values){
    //console.log('values', values);
    return cancelOrderByAdmin(values)
    .then((result) => {
      toast.success('Order has been cancelled Successfully.');
      this.props.reset();
      this.props.updateCancelSlide(values);
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
    
  }

  render() {
    const { orderId} = this.state;
    const {handleSubmit, pristine, submitting} = this.props;
    return (

      <form onSubmit={handleSubmit(this.submitReassignForm.bind(this))}>
        <div className="fields-ui-block">
          <div className="basic-details">
            
            <div className="form-block">
              <div className="row">
                <div className="col-lg-12">
                  <Field
                    name="cancelReason"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Cancel Reason"
                    placeholder="Mention reason to cancel"
                  />
                </div>
                <div className="col-lg-6">
                  <div className="form-group ri-block">
                    <label></label>
                    <ul className="cs-check-box">
                      <li>
                        <div className="os-check-box">
                          <Field
                            name="isRefund"
                            id="refund-money"
                            component="input"
                            type="checkbox"
                          />
                          <label for="refund-money">Do you want to refund?</label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-6 selectbox-block">
                  <Field
                    label="Who Bear the Cost"
                    name='who_bear_cost'
                    options={WHO_BEAR_COST_CANCEL_ORDER}
                    component={renderReactSelect}
                    placeholder="Select"
                    multi={false}
                    parentDivClass="form-group w-100"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
        
        <div className="row save-button-block">
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      </form>
    );
  }
}

CancelOrder = reduxForm({
  form: 'CancelOrderValue',
  destroyOnUnmount: false,
  validate
})(CancelOrder)

export default CancelOrder;