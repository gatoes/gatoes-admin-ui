import React, { Component, Suspense } from 'react';
import moment from 'moment';
import {PAYMENT_TYPE} from '../../constants';

class OrderInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderinfo: props.orderinfo,
      iteminfo: props.iteminfo
    };
  }

  render() {
      const { orderinfo, iteminfo } = this.state;
      let totPrice = orderinfo && orderinfo.totalPrice && orderinfo.totalPrice;
      let paidAmt = 0;
      if(orderinfo.appliedWallet && orderinfo.appliedWallet.usedAmount){
        paidAmt = orderinfo.totalPrice - orderinfo.appliedWallet.usedAmount;
      }
      //console.log('iteminfo', iteminfo);
      return (
        <>
          <div className="order-info">
            <div className="order-heading-ui">
                <h4>Order information</h4>
            </div>
            <div className="content-detail">
              <div className="order-id-ui">
                <ul>
                  <li><label>Order ID</label><p>{orderinfo.orderId}</p></li>
                  <li> <label>Total Price</label><p>{orderinfo.currencySymbol + totPrice}</p> </li>
                  <li><label>Payment Type</label><p>{ PAYMENT_TYPE[orderinfo.paymentType].label }</p></li>
                  <li>
                  <label style={{ fontWeight: 'bold' }}>
                      Don't Send Cutlery
                    </label>
                    <input
                      type="checkbox"
                      checked={iteminfo.cutlery === true} // If cutlery is true, check the checkbox
                      disabled
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '10px',
                        cursor: 'not-allowed',
                        backgroundColor: iteminfo.cutlery ? '#00c853' : '#f0f0f0', // Green if checked, grey otherwise
                        borderColor: iteminfo.cutlery ? '#00c853' : '#ccc',
                        borderRadius: '4px',
                      }}
                    />
                   
                  </li>
                  {
                    orderinfo.riderSuggestion
                    ?
                    <li><label>Suggestion to Rider</label><p>{orderinfo.riderSuggestion}</p></li>
                    :
                    null
                  }
                  {/*
                  <li> <label>Discount</label> <p>{orderinfo.discount ? orderinfo.currencySymbol + orderinfo.discount : 0}</p> </li>
                */}
                </ul>
              </div>
              <div className="order-full-info">
                <ul>
                  <li> 
                    <label>Schedule</label>
                    <p>
                      { 
                        orderinfo.isSchedule == 1 &&
                        "Yes : " +  moment(orderinfo.scheduleStart).calendar() + ' - ' +  moment(orderinfo.scheduleEnd).format('LT') 
                      }
                    </p>
                  </li>
                  <li> <label>Order placed</label> 
                    <p>
                      {
                        orderinfo.paymentAt 
                        ?
                        orderinfo.paymentAt && moment(orderinfo.paymentAt).format('llll')
                        :
                        orderinfo.placedAt && moment(orderinfo.placedAt).format('llll')
                      }
                    </p>
                  </li>
                  <li> <label>Number of items</label> <p>{iteminfo && iteminfo.length}</p> </li> 
                  <li> <label>Confirmed at</label> <p>{orderinfo.conformedAt && moment(orderinfo.conformedAt).format('llll')}</p> </li>
                  <li> <label>Prepration time</label> <p>{orderinfo.preparationTimeInMin ? orderinfo.preparationTimeInMin + " mins" : null}</p> </li> 
                  
                  {
                    orderinfo.canceldAt
                    ?
                    <li> <label>Cancelled at</label> <p>{orderinfo.canceldAt && moment(orderinfo.canceldAt).format('llll')}</p> </li> 
                    :
                    <li> <label>Delivered at</label> <p>{orderinfo.deliveredAt && moment(orderinfo.deliveredAt).format('llll')}</p> </li> 
                  }

                </ul>
              </div>
            </div>
          </div>

          <div className="order-info driver-info">
            <div className="order-heading-ui">
              <h4>Order items</h4>
            </div>
            <div className="content-detail">
              <div className="order-items-info">
                <ul>
                  {
                    iteminfo && iteminfo.length > 0 
                    && 
                    iteminfo.map((itm, undex) => (
                      <li>
                        <div className="left-ui">
                          <div className="qnty"><label>{itm.quantity}x </label></div>
                          <div className="item-name-block">
                            <p>
                              {itm.itemName + ' ('+ itm.categoryName +')'}
                              {
                                itm.variants && itm.variants.itemCustom  && itm.variants.itemCustom.length > 0 && itm.variants.itemCustom.map((varint, varintindex) => (
                                    <> ({varint.name})</>
                                 ))
                              }

                            </p>
                            {
                              itm.atributes && itm.atributes.length > 0 && itm.atributes.map((crust, crindex) => (
                                <>
                                <span>{crust.name}</span>
                                {
                                  crust.itemCustom && crust.itemCustom.length > 0 && crust.itemCustom.map((crustaddons, adindex) => (
                                    
                                    crustaddons.isSelected && (crustaddons.isSelected == 1) 
                                    ?
                                    <span>{crustaddons.name + ' - ' + crustaddons.currencySymbol + crustaddons.finalPrice }</span>
                                    :
                                    ''
                                   
                                  ))
                                }
                                </>
                              ))
                            }
                          </div>
                        </div>
                        {/* <div className="right-ui">
                          <span>{itm.currencySymbol+itm && itm.cartPrice && itm.cartPrice}</span>
                        </div> */}
                        
                        {/* <div className="right-ui">
                          {itm.offerPrice ? (
                            <>
                             
                             <span style={{ textDecoration: 'line-through', marginRight: '10px', color: '#b0b0b0' }}>
                                {itm.currencySymbol + itm.cartPrice}
                              </span>
                             
                              <span>
                                {itm.currencySymbol + (itm.cartPrice - itm.offerPrice)}
                              </span>
                            </>
                          ) : (
                            
                            <span>{itm.currencySymbol + itm.cartPrice}</span>
                          )}
                        </div> */}
                        <div className="right-ui">
                          {true ? (  // Force it to always show the crossed-out and discounted prices for testing
                            <>
                              {/* Show the original price with strikethrough */}
                              <span style={{ textDecoration: 'line-through', marginRight: '10px', color: '#b0b0b0' }}>
                                ₹250
                              </span>
                              {/* Show the discounted price */}
                              <span>
                                ₹150
                              </span>
                            </>
                          ) : (
                            // If no offerPrice, show the original price
                            <span>₹250</span>
                          )}
                        </div>


                        {
                          itm.suggestion ?  <p>{ itm.suggestion }</p> : null
                        }
                        
                      </li>
                    ))
                  } 
                </ul>
                <div className="total-price-ui">
                  <div className="left-ui">
                      <p>Subtotal</p>
                  </div>
                  <div className="right-ui">
                    <span>{orderinfo.currencySymbol+orderinfo.itemTotal}</span>
                  </div>



                </div>

                <ul className="etc-charges">
                  {
                    orderinfo.deliveryCharge
                    ?
                    <li>
                      <div className="left-ui">
                        <div className="item-name-block">
                          <p>Delivery Charges</p>
                        </div>
                      </div>
                      <div className="right-ui">
                        <span>{orderinfo.currencySymbol+orderinfo.deliveryCharge}</span>
                      </div>
                    </li>
                    :
                    null
                  }

                  {
                    orderinfo.platformFee
                    ?
                    <li>
                      <div className="left-ui">
                        <div className="item-name-block">
                          <p>Platform Fees</p>
                        </div>
                      </div>
                      <div className="right-ui">
                        <span>{orderinfo.currencySymbol+orderinfo.platformFee}</span>
                      </div>
                    </li>
                    :
                    null
                  }

                  {
                    orderinfo.restaurantCharges && orderinfo.restaurantCharges.length > 0 
                    && 
                    orderinfo.restaurantCharges.map((odr, ondex) => (
                      <li>
                        <div className="left-ui">
                          <div className="item-name-block">
                            <p>{odr.name}</p>
                          </div>
                        </div>
                        <div className="right-ui">
                          <span>{orderinfo.currencySymbol+odr.amount}</span>
                        </div>
                      </li>
                    ))
                  } 


                  {
                    orderinfo && orderinfo.offer
                    ?
                    <li>
                      <div className="left-ui">
                        <div className="item-name-block">
                          <p>Offer Discount</p>
                        </div>
                      </div>
                      <div className="right-ui">
                        <span>-{orderinfo.currencySymbol+orderinfo.offer}</span>
                      </div>
                    </li>
                    :
                    null
                  }

                  {
                    orderinfo && orderinfo.appliedCoupon
                    ?
                    <li>
                      <div className="left-ui">
                        <div className="item-name-block">
                          <p>Coupon ({orderinfo.appliedCoupon.name && orderinfo.appliedCoupon.name})</p>
                        </div>
                      </div>
                      <div className="right-ui">
                        <span>-{orderinfo.currencySymbol+orderinfo.appliedCoupon.deduction}</span>
                      </div>
                    </li>
                    :
                    null
                  }
                </ul>

                <div className="total-price-ui">
                  <div className="left-ui">
                      <p>Total</p>
                  </div>
                  <div className="right-ui">
                    <span>{orderinfo.currencySymbol+orderinfo.totalPrice}</span>
                  </div>
                  {
                    orderinfo.appliedWallet && orderinfo.appliedWallet.usedAmount
                    ?
                    <>
                    <div className="left-ui">
                      <p>Wallet Used</p>
                    </div>
                    <div className="right-ui">
                      <span>{orderinfo.currencySymbol+orderinfo.appliedWallet.usedAmount}</span>
                    </div>
                    
                    <div className="left-ui">
                      <p>Paid by { PAYMENT_TYPE[orderinfo.paymentType].label }</p>
                    </div>
                    <div className="right-ui">
                      <span>{orderinfo.currencySymbol+paidAmt}</span>
                    </div>

                    </>
                    :
                    null
                  }
                </div>


              </div>
            </div>
          </div>
        </>
      );
    }
}

export default OrderInfo;