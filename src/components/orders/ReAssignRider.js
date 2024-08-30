import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { shopDriverListing, reAssignRiderToOrder } from '../../actions/deliveryagent';
import ReAssignRiderSlide from './ReAssignRiderSlide';
import {REASSIGN_REASONS, REASSIGN_ORDER_LOCATION} from '../../constants';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderReactSelect from '../FormFields/renderReactSelect';
import {toast} from 'react-toastify';
import validate from './ValidateReassign';

class ReAssignRider extends Component {
  constructor(props){
    super(props);
    this.state = {
      shopId: props.shopId,
      orderId: props.orderId,
      deliveryBoy: props.deliveryBoy,
      maxCashLimit: props.maxCashLimit,
      maxTripLimit: props.maxTripLimit,
      driverList: [],
      orderStatus: props.status
    };
  }
 
  componentDidMount(){
    shopDriverListing({shopId: this.state.shopId}).then((response) => {
      this.setState({
        driverList: response.data.data
      })
    })
  }

  componentWillMount(){
    this.props.change('orderId', this.state.orderId);
    this.props.change('orderStatus', this.state.orderStatus);
  }

  submitReassignForm(values){
    console.log('values', values);
    return reAssignRiderToOrder(values)
    .then((result) => {
      toast.success('Rider assigned to order Successfully.');
      this.props.reset();
      this.props.updateSlide(values);
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
    
  }

  render() {
    const {driverList, orderId} = this.state;
    const {handleSubmit, pristine, submitting} = this.props;
    return (

      <form onSubmit={handleSubmit(this.submitReassignForm.bind(this))}>
        <div className="fields-ui-block">
          <div className="basic-details">
            
            <div className="form-block">
              <div className="row">
                <div className="col-lg-6 selectbox-block">
                  <Field
                    label="Reassign Reason"
                    name='reassing_reason'
                    options={REASSIGN_REASONS}
                    component={renderReactSelect}
                    placeholder="Select Reason"
                    multi={false}
                    parentDivClass="form-group w-100"
                  />
                </div>
                <div className="col-lg-6 selectbox-block">
                  <Field
                    label="Location"
                    name='pick_location'
                    options={REASSIGN_ORDER_LOCATION}
                    component={renderReactSelect}
                    placeholder="Select Location"
                    multi={false}
                    parentDivClass="form-group w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row popupmargin">
          <div className="col-sm-12">
            <div className="result-listing">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Rider Type</th>
                    <th>Online Status</th>
                    <th>Auto Accept</th>
                    <th>Order Delivered</th>
                    <th>Vehicle</th>
                    <th>Contact</th>
                    <th>Distance from Shop</th>
                    <th>Assign</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    driverList.length > 0 && driverList.map((obj, index) => (
                       <ReAssignRiderSlide deliveryBoy={this.props.deliveryBoy} slideData={obj} index={index} key={obj.id} orderId={orderId} updateOrderList={this.props.updateOrderList} maxCashLimit={this.props.maxCashLimit} maxTripLimit={this.props.maxTripLimit} />
                    ))
                  }
                </tbody>
              </table>
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

ReAssignRider = reduxForm({
  form: 'ReAssignRiderValue',
  destroyOnUnmount: false,
  validate
})(ReAssignRider)

export default ReAssignRider;