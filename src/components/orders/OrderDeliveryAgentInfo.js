import React, { Component, Suspense } from 'react';

class OrderDeliveryAgentInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      agentinfo: props.agentinfo
    };
  }

	render() {
      const { agentinfo } = this.state;
      let mobile = "+"+agentinfo.countryCode+" "+agentinfo.phoneNumber;
      return (
        <div className="order-info driver-info">
          <div className="order-heading-ui">
              <h4>Rider information</h4>
          </div>
          <div className="content-detail">
            <div className="order-full-info">
              <ul>
                <li> <label>Name</label> <p>{agentinfo.fullName}</p> </li>
                <li> <label>Phone </label> <p><a href={"tel:"+ mobile}>{mobile}</a></p> </li>
                <li> <label>Unique Id</label> <p>{agentinfo.unique_id}</p> </li>
              </ul>
            </div>
          </div>
      </div>
    	);
  	}
}

export default OrderDeliveryAgentInfo;