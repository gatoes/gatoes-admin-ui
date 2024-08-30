import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMerchantEarning } from '../../actions/shops';
import MerchantsFinanceReportingSlide from './MerchantsFinanceReportingSlide';
import Pagination from "react-js-pagination";
import MerchantFinanceFilter from './MerchantFinanceFilter';
import { CSVLink, CSVDownload } from "react-csv";

class MerchantsFinanceReporting extends Component {
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
    getMerchantEarning({pageNumber : this.state.activePage, ...this.state.filters, is_csv: true}).then((response) => {  
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
    getMerchantEarning({pageNumber, ...filters}).then((response) => {
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
                <h4 className="heading">Merchants finance reporting</h4>
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

            <MerchantFinanceFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th className="manage-content">Merchant Name</th>
                        <th>Mark Deposit</th>
                        <th>Total Business (Subtotal)</th>
                        <th>Total Amount Deposited</th>
                        <th>Total Amount Refunded(Online+Wallet)</th>
                        <th>Balance Amount (SubTotal- Deposited)</th>
                        <th>Deposit Statement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        merchantListing && merchantListing.shops && merchantListing.shops.length > 0 && merchantListing.shops.map((obj, index) => (
                          <MerchantsFinanceReportingSlide slideData={obj} index={index} key={obj.shopId} srno={srno} reload={this.reload}  />
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

export default MerchantsFinanceReporting;