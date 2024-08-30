import React, { Component, Suspense } from 'react';

class ShopInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      shopinfo: props.shopinfo
    };
  }

	render() {
      const { shopinfo } = this.state;
      console.log('wwaasss', shopinfo);
      let mobile = "+"+shopinfo.countryCode+" "+shopinfo.phoneNumber
      return (
        <div className="order-info">
          <div className="order-heading-ui">
            <h4>Restaurant Info</h4>
          </div>
          <div className="content-detail">
            <div className="order-full-info">
              <ul>
                <li> 
                  <label>Unique Id</label>
                  <p>{ shopinfo.unique_id && shopinfo.unique_id }</p>
                </li>
                <li> <label>Zone</label> 
                  <p>{ shopinfo.zoneName && shopinfo.zoneName }</p>
                </li>
                <li> <label>Region</label> <p>{shopinfo.regionName && shopinfo.regionName}</p> </li> 
                <li> <label>Email </label> <p><a href={"mailto:"+shopinfo.email}>{shopinfo.email && shopinfo.email}</a></p> </li>
                <li> <label>Address</label> <p>{shopinfo.shopAddress && shopinfo.shopAddress}</p> </li> 
                <li> <label>Contact Number1</label> <p><a href={"tel:"+ mobile}>{mobile}</a></p> </li> 
              </ul>
            </div>
          </div>
        </div>
    	);
  	}
}

export default ShopInfo;