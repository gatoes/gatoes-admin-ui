import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { driverListing } from '../../actions/deliveryagent';
import RiderCashReportingSlide from './RiderCashReportingSlide';
import Pagination from "react-js-pagination";
import DeliveryAgentCashFilter from './DeliveryAgentCashFilter';

class RiderCashReporting extends Component {
  constructor(props){
    super(props);
    this.state = {
      riderListing: props.riderListing,
      status: props.status,
      activePage: 1,
      filter: {}
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getFilterFields = this.getFilterFields.bind(this);
  }
 
  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(1, filters);
  }

  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber, filters){
    driverListing({pageNumber, ...filters, 'cash' : 1}).then((response) => {
      this.setState({
        riderListing : response.data.data
      });
    })
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const {riderListing, activePage} = this.state;
    var limit = 10;
    var total = 0;
    if(riderListing && riderListing.limit){
      var srno = (activePage-1) * riderListing.limit;
      limit = riderListing.limit;
      total = riderListing.total;
    } else {
      var srno = 0;   
      limit = 10;
      total = 0
    }

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Riders</h4>
              </div>
            </div>

            <DeliveryAgentCashFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Unique Id</th>
                        <th>Name</th>
                        <th>Cash Dues</th>
                        <th>Manage Cash</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        riderListing && riderListing.agent && riderListing.agent.length > 0 && riderListing.agent.map((obj, index) => (
                          <RiderCashReportingSlide slideData={obj} index={index} key={obj.driverId} srno={srno} />
                        ))
                      }
                    </tbody>
                  </table>
                  </div>
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={limit}
                      totalItemsCount={total ? total : 0}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
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

export default RiderCashReporting;