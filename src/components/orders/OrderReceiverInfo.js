import React, { Component } from 'react';

class OrderReceiverInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      receiverinfo: props.receiverinfo
    };
  }

  render() {
    const { receiverinfo } = this.state;
    let mobile = "+" + receiverinfo.countryCode + " " + receiverinfo.phoneNumber;

    return (
      <div className="order-info receiver-info">
        <div className="order-heading-ui">
          <h4>Receiver Information</h4>
        </div>
        <div className="content-detail">
          <div className="order-full-info">
            <ul>
              <li> <label>Name</label> <p>{receiverinfo.fullName}</p> </li>
              <li> <label>Phone</label> <p><a href={"tel:" + mobile}>{mobile}</a></p> </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderReceiverInfo;
