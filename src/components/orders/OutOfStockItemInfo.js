import React, { Component, Suspense } from 'react';
import moment from 'moment';
import OutOfStockItemInfoSlide from './OutOfStockItemInfoSlide';
import { updateOutOfStockOrder, cancelOutofStockOrderByAdmin, removeOutStockItem} from '../../actions/orders';
import { updateRequiredCounterSuccess} from '../../actions/settings';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {CANCEL_CONFIRMATION, CANCEL_SUCCESS} from '../../constants';
import {toast} from 'react-toastify';
import { connect } from 'react-redux';
//import { reduxForm, Field, reset, FieldArray, formValueSelector } from 'redux-form';
//import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';

class OutOfStockItemInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderinfo: props.orderinfo,
      outStockOrderItem: props.outStockOrderItem,
      status: props.status,
      iteminfo: props.iteminfo,
      customerinfo: props.customerinfo
    };
    this.cancelOrder = this.cancelOrder.bind(this);
    this.showOrderDetail = this.showOrderDetail.bind(this);
  }

  cancelOrder(orderId){
    var objProps = this.props;
    window.$$('.m-cancel-btn').trigger('click');
    confirmAlert({
      title: '',
      message: CANCEL_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            cancelOutofStockOrderByAdmin({orderId: orderId}).then((response) => {
              objProps.updateOrderList(orderId);
              objProps.updateRequiredCounterSuccess('outofstock');
              toast.success(CANCEL_SUCCESS, {
                position: toast.POSITION.TOP_RIGHT
              });
            });
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

  componentDidMount(){
    this.props.removeOutStockItem();
  }

  showOrderDetail(){
    this.props.showFullOrderDetail(1);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'outstockAltItems'){
      this.setState({
        outStockOrderItem: nextProps.outStockOrderItem,
        status: nextProps.status
      });
    }
  }

  submitForm(e){
    const orderId = this.props.orderinfo.orderId;
    e.preventDefault();
    const {outStockOrderItem} = this.state;
    //console.log('values000000', outStockOrderItem);
    return updateOutOfStockOrder({'outStockOrderItem': outStockOrderItem, 'orderId': orderId})
    .then((result) => {
      toast.success('Order updated Successfully.');
      var objProps = this.props;
      window.$$('.m-cancel-btn').trigger('click');
      objProps.updateRequiredCounterSuccess('outofstock');
      objProps.updateOrderList(this.state.orderinfo.orderId);
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    var itemCounter = 0;
    //const {handleSubmit, pristine, submitting} = this.props;
    const { orderinfo, iteminfo, customerinfo } = this.state;
    console.log('iteminfo', iteminfo);
    return (
      <div className="ostock-modal-ui">
        <div className="order-details">
          <div className="form-group">
            <div className="detail-ui">
              <label>Order ID</label>
                   <p>{orderinfo.orderId && orderinfo.orderId}</p>
               </div>
             </div>
             <div className="form-group w33">
              <div className="detail-ui">
                   <label>Name</label>
                   <p>{ customerinfo.fullName && customerinfo.fullName}</p>
               </div>
               <div className="detail-ui">
                   <label>Phone</label>
                   <p>{ customerinfo.phoneNumber && customerinfo.phoneNumber}</p>
               </div>
             </div>
         </div>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="item-out-stock-block">
            {

              iteminfo && iteminfo.length > 0 && iteminfo.map((itm, index) => {
                
                return (
                itm.recommend != null ? <OutOfStockItemInfoSlide slideData={itm} index={itemCounter++} key={itm.id} /> : null
              )})
            }
          </div>
          <div className="similar-listing">
            <div className="full-order-block text-right">
              <a href="javascript:void(0);" onClick={this.showOrderDetail} className="full-order-btn">View full order</a>
            </div>

            <div className="btn-blocks">
              <button className="btn btn2">Update Order</button>
              <a className="btn btn1" href="javascript:void(0)" onClick={() => this.cancelOrder(orderinfo.orderId)}>Cancel Order</a>
            </div>
          </div>
        </form>

      </div>
    );
  }
}

const mapStatesToProps = (state, ownProps) => {
  return {
    outStockOrderItem: {...state.Order.outstock_alt_items_list},
    status: state.Order.status,
    compName: state.Order.compName
  }
}


// OutOfStockItemInfo = reduxForm({
//   form: 'OutOfStockItemInfoForm',
//   destroyOnUnmount: true,
//   enableReinitialize: true,
//   keepDirtyOnReinitialize: true
// })(OutOfStockItemInfo)

export default connect(mapStatesToProps, {removeOutStockItem, updateRequiredCounterSuccess})(OutOfStockItemInfo);

