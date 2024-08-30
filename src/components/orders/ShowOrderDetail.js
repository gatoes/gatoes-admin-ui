import React, { Component, Suspense } from 'react';
import ShopInfo from '../shops/ShopInfo';
import OrderInfo from './OrderInfo';
import OrderDeliveryAgentInfo from './OrderDeliveryAgentInfo';
import OrderCustomerInfo from './OrderCustomerInfo';

class ShowOrderDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData
    };
  }

  render() {
    const {slideData} = this.state;
    return (
      <div className="order-details-block-ui">
        <ShopInfo shopinfo={slideData.restaurant} />
        <OrderInfo orderinfo={slideData.order} iteminfo={slideData.items} />
        <OrderCustomerInfo customerinfo={slideData.customer} customeraddress={slideData.address} />
        {
          slideData.deliveryAgent
          ?
          <OrderDeliveryAgentInfo agentinfo={slideData.deliveryAgent} />
          :
          null
        }
      </div>
    );
  }
}

export default ShowOrderDetail;