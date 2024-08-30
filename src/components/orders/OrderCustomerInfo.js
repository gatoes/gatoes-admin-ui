import React, { Component, Suspense } from 'react';

class OrderCustomerInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      customerinfo: props.customerinfo,
      customeraddress: props.customeraddress,
    };
  }
	render() {
      const { customerinfo, customeraddress } = this.state;
      let mobile = "+"+customerinfo.countryCode+" "+customerinfo.phoneNumber;

      let hNumber = customeraddress.houseNumber ? customeraddress.houseNumber  + ', ' : '';
      let fNumber = customeraddress.flatNumber ? customeraddress.flatNumber  + ', ' : '';
      
      let address = hNumber + fNumber + customeraddress.address;
      return (
        <div className="order-info customer-info">
          <div className="order-heading-ui">
            <h4>User information</h4>
          </div>
          <div className="content-detail">
            <div className="order-full-info">
              <ul>
                <li> <label>Name</label> <p>{customerinfo.fullName}</p> </li>
                <li> <label>Unique Id</label> <p>{customerinfo.unique_id ? customerinfo.unique_id : null}</p> </li>
                <li> <label>Phone </label> <p><a href={"tel:"+ mobile}>{"+"+customerinfo.countryCode+" "+customerinfo.phoneNumber}</a></p> </li>
                <li> <label>Address</label> <p>{ address }</p> </li> 
                <li> <label>Email</label> <p><a href={"mailto:"+customerinfo.email}>{customerinfo.email}</a></p> </li>
                <li> <label>Landmark</label> <p>{customeraddress.buildingName}</p> </li>
              </ul>
            </div>
          </div>
      </div>
    	);
  	}
}

export default OrderCustomerInfo;