import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { merchantReporting } from '../../actions/shops';
import MerchantReportingSlide from './MerchantReportingSlide';
import Pagination from "react-js-pagination";
import MerchantFilter from './MerchantFilter';
import { CSVLink, CSVDownload } from "react-csv";

class MerchantsReporting extends Component {
  constructor(props){
    super(props);
    this.state = {
      merchantListing: props.merchantListing,
      status: props.status,
      activePage: 1,
      startDownload: null
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.downloadResult = this.downloadResult.bind(this);
  }

  downloadResult(){
    merchantReporting({pageNumber : this.state.activePage, ...this.state.filters, is_csv: true}).then((response) => {  
      console.log(response,"responseMerchant")
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
    merchantReporting({pageNumber, ...filters}).then((response) => {
      this.setState({
        merchantListing : response.data.data
      });
    })
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const {merchantListing, activePage, filters, startDownload, status} = this.state;
    //const {merchantListing} = this.props;
    console.log('merchantListing', merchantListing && merchantListing.shops);
    var limit = 10;
    var total = 0;
    if(merchantListing && merchantListing.limit){
      var srno = (activePage-1) * merchantListing.limit;
      limit = merchantListing.limit;
      total = merchantListing.total;
    } else {
      var srno = 0;   
      limit = 10;
      total = 0
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
                <h4 className="heading">Merchants</h4>
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

            <MerchantFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Unique Id</th>
                        <th className="manage-content">Name</th>
                        <th>Orders Requests</th>
                        <th>Orders Accepted</th>
                        <th>Orders Completeed</th>
                        <th>Orders Cancelled</th>
                        <th>Orders Out of stock</th>
                        <th>Taxes</th>
                        <th>Item Total</th>
                        <th>Total Collection</th>
                        <th>Wallet Used</th>
                        <th>Packaging Charges</th>
                        <th>Platform fee</th>
                        <th>Delivery Charges</th>
                        <th>Merchant delivery charges</th>
                        <th>Discount by Merchant</th>
                        <th>Discount by Admin</th>
                        <th>Restaurant Revenue</th>
                        <th>Commission</th>
                        <th>Accepted Rate(%)</th>
                        <th>Rejected Rate(%)</th>
                        <th>Rider Avg. Rating</th>
                        <th>User Avg. Rating</th>
                        <th className="manage-content">Action</th>
                        <th className="manage-content">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        merchantListing && merchantListing.shops && merchantListing.shops.length > 0 && merchantListing.shops.map((obj, index) => (
                          <MerchantReportingSlide slideData={obj} index={index}  key={obj._id} srno={srno} startDate={merchantListing.startDate} endDate={merchantListing.endDate} />
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

export default MerchantsReporting;