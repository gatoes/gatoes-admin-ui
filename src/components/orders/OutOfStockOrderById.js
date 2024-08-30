import React, { Component, Suspense } from 'react';
import { outOfStockOrdersListing } from '../../actions/orders';

class OutOfStockOrderById extends Component {
  constructor(props){
    super(props);
    this.state = {
      outStockOrders: null,
    };
  }
 
  componentDidMount(){
    outOfStockOrdersListing({orderId : this.props.match.params.orderId}).then((response) => {
      this.setState({
        outStockOrders: response.data.data
      })
    })
  }

  render() {
    const {outStockOrders} = this.state;
    console.log('outStockOrders', outStockOrders);
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-12 tl-block align-self-center">
                <h4 className="heading">Out of stock Orders</h4>
              </div>
            </div>
            
            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                 
                </div>
              </div>
            </div>
                  
          </div>
        </div>
      </div>
    );
  }
}

export default OutOfStockOrderById;