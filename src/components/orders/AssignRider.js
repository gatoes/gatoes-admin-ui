import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { shopDriverListing } from '../../actions/deliveryagent';
import AssignRiderSlide from './AssignRiderSlide';

class AssignRider extends Component {
  constructor(props){
    super(props);
    this.state = {
      shopId: props.shopId,
      orderId: props.orderId,
      maxCashLimit: props.maxCashLimit,
      maxRiderTrips: props.maxRiderTrips,
      driverList: []
    };
  }
 
  componentDidMount(){
    shopDriverListing({shopId: this.state.shopId}).then((response) => {
      this.setState({
        driverList: response.data.data
      })
    })
  }

  render() {
    const {driverList, orderId, maxCashLimit, maxRiderTrips} = this.state;
    
    return (
      <div className="row popupmargin">
        <div className="col-sm-12">
          <div className="result-listing">
            <table>
              <thead>
                <tr>
                  <th>Sr.no.</th>
                  <th>Name</th>
                  <th>Rider Type</th>
                  <th>Online Status</th>
                  <th>Auto Accept</th>
                  
                  <th>Today Order Delivered</th>
                  <th>Current Trips</th>
                  <th>Vehicle</th>
                  <th>Contact</th>
                  <th>Distance from Shop</th>
                  <th>Cash due</th>
                  <th>Assign</th>
                </tr>
              </thead>
              <tbody>
                {
                  driverList.length > 0 && driverList.map((obj, index) => (
                     <AssignRiderSlide slideData={obj} maxCashLimit={maxCashLimit} maxRiderTrips={maxRiderTrips} index={index} key={obj.id} orderId={orderId} updateOrderList={this.props.updateOrderList} />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AssignRider;