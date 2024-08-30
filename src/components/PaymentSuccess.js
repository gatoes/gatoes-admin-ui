import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class PaymentSuccess extends Component {
  render() {
    return (
    	<div className="orders-ui-block">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="msg-ui">
                            <figure><img src="/assets/images/ic_done.png" alt="success"/></figure>
                            <h4>Payment success</h4>
                            <p>Transaction ID #{this.props.match.params.index}</p>
                       	</div>
                 	</div>
              	</div>
        	</div>
     	</div>
    );
  }
}
export default PaymentSuccess;
