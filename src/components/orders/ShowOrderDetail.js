import React, { Component, Suspense } from 'react';
import ShopInfo from '../shops/ShopInfo';
import OrderInfo from './OrderInfo';
import OrderDeliveryAgentInfo from './OrderDeliveryAgentInfo';
import OrderCustomerInfo from './OrderCustomerInfo';
import OrderReceiverInfo from './OrderReceiverInfo';
import CutleryInfo from './CutleryInfo';
import RefundStatus from './RefundStatus';

class ShowOrderDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData
    };
  }

  render() {
    const {slideData} = this.state;
    const receiverData = slideData.receiver || { fullName: 'Ramesh', phoneNumber: '7657657655', countryCode: '91' };
    const refundData = slideData.refund || { mode: 'Credit Card', amount: '100', status: 'Pending' };

    return (
      <div className="order-details-block-ui">
        <ShopInfo shopinfo={slideData.restaurant} />
        <OrderInfo orderinfo={slideData.order} iteminfo={slideData.items} />
        <OrderCustomerInfo customerinfo={slideData.customer} customeraddress={slideData.address} />
        {/* {
          slideData.receiver && ( // Check if receiver exists
            <OrderReceiverInfo receiverinfo={slideData.receiver} />
          )
        } */}
         <OrderReceiverInfo receiverinfo={receiverData} /> {/* Pass receiverData */}

          {/* Call the RefundStatus component */}
        {/* {slideData.refund && (
          <RefundStatus refundInfo={slideData.refund} />
        )} */}

<RefundStatus refundInfo={refundData} />
        
        {
          slideData.deliveryAgent
          ?
          <OrderDeliveryAgentInfo agentinfo={slideData.deliveryAgent} />
          :
          null
        }

        {slideData.cutlery !== undefined && (
          <CutleryInfo cutlery={slideData.cutlery} />
        )}


      </div>
    );
  }
}

export default ShowOrderDetail;