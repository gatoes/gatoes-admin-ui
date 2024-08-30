import React, { Component, Suspense } from 'react';
import {order_status, SHOP_TYPE, PAYMENT_TYPE, DELIVERED_CONFIRMATION, DELIVERED_SUCCESS, SHOP_DELIVERY_TYPE} from '../../constants';
import moment from 'moment';
import { render } from 'react-dom';
import Modal from '../../Modal';
import {getCurrencySymbol, diffInMinsDate} from '../../utilities';
import ReAssignRider from './ReAssignRider';
import ReOrderByAdmin from './ReOrderByAdmin';
import ShowOrderDetail from './ShowOrderDetail';
import TimeStopWatch from './TimeStopWatch';
import CancelOrder from './CancelOrder';
import RefundOrder from './RefundOrder';
import {getAclChecks} from '../../utilities';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { setDeliveredByAdmin, updateOrderStatusByAdmin, cancelOrderByAdmin, updateUnassignOrder } from '../../actions/orders';
import {toast} from 'react-toastify';

class OrderListSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      maxCashLimit: props.maxCashLimit,
      maxTripLimit: props.maxTripLimit,
      index: props.index,
      srno: props.srno,
      activePage: props.activePage,
      isPaneOpen: false,
      isPaneOpenLeft: false
    };
  }

  markOrderUnassigned(){
    const {slideData, index, activePage} = this.state;
    confirmAlert({
      title: '',
      message: "Do you want to mark this order as unassigned?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updateUnassignOrder({orderId: slideData.order.orderId}).then((response) => {
              // const orderStats = {...slideData, order: {...slideData.order, status: 1}};
              // this.setState({
              //   slideData: orderStats
              // })
              this.props.reloadOrder(activePage);
              toast.success('Order has been marked unassigned successfully.', {
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

  assignRider(e){
    const {slideData, index} = this.state;

    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Re-assign Rider</h4>}
              body={<ReAssignRider deliveryBoy={slideData && slideData.deliveryAgent ? slideData.deliveryAgent : null} shopId={slideData.restaurant.shopId} updateSlide={this.updateSlide.bind(this)} orderId={slideData.order.orderId} status={slideData.order.status} maxCashLimit={this.props.maxCashLimit} maxTripLimit={this.props.maxTripLimit} />}
            />
    });
  }

  reorderByAdmin(e){
    const {slideData, index} = this.state;
    console.log('slideDatawewe', slideData);
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Re-Order</h4>}
              body={<ReOrderByAdmin shopId={slideData.restaurant.shopId} updateSlide={this.updateSlide.bind(this)} orderId={slideData.order.orderId} orderStatus={slideData.order.order_status} />}
            />
    });
  }

  cancelByAdmin(e){
    const {slideData, index, activePage} = this.state;
    confirmAlert({
      title: '',
      message: "Do you want to cancel this order?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            cancelOrderByAdmin({orderId: slideData.order.orderId}).then((response) => {
              this.props.reloadOrder(activePage);
              toast.success('Order has been cancelled successfully.', {
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
    // const {slideData, index} = this.state;
    // window.getFooter().setState({
    //   renderElement: <Modal 
    //           id="business-detail-modal"
    //           show={true}
    //           onHide={this.hide}
    //           header={<h4 className="modal-title">Cancel Order</h4>}
    //           body={<CancelOrder shopId={slideData.restaurant.shopId} updateCancelSlide={this.updateCancelSlide.bind(this)} orderId={slideData.order.orderId} />}
    //         />
    // });
  }

  refundByAdmin(e){
    const {slideData, index} = this.state;
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Refund # Order Amount: {slideData.order.currencySymbol} {slideData.order.totalPrice}</h4>}
              body={<RefundOrder shopId={slideData.restaurant.shopId} updateCancelSlide={this.updateCancelSlide.bind(this)} orderId={slideData.order.orderId} itemTotal={slideData.order.totalPrice} />}
            />
    });
  }

  updateCancelSlide(result){
    const {slideData, activePage} = this.state;
    let updateSlide = '';

    // updateSlide = {...slideData, order: {...slideData.order, status: 7}};

    // this.setState({
    //   slideData: updateSlide
    // });

    this.props.reloadOrder(activePage);

    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    window.getFooter().setState({
        renderElement: null
    });
    this.hide();
  }

  updateSlide(result){
    const {activePage} = this.state;
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    window.getFooter().setState({
        renderElement: null
    });
    this.props.reloadOrder(activePage);
    this.hide();
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  showOrderDetail(e){
    const {slideData} = this.state;
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<><h4 className="modal-title">{slideData.restaurant.shopName} - {slideData.restaurant.regionName}</h4><span>{slideData.restaurant.shopCuisines}</span><button type="button" className="btn m-cancel-btn" data-dismiss="modal">Close</button></>}
              body={<ShowOrderDetail slideData={this.state.slideData} />}
            />
    });
  }

  setDelivered(){
    const {slideData, index, activePage} = this.state;
    confirmAlert({
      title: '',
      message: DELIVERED_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updateOrderStatusByAdmin({orderId: slideData.order.orderId, status: 4}).then((response) => {
              // const orderStats = {...slideData, order: {...slideData.order, status: 4}};
              // this.setState({
              //   slideData: orderStats
              // })
              this.props.reloadOrder(activePage);
              toast.success(DELIVERED_SUCCESS, {
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

  acceptOrder(){
    const {slideData, index, activePage} = this.state;
    confirmAlert({
      title: '',
      message: "Do you want to accept this order?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updateOrderStatusByAdmin({orderId: slideData.order.orderId, status: 1}).then((response) => {
              // const orderStats = {...slideData, order: {...slideData.order, status: 1}};
              // this.setState({
              //   slideData: orderStats
              // })
              this.props.reloadOrder(activePage);
              toast.success('Order has been accepted successfully.', {
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

  

  render() {



      const { slideData, index, srno } = this.state;
      let currency = getCurrencySymbol();
      var status_class = '';
      var deliveredTimeMins = '';
      var markReadyTime = '';
      var startTime = '';
      var startCompleteTime = '';
      var endCompleteTime = '';
      var lastDeliveredTime = '';

      if(slideData.order.status == -1)
        status_class = 'payment-pending';
      else
        status_class = order_status[slideData.order.status].replace(/ /g,"-").toLowerCase();

      if(slideData && slideData.order && slideData.order.paymentAt){
        startCompleteTime = slideData.order.paymentAt;
      } else {
        startCompleteTime = slideData.order.placedAt;
      }       
      
      if(slideData && slideData.order && slideData.order.deliveredAt){    
        endCompleteTime = slideData.order.deliveredAt;
        deliveredTimeMins = diffInMinsDate(startCompleteTime, endCompleteTime);
      }            

      if(slideData && slideData.order && slideData.order.markReadyAt && slideData.order.conformedAt){    
        
        markReadyTime = diffInMinsDate(slideData.order.conformedAt, slideData.order.markReadyAt);
      } 

      //get last order delivery time
      if(slideData && slideData.lastOrder_deliver_time){    
        lastDeliveredTime = diffInMinsDate(slideData.lastOrder, slideData.lastOrder_deliver_time);
      }                  



      // console.log('slideData', slideData);

      return (
        <>
        <tr>
          <td>{ parseInt(parseInt(index+1) + parseInt(srno))}</td>
          <td>
            <a href="javascript:void(0)" onClick={this.showOrderDetail.bind(this)}>  {slideData.order.orderId} </a>
          </td>
          <td>{lastDeliveredTime}</td>
          
          <td>{currency+parseFloat(slideData.order.totalPrice) }</td>
          <td>{slideData.restaurant.shopName}</td>

          <td><span className={status_class}>{ slideData.order.status == -1 ? "payment pending" : order_status[slideData.order.status]}</span></td>
          {
            localStorage.getItem('hasAllAccess') == 'true'
            ?
            <td>{ PAYMENT_TYPE[slideData.order.paymentType].label }</td>
            :
            null
          }

          <td>
            <TimeStopWatch prepTime={slideData.order.placedAt} duration="60" />
          </td>

          <td>
            {
              slideData && slideData.restaurant && slideData.restaurant.riderAvailable
              ?
              slideData && slideData.deliveryAgent && slideData.deliveryAgent.fullName
              :
              "Restaurant`s Rider"
            }
          </td>

          <td>{ slideData.order && slideData.order.pickupType ? SHOP_DELIVERY_TYPE[slideData.order.pickupType].label : "Delivery"}</td>

          <td>{ slideData.order && slideData.order.preparationTimeInMin ? slideData.order.preparationTimeInMin + " mins" : null}</td>

          <td>{ markReadyTime ? markReadyTime : "" }</td>

          <td>{ deliveredTimeMins ? deliveredTimeMins : null }</td> 

          <td>{moment(slideData.order.placedAt).format('llll')}</td>
          

          <td>{slideData.order.conformedAt && moment(slideData.order.conformedAt).format('llll')}</td>
          
          <td>{slideData.order.pickedAt && moment(slideData.order.pickedAt).format('llll')}</td>
          <td>{slideData.order.deliveredAt && moment(slideData.order.deliveredAt).format('llll')}</td>

          {
            localStorage.getItem('hasAllAccess') == 'true'
            ?
            <>
            <td>{slideData.customer.fullName }</td>
            <td>{slideData.customer.phoneNumber }</td>
            </>
            :
            null
          }
          <td>
            {
              slideData.order.status >= 3 && slideData.order.status <= 8 && getAclChecks('ORDERS_CANCEL')
              ?
                slideData.order && slideData.order.isOrderRefunded && slideData.order.isOrderRefunded == true
                ?
                <span>Already Refunded</span>
                :
                <a href="javascript:void(0);" onClick={this.refundByAdmin.bind(this)}>Refund</a>
              :
              null
            }

          </td>
          <td>
            {
              (slideData.order.status == 1 || slideData.order.status == 2) && (slideData && slideData.restaurant && slideData.restaurant.riderAvailable) && !slideData.deliveryAgent && !(slideData && slideData.order && slideData.order.unassigned) && getAclChecks('MARK_ORDER_UNASSIGN')
              ?
              <a href="javascript:void(0);" onClick={this.markOrderUnassigned.bind(this)}>Mark Unassigned</a>
              :
              null
            }
          </td>
          <td>
              {
                ((slideData.order.status >= 0 && slideData.order.status <= 4) || (slideData.order.status == 9))
                ?
                <div className="more-setting-ui more-btn-ui">
                  <a href="javascript:void(0);" className="more-action btn more-btn" data-toggle="dropdown">More</a>
                  <ul className="dropdown-menu">
                    {
                      (slideData.order.status <= 0) && getAclChecks('ORDERS_CANCEL')
                      ?
                      <li><a href="javascript:void(0);" onClick={this.acceptOrder.bind(this)}>Accept Order</a></li>
                      :
                      null
                    }

                    {
                      (slideData.order.status > 0 && slideData.order.status < 4) && slideData.deliveryAgent && slideData.order.riderAvailable == 1 && getAclChecks('ORDERS_REASSIGN')
                      ?
                      <li><a href="javscript:void(0);" onClick={this.assignRider.bind(this)}>Reassign</a></li>
                      :
                      null
                    }
                    {
                      (slideData.order.status == 3 || slideData.order.status == 4) && getAclChecks('ORDERS_REORDER')
                      ?
                      <li><a href="javascript:void(0);" onClick={this.reorderByAdmin.bind(this)}>Reorder</a></li>
                      :
                      null
                    }
                    {
                      ((slideData.order.status < 4 && getAclChecks('ORDERS_CANCEL'))  || (slideData.order.status < 4 && getAclChecks('ORDERS_LISTING_RESTRICTED')) || (slideData.order.status == 9))
                      ?
                      <li><a href="javascript:void(0);" onClick={this.cancelByAdmin.bind(this)}>Cancel</a></li>
                      :
                      null
                    }
                    
                    {
                      ((slideData.order.status < 4 && slideData.order.status > 1) || (slideData && slideData.restaurant && slideData.restaurant.riderAvailable == 0)  && getAclChecks('ORDERS_REORDER') && slideData.order.status != 4)
                      ?
                      <li><a href="javascript:void(0);" onClick={this.setDelivered.bind(this)}>Set Delivered</a></li>
                      :
                      null
                    }
                    
                  </ul>
                </div>
                :
                null
              }
          </td>
        </tr>
        </>
      );
    }
}

export default OrderListSlide;