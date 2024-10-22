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
                <li> <label>Restaurant visibility range</label> <p>{slideData && slideData.restaurant_visibility_range ? slideData.restaurant_visibility_range +"km": '-'}</p> </li> 
                <li> <label>Platform onboarding fee</label> <p>{currency}{slideData.platform_on_boarding_fee && slideData.platform_on_boarding_fee}</p> </li> 
                <li> <label>Minimum order</label> <p>{currency} {slideData.minimum_order && slideData.minimum_order}</p> </li> 
                <li> <label>Menu update charges</label> <p>{currency} {slideData && slideData.menu_updation_charges}</p> </li> 
                <li> <label>Monthly payout request limit</label> <p>{slideData.monthly_payout_request_limit && slideData.monthly_payout_request_limit}</p> </li> 
                <li> <label>Show in listing</label> <p>{slideData.listing && slideData.listing ? 'Yes' : 'No'}</p> </li>
                <li> <label>In app promotion</label> <p>{slideData.in_app_promotion && slideData.in_app_promotion ? 'Yes' : 'No'}</p> </li> 
                <li> <label>Area wise analytics</label> <p>{slideData.area_wise_analytics && slideData.area_wise_analytics ? 'Yes' : 'No'}</p> </li> 
                <li> <label>Order scheduling</label> <p>{slideData.order_scheduling && slideData.order_scheduling ? 'Yes' : 'No'}</p> </li>
                <li> <label>Merchant support</label> <p>{MERCHANT_SUPPORT[slideData.merchant_support].label}</p> </li> 

              </ul>
            </div>
          </div>
        </div>

        <div className="order-info">
          <div className="order-heading-ui">
            <h4>Merchant</h4>
          </div>
          <div className="content-detail">
            <div className="order-full-info">
              <ul>
              <li> <label>Commision</label> <p>{slideData && slideData.commission ? slideData.commission + "%" : "-"}</p> </li> 
                <li> <label>Delivery charges</label> <p>{currency}{slideData.merchant_delivery_charges && slideData.merchant_delivery_charges}</p> </li> 
                <li> <label>Multiplier Beyond Normal Delivery Radius (Actual Radius- Normal Range)</label> <p> {slideData.merchant_multiplier_beyond_normal_delivery_radius && slideData.merchant_multiplier_beyond_normal_delivery_radius}</p> </li> 
                <li> <label>Base Price (Max)(Cap)</label> <p>{currency}{slideData.merchant_base_price && slideData.merchant_base_price}</p> </li> 
                <li> <label>Base Percentage (%) (Subtotal*Below Percentage)</label> <p>{slideData.merchant_base_percentage && slideData.merchant_base_percentage}</p> </li> 
                <li> <label>Cap (%) (Subtotal * Below Percentage)</label> <p>{slideData.merchant_cap_percentage && slideData.merchant_cap_percentage}</p> </li> 
                <li> <label>Surge</label> <p>{currency}{slideData.merchant_surge && slideData.merchant_surge}</p> </li> 
                <li> <label>Normal Delivery Radius (in KM)</label> <p>{slideData.merchant_normal_delivery_radius && slideData.merchant_normal_delivery_radius}</p> </li> 
                <li> <label>Merchant max cap (%)</label> <p>{slideData.merchant_max_cap_percentage && slideData.merchant_max_cap_percentage}</p> </li> 

              </ul>
            </div>
          </div>
        </div>
        <div className="order-info">
          <div className="order-heading-ui">
            <h4>User</h4>
          </div>
          <div className="content-detail">
            <div className="order-full-info">
              <ul>
                <li> <label>Order Base Price (Rs)</label> <p>{currency}{slideData.order_base_price && slideData.order_base_price}</p> </li> 
                <li> <label>User base</label> <p> {slideData.user_platform_base && slideData.user_platform_base}</p> </li> 
                <li> <label>Platform fee divisor</label> <p>{slideData.user_platform_base_divisor && slideData.user_platform_base_divisor}</p> </li> 
                <li> <label>Delivery Charges (Rs)(Per Km)</label> <p>{slideData.user_delivery_charges && slideData.user_delivery_charges}</p> </li> 
                <li> <label>Delivery Charges (Beyond Normal Delivery Radius (Actual Radius- Normal Range)Per Km</label> <p>{slideData.user_delivery_charges_beyond_normal_delivery_radius && slideData.user_delivery_charges_beyond_normal_delivery_radius}</p> </li> 
                <li> <label>Base order Price for normal Delivery Radius (Rs)</label> <p>{currency}{slideData.base_order_price_for_normal_delivery_radius && slideData.base_order_price_for_normal_delivery_radius}</p> </li> 
                <li> <label>Normal Delivery Radius (in KM)</label> <p>{slideData.user_normal_delivery_radius && slideData.user_normal_delivery_radius}</p> </li> 
                <li> <label>Weather Surge</label> <p>{slideData.user_surge && slideData.user_surge}</p> </li> 

                <li> <label>Low Order Fee(If Order Value is Less than the Base Order value)</label> <p>{slideData.user_low_order_fee && slideData.user_low_order_fee}</p> </li> 
                <li> <label>User Platform Fee</label> <p>{slideData.user_platform_fee && slideData.user_platform_fee}</p> </li> 
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