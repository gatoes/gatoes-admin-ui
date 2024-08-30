import React, { Component, Suspense } from 'react';
import {order_status, SHOP_TYPE} from '../../constants';
import moment from 'moment';
import { render } from 'react-dom';
import Modal from '../../Modal';
//import SlidingPane from 'react-sliding-pane';
//import 'react-sliding-pane/dist/react-sliding-pane.css';
import ShopInfo from '../shops/ShopInfo';
import OrderInfo from './OrderInfo';
import OrderDeliveryAgentInfo from './OrderDeliveryAgentInfo';
import OrderCustomerInfo from './OrderCustomerInfo';
import {getCurrencySymbol, diffInMinsDate} from '../../utilities';
import AssignRider from './AssignRider';
import RebroadcastOrder from './RebroadcastOrder';
import ShowOrderDetail from './ShowOrderDetail';
import {getAclChecks} from '../../utilities';

class UnassignedOrderListSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      maxCashLimit: props.maxCashLimit,
      maxRiderTrips: props.maxRiderTrips,
      index: props.index,
      srno: props.srno,
      isPaneOpen: false,
      isPaneOpenLeft: false
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index,
      maxCashLimit: nextProps.maxCashLimit,
      maxRiderTrips: nextProps.maxRiderTrips
    });
  }

  assignRider(e){
    const {slideData, index, maxCashLimit, maxRiderTrips} = this.state;
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Assign Rider</h4>}
              body={<AssignRider shopId={slideData.restaurant.shopId} updateOrderList={this.props.updateOrderList} orderId={slideData.order.orderId} maxCashLimit={maxCashLimit} maxRiderTrips={maxRiderTrips}  />}
            />
    });
  }

  reBroadcast(e){
    const {slideData, index} = this.state;
    window.getFooter().setState({
      renderElement: <Modal 
              id="prepration-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Re Broadcast order request to Riders</h4>}
              body={<RebroadcastOrder updateUnassignList={this.updateUnassignList.bind(this)} orderId={slideData.order.orderId} index={index} />}
            />
    });
  }

  updateUnassignList(){
    this.hide();
  }

  reloadUnassignedOrder(){
    this.hide();
  }

  hide(){
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    window.getFooter().setState({
        renderElement: null
    });
  }

  showOrderDetail(e){
    const {slideData} = this.state;
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<><h4 className="modal-title">{slideData.restaurant.shopName}</h4><span>{slideData.restaurant.shopCuisines}</span><button type="button" className="btn m-cancel-btn" data-dismiss="modal">Close</button></>}
              body={<ShowOrderDetail slideData={this.state.slideData} />}
            />
    });
  }

	render() {
      const { slideData, index, srno } = this.state;
      let currency = getCurrencySymbol();
      let lastDeliveredTime = "";
      let price = slideData.order && slideData.order.totalPrice ? slideData.order.totalPrice : 0;
      console.log('aa', currency);

      //get last order delivery time
      if(slideData && slideData.lastOrder_deliver_time){    
        lastDeliveredTime = diffInMinsDate(slideData.lastOrder, slideData.lastOrder_deliver_time);
      } 



      return (
        <>
        <tr>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td><a href="javascript:void(0)" onClick={this.showOrderDetail.bind(this)}>  {slideData.order.orderId} </a></td>

          <td>{lastDeliveredTime}</td>

          <td>{slideData.order.unassignedReason ? slideData.order.unassignedReason : '' }</td>
          <td>{currency+price }</td>
          <td>{slideData.restaurant.shopName}</td>
          <td>{slideData && slideData.restaurant && slideData.restaurant.locationDetail ? slideData.restaurant.locationDetail : null}</td>
          <td>{order_status[slideData.order.status]}</td>
          <td>{moment(slideData.order.placedAt).format('llll')}</td>
          <td>{slideData.order.deliveredAt && moment(slideData.order.deliveredAt).format('llll')}</td>
          <td>{slideData.customer.fullName }</td>
          <td>{slideData.customer.phoneNumber }</td>
          <td>
            {
              getAclChecks('UNASSIGNED_ORDERS_ASSIGN_RIDER')
              ?
              <a href="javscript:void(0);" className="add-text-btn" onClick={this.assignRider.bind(this)}>Assign Rider</a>
              :
              null
            }
            |
            {
              getAclChecks('UNASSIGNED_ORDERS_REBROADCAST')
              ?
              <a href="javscript:void(0);" className="add-text-btn" onClick={this.reBroadcast.bind(this)}>Rebroadcast Job</a>
              : 
              null
            }
          </td>
        </tr>
        
        </>
    	);
  	}
}

export default UnassignedOrderListSlide;