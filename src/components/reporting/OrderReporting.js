import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { orderReporting } from '../../actions/orders';
import OrderReportingSlide from './OrderReportingSlide';
import Pagination from "react-js-pagination";
import OrderFilter from './OrderFilter';
import { CSVLink, CSVDownload } from "react-csv";

class OrderReporting extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderListing: props.orderListing,
      status: props.status,
      activePage: 1,
      startDownload: null
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.downloadResult = this.downloadResult.bind(this);
  }

  downloadResult(){
    orderReporting({pageNumber : this.state.activePage, ...this.state.filters, is_csv: true}).then((response) => {  
      this.setState({
        startDownload: response
      });
    });
  }

  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(1, filters);
  }
 
  componentDidMount(){
    //this.fetchRecords(1);
  }

  fetchRecords(pageNumber, filters){
    orderReporting({pageNumber, ...filters}).then((response) => {
      this.setState({
        orderListing : response.data.data
      });
    })
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const {orderListing, activePage, filters, startDownload} = this.state;
    var limit = 0;
    var total = 0;
    if(orderListing && orderListing.limit){
      var srno = (activePage-1) * orderListing.limit;
      limit = orderListing.limit;
    } else {
      var srno = 0;   
    }

    if(orderListing && orderListing.total){
      total = orderListing.total;
    }

    if(startDownload !== null){
      this.setState({
        startDownload: null
      });
      console.log('startDownload', startDownload.data);
      return <CSVDownload data={startDownload.data} target="_parent" />
    }

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Order Reporting</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  localStorage.getItem('hasAllAccess') == 'true'
                  ?
                  <div className="download-block">
                      <button className="btn btn2 download-btn" onClick={this.downloadResult}><i className="material-icons">file_download</i>Download CSV</button>
                  </div>
                  :
                  null
                }
              </div>
            </div>

            <OrderFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing result-listing-width">
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Sr.no.</th>
                          <th>Order Date & Time</th>
                          <th>Restaurant unique Id</th>
                          <th>Restaurant Name</th>
                          <th>Order Id</th>
                          <th>Subscription Plan Id</th>

                          <th>Order Status</th>
                          <th>Wallet used</th>
                          <th>Payment Type</th>
                          <th>Placed At</th>
                          <th>Marked Ready At</th>
                          <th>Picked At</th>
                          <th>Delivered At</th>

                          {/* <th>Order Type</th> */}
                         
                          {/* <th>Auto Accepted</th> */}
                          {/*
                          <th>Item Total</th>
                          <th>Total</th>
                          <th>Wallet Used</th>
                          <th>Weekly Charges</th>
                          <th>Packaging Charges</th>
                          <th>Taxes</th>
                          <th>Restaurant Gross Earning</th>
                          <th>Restaurant Net Earning</th>|
                          <th>Admin Gross Earning</th>
                          <th>Coupon Discount</th>
                          <th>No Coupon Discount</th>
                          <th>Coupon Code</th>
                          */}
                          <th>Order Accepted Time In minutes</th>
                          <th>Mark ready time  in minutes</th>
                          <th>Rider delivered time  in minutes</th>
                          <th>Total Delivery time in minutes</th>

                          {/* <th>Order Delivery time</th> */}
                          <th>User Name</th>
                          <th>Rider Name</th>
                          <th>Items Total</th>

                          {/* <th>Order Pick-up Time</th> */}
                          {/* <th>Total Delivery time in minutes</th> */}
                          {/* <th>Order accepted time in minutes</th> */}

                          {/* <th>Cancelled by</th> */}
                          <th>Packaging & Service Charges</th>
                          <th>Coupon code</th>

                          <th>Merchant Discount(with coupon)</th>
                          <th>Merchant Discount (without coupon) </th>
                          <th>Total Merchant Discount</th>
                          <th title="subTotal + packagingCharge - taxes">Net Bill Value (without taxes)</th>
                          <th>GST on order (including cess)</th>
                          <th>User delivery charges</th>
                          <th>Customer payable (Net bill value after taxes & discount)</th>
                          <th>Gatoes Platform Service Fee Chargeable On </th>
                          <th>Gatoes Platform Service Fee(%)</th>
                          <th>Gatoes Platform Service Fee</th>
                          <th>Merchant Cap Applied</th>
                          <th>Merchant Max. Cap Applied</th>
                          <th>Vendor delivery charges applicable on order(Base+PerKm Charge)</th>
                          <th>Discount on vendor delivery charges</th>

                          {/* <th>Delivery Charges applicable on order (Base+PerKm Charge)</th> */}
                          {/* <th>Discount on Gatoes Platform Service Fee</th> */}
                          <th>Last Mile distance in KM</th>

                          <th>Long Distance applicable on order</th>
                          <th>Long Distance Fee (Vendor Distance Surge)</th>
                          {/* <th>Discount on Long Distance Fee</th> */}
                          <th>Collection Charges</th>
                          {/* <th>Access Charges</th> */}
                          <th>Merchant Cancellation Charges</th>
                          {/* <th>Call Center Service Fees </th> */}

                          <th>Total Gatoes Service fee (without taxes)</th>
                          {/* <th>Delivery fee (sponsored by merchant)</th> */}
                          <th>Taxes on Gatoes fee (Including Cess)</th>
                          <th>Total Gatoes fee (including taxes)</th>

                          {/* <th>Cash Prepayment to Merchant</th> */}
                          {/* <th>Merchant Share of Cancelled Orders</th> */}
                          <th>GST Deduction U/S 9(5)</th>
                          <th>Refund for Customer Complaints</th>
                          {/* <th>Disputed Order Remarks</th> */}
                          <th>Total of Order Level Adjustments</th>


                          <th>Net Payable Amount (before TCS deduction)</th>
                          <th>TCS</th>
                          <th>TDS</th>
                          <th>Net Payable Amount (after tcs and tds deduction)</th>

                          <th>MFR Accurate?</th>
                          <th>MFR Pressed?</th>
                          {/* <th>Cancellation Policy Applied</th> */}
                          {/* <th>Coupon Code Sourced</th> */}
                          <th>Discount Campaign ID</th>
                          {/* <th>Is replicated</th> */}
                          {/* <th>Base order ID</th> */}
                          <th>MRP Items</th>
                          {/* <th>Order Payment Type</th> */}
                          {/* <th>Cancellation time</th> */}
                          <th>Pick Up Status</th>
                          {/* <th>Is Super</th> */}
                          <th>With Promotion?</th>
                          <th>Promotion Type</th>
                          <th>Surge on Merchant</th>
                          <th>Surge on User</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          orderListing && orderListing.orders && orderListing.orders.length > 0 && orderListing.orders.map((obj, index) => (
                            <OrderReportingSlide slideData={obj} index={index} key={obj.orderId} srno={srno} />
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
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

export default OrderReporting;