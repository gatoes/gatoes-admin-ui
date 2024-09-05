import React, { Component } from 'react';

class RefundStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refundInfo: props.refundInfo
    };
  }

  render() {
    const { refundInfo } = this.state;

   

    return (
      <div className="order-info refund-info">
        <div className="order-heading-ui">
          <h4>Refund Information</h4>
        </div>
        <div className="content-detail">
          <div className="order-full-info">
            <ul>
              <li> <label>Refund Mode</label> <p>{refundInfo.mode}</p> </li>
              <li> <label>Refund Amount</label> <p>{refundInfo.amount}</p> </li>
              <li> <label>Refund Status</label> <p>{refundInfo.status}</p> </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default RefundStatus;
