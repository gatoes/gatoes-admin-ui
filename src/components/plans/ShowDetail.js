import React, { Component, Suspense } from 'react';
import { getCurrencySymbol} from '../../utilities';
import {getPlanDetails} from '../../actions/plans';
import {MERCHANT_SUPPORT} from "../../constants";

class ShowDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      detail: {}
    };
  }

  componentDidMount(){
    const {slideData} = this.state;
    getPlanDetails(slideData.id).then((response) => {
      this.setState({
        detail: response.data.data
      })
    })
  }

  render() {
    const {slideData, detail} = this.state;
    console.log('ewwewe', detail);
    let currency = getCurrencySymbol();
    let deliveryCharges = detail && detail.delivery_charges ? detail.delivery_charges : [];
    let zones = detail.zones && detail.zones ? detail.zones : [];
    return (
      <div className="order-details-block-ui">
        <div className="order-info">
          <div className="order-heading-ui">
            <h4>Plan Info</h4>
          </div>
          <div className="content-detail">
            <div className="order-full-info">
              <ul>
                <li> 
                  <label>Title</label>
                  <p>{ slideData.name && slideData.name }</p>
                </li>
                <li> <label>Code</label> 
                  <p>{ slideData.code && slideData.code }</p>
                </li>
                <li> <label>Commision</label> <p>{slideData.commision && slideData.commision}%</p> </li> 
                <li> <label>Merchant delivery cap</label> <p>{slideData.merchant_delivery_cap && slideData.merchant_delivery_cap}</p> </li> 
                <li> <label>Delivery range</label> <p>{slideData.delivery_range && slideData.delivery_range}</p> </li> 
                <li> <label>Monthly payout request limit</label> <p>{slideData.monthly_payout_request_limit && slideData.monthly_payout_request_limit}</p> </li> 
                <li> <label>User platform fee</label> <p>{currency} {slideData.user_platform_fee && slideData.user_platform_fee}</p> </li> 
                <li> <label>Menu update charges</label> <p>{currency} {slideData && slideData.menu_updation_charges}</p> </li> 
                <li> <label>Platform onboarding fee</label> <p>{currency}{slideData.platform_on_boarding_fee && slideData.platform_on_boarding_fee}</p> </li> 
                <li> <label>Minimum order</label> <p>{currency} {slideData.minimum_order && slideData.minimum_order}</p> </li> 
                <li> <label>Order scheduling</label> <p>{slideData.order_scheduling && slideData.order_scheduling ? 'Yes' : 'No'}</p> </li> 
                <li> <label>Main listing</label> <p>{slideData.listing && slideData.listing ? 'Yes' : 'No'}</p> </li> 
                <li> <label>In app promotion</label> <p>{slideData.in_app_promotion && slideData.in_app_promotion ? 'Yes' : 'No'}</p> </li> 
                <li> <label>Area wise analytics</label> <p>{slideData.area_wise_analytics && slideData.area_wise_analytics ? 'Yes' : 'No'}</p> </li> 
                <li> <label>Merchant support</label> <p>{MERCHANT_SUPPORT[slideData.merchant_support].label}</p> </li> 

              </ul>
            </div>
          </div>
        </div>

        <div className="order-info">
          <div className="order-heading-ui">
            <h4>Delivery Charges</h4>
          </div>
          <div className="content-detail">
            <div className="subsciption-id-ui">
              <ul>
                {
                  deliveryCharges && deliveryCharges.length > 0 && deliveryCharges.map((obj, index) => (
                    <>
                    <li> 
                      <label>Range</label>
                      <p>{ obj.range && obj.range }</p>
                    </li>
                    <li> 
                      <label>User delivery charges</label>
                      <p>{currency} { obj.user_delivery_charges && obj.user_delivery_charges }</p>
                    </li>
                    <li> 
                      <label>Merchant delivery charges</label>
                      <p>{currency}{ obj.merchant_delivery_charges && obj.merchant_delivery_charges }</p>
                    </li>
                    </>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>

        <div className="order-info">
          <div className="order-heading-ui">
            <h4>Zones</h4>
          </div>
          <div className="content-detail">
            <div className="order-items-info">
              {
                zones && zones.length > 0
                ?
                <ul>
                  {
                    zones && zones.length > 0 && zones.map((obk, index) => (
                      <>
                      <li>
                        <div className="left-ui">
                          <div className="qnty"><label>{obk.zoneName && obk.zoneName} -</label></div>
                          <div className="item-name-block"><p>{ obk.zoneAddress && obk.zoneAddress }</p></div>
                        </div>
                        <div className="right-ui">
                          <span></span>
                        </div>
                      </li>
                      </>
                    ))
                  }
                </ul>
                :
                <ul><li><p>No zone found</p></li></ul>
              }
            </div>
          </div>
        </div>

        <div className="order-info">
          <div className="order-heading-ui">
            <h4>Merchants</h4>
          </div>
          <div className="content-detail">
            <div className="order-items-info">
              {
                detail && detail.shops && detail.shops.length > 0
                ?
                <ul>
                  {
                    detail && detail.shops && detail.shops.length > 0 && detail.shops.map((obj, index) => (
                      <>
                      <li>
                        <div className="left-ui">
                          <div className="qnty"><label>{obj.shopName && obj.shopName} -</label></div>
                          <div className="item-name-block"><p>{ obj.shopAddress && obj.shopAddress }</p></div>
                        </div>
                        <div className="right-ui">
                          <span></span>
                        </div>
                      </li>
                      </>
                    ))
                  }
                </ul>
                :
                <ul><li><p>No merchant found</p></li></ul>
              }
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default ShowDetail;