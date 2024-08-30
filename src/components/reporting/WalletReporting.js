import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {getUserWalletTransactions} from '../../actions/users';
import WalletReportingSlide from './WalletReportingSlide';
import Pagination from "react-js-pagination";
import WalletFilter from './WalletFilter';
import { CSVLink, CSVDownload } from "react-csv";

class MerchantsReporting extends Component {
  constructor(props){
    super(props);
    this.state = {
      detail: {},
      activePage: 1,
      startDownload: null
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.downloadResult = this.downloadResult.bind(this);
  }

  componentDidMount(){
      //this.fetchRecords();
  }

  downloadResult(){
    getUserWalletTransactions({pageNumber : this.state.activePage, ...this.state.filters, isCSV: true}).then((response) => {  
      this.setState({
        startDownload: response
      });
    });
  }


  fetchRecords(page_number=1, filters){
    getUserWalletTransactions({'pageNumber': page_number, ...filters}).then((response) => {
      this.setState({
        detail: response.data.data
      });
    });
  }

  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(1, filters);
  }
 
  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const {detail, activePage, startDownload } = this.state;
    const srno = (activePage-1) * detail.limit;

    if(startDownload !== null){
      this.setState({
        startDownload: null
      });
      
      return <CSVDownload data={startDownload.data} target="_parent" />
    }

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Wallet Transactions</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                <div className="download-block">
                    <button className="btn btn2 download-btn" onClick={this.downloadResult}><i className="material-icons">file_download</i>Download CSV</button>
                </div>
              </div>
            </div>

            <WalletFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th className="manage-content">User Name</th>
                        <th>Amount</th>
                        <th>Reason</th>
                        <th>Type</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        detail && detail.shop && detail.shop.length > 0 && detail.shop.map((obj, index) => (
                          <WalletReportingSlide slideData={obj} index={index}  key={obj.id} srno={srno}  />
                        ))
                      }
                    </tbody>
                  </table>
                  </div>
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={detail.limit ? detail.limit : 20}
                      totalItemsCount={detail.total ? detail.total : 0}
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