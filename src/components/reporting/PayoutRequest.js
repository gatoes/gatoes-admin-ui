import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMerchantPaoutRequest } from '../../actions/shops';
import PayoutRequestSlide from './PayoutRequestSlide';
import Pagination from "react-js-pagination";
import PayoutRequestFilter from './PayoutRequestFilter';
import { CSVLink, CSVDownload } from "react-csv";

class PayoutRequest extends Component {
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
    this.reload = this.reload.bind(this);
    this.downloadResult = this.downloadResult.bind(this);
  }

  downloadResult(){
    getMerchantPaoutRequest({pageNumber : this.state.activePage, ...this.state.filters, isCSV: true}).then((response) => {  
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

  reload(){
    let {filters} = this.state;
    this.fetchRecords(1, filters);
  }

  fetchRecords(pageNumber, filters){
    getMerchantPaoutRequest({pageNumber, ...filters}).then((response) => {
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
    const {merchantListing, activePage, filters, status, startDownload} = this.state;
    var limit = 20;
    var total = 0;
    if(merchantListing && merchantListing.limit){
      var srno = (activePage-1) * merchantListing.limit;
      limit = merchantListing.limit;
      total = merchantListing.totalRecords;
    } else {
      var srno = 0;   
      limit = 20;
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
                <h4 className="heading">Merchant Payout Request</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                <div className="download-block">
                    <button className="btn btn2 download-btn" onClick={this.downloadResult}><i className="material-icons">file_download</i>Download CSV</button>
                </div>
              </div>
            </div>

            <PayoutRequestFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Request ID</th>
                        <th>Request Type</th>
                        <th className="manage-content">Merchant Name</th>
                        <th>Request Date</th>
                        <th>Last Payout Date</th>
                        <th>Paid Amount</th>
                        <th>Balance Amount</th>
                        <th>Request Status</th>
                        <th>Finance Statement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        merchantListing && merchantListing.responseData && merchantListing.responseData.length > 0 && merchantListing.responseData.map((obj, index) => (
                          <PayoutRequestSlide slideData={obj} index={index} key={obj.id} srno={srno} reload={this.reload}  />
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

export default PayoutRequest;