import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getHourlyReports } from '../../actions/orders';
import OrderHourlySlide from './OrderHourlySlide';
import OrdersHourlyFilter from './OrdersHourlyFilter';

class OrderHourlyReporting extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderListing: props.orderListing,
      status: props.status
    };
    this.getFilterFields = this.getFilterFields.bind(this);
  }

  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(filters);
  }
 
  componentDidMount(){
    this.fetchRecords();
  }

  fetchRecords(filters){
    getHourlyReports({...filters}).then((response) => {
      this.setState({
        orderListing : response.data.data
      });
    })
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps);
    if(this.props.status != nextProps.status && nextProps.compName == 'orderlist'){
      this.setState({
        orderListing: nextProps.orderListing,
        status: nextProps.status
      });
    }
  }


  render() {
    const {orderListing, activePage} = this.state;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-12 tl-block align-self-center">
                <h4 className="heading">Hourly Orders Reporting</h4>
              </div>
            </div>

            <OrdersHourlyFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Received</th>
                        <th>Accepted</th>
                        <th>Cancelled</th>
                        <th>Delivered</th>
                        <th>Promo Used</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orderListing && orderListing.length > 0 && orderListing.map((obj, index) => (
                          <OrderHourlySlide slideData={obj} index={index} key={index} />
                        ))
                      }
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>
                  
          </div>
        </div>
      </div>
    );
  }
}


export default OrderHourlyReporting;

