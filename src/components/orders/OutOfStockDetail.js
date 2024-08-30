import React, { Component, Suspense } from 'react';
import ShopInfo from '../shops/ShopInfo';
import OrderInfo from './OrderInfo';
import OrderDeliveryAgentInfo from './OrderDeliveryAgentInfo';
import OrderCustomerInfo from './OrderCustomerInfo';
import OutOfStockItemInfo from './OutOfStockItemInfo';

class OutOfStockDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      showDetail: 0
    };
    this.showFullOrderDetail = this.showFullOrderDetail.bind(this);
  }

  showFullOrderDetail(showPanle=0){
    this.setState({
      showDetail : showPanle
    })
  }

  render() {
    const {slideData, showDetail} = this.state;
    console.log('showDetail', showDetail);
    return (
      <div className="order-details-block-ui">
        {
          showDetail
          ?
          <>
          
          <OrderInfo orderinfo={slideData.order} iteminfo={slideData.items} />
          <OrderCustomerInfo customerinfo={slideData.customer} customeraddress={slideData.address} />
          {
            slideData.deliveryAgent
            ?
            <OrderDeliveryAgentInfo agentinfo={slideData.deliveryAgent} />
            :
            null
          }
          <div className="similar-listing">
            <div className="full-order-block text-right">
              <a href="javascript:void(0)" onClick={() => this.showFullOrderDetail(0)} className="full-order-btn">View Recommended Items</a>
            </div>
          </div>
          </>
          :
          <OutOfStockItemInfo orderinfo={slideData.order} iteminfo={slideData.items} customerinfo={slideData.customer} updateOrderList={this.props.updateOrderList} showFullOrderDetail={this.showFullOrderDetail} />
        }

        
      </div>
    );
  }
}

export default OutOfStockDetail;