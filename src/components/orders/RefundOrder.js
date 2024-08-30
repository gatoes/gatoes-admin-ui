import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { orderDetailById, refundByAdmin } from '../../actions/orders';
//import ReAssignRiderSlide from './ReAssignRiderSlide';
import {REFUND_REASON, REORDER_TYPE, currencyFormat, WHO_BEAR_COST_REFUND_ORDER, TRANSFER_TYPE} from '../../constants';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {toast} from 'react-toastify';
import CheckboxGroup2 from '../FormFields/CheckboxGroup2';
import validate from './ValidateRefund';

class RefundOrder extends Component {
  constructor(props){
    super(props);
    this.state = {
      shopId: props.shopId,
      orderId: props.orderId,
      itemTotal: props.itemTotal,
      showItems: 0
    };
    this.refundOtherReason = this.refundOtherReason.bind(this);
  }

  refundOtherReason(e){
    if(e == 3){
      this.setState({
        showItems: 1
      })
    } else {
      this.setState({
        showItems: 0
      })
    }
  }

  componentWillMount(){
    this.props.initialize();
    this.props.change('orderId', this.state.orderId);
    this.props.change('shopId', this.state.shopId);
    this.props.change('itemTotal', this.state.itemTotal);
  }

  submitReassignForm(values){
    // console.log('values', values);
    return refundByAdmin(values)
    .then((result) => {
      toast.success('Refund has been done Successfully.');
      this.props.reset();
      this.props.updateCancelSlide(result);
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {orderDetail, orderId, showItems, orderStatus, itemTotal} = this.state;
    const {handleSubmit, pristine, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit(this.submitReassignForm.bind(this))}>
        <div className="fields-ui-block">
          <div className="basic-details">
            
            <div className="form-block">
              <div className="row">
                <div className="col-lg-4">
                  <Field
                    name="refund_amount"
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Amount"
                    placeholder=""
                    defaultValue={itemTotal}
                  />
                </div>
                <div className="col-lg-4 selectbox-block">
                  <Field
                    label="Who Bear the Cost"
                    name='who_bear_cost'
                    options={WHO_BEAR_COST_REFUND_ORDER}
                    component={renderReactSelect}
                    placeholder="Select"
                    multi={false}
                    parentDivClass="form-group w-100"
                  />
                </div>

                <div className="col-lg-4 selectbox-block">
                  <Field
                    label="Transfer Type"
                    name='transfer_type'
                    options={TRANSFER_TYPE}
                    component={renderReactSelect}
                    placeholder="Select Type"
                    multi={false}
                    parentDivClass="form-group w-100"
                  />
                </div>
                
                <div className="col-lg-4 selectbox-block">
                  <Field
                    label="Refund Reason"
                    name='refund_reason'
                    options={REFUND_REASON}
                    component={renderReactSelect}
                    placeholder="Select Reason"
                    multi={false}
                    parentDivClass="form-group w-100"
                    onChange={this.refundOtherReason}
                  />
                </div>

                {
                  showItems == 1
                  ?
                  <div className="col-lg-8">
                    <Field
                      name="other_reason"
                      component={renderField}
                      type="text"
                      className="form-control"
                      label="Other Reason"
                      placeholder=""
                    />
                  </div>
                  :
                  null
                }
                

              </div>
            </div>
          </div>
        </div>
        
        <div className="row save-button-block">
          <input type="hidden" name="driverchk" />
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      </form>
    );
  }
}

RefundOrder = reduxForm({
  form: 'RefundOrderValue',
  destroyOnUnmount: false,
  validate
})(RefundOrder)

export default RefundOrder;