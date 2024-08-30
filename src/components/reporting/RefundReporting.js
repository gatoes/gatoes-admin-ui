import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {refundListing} from '../../actions/orders';
import RefundReportingSlide from './RefundReportingSlide';
import Pagination from "react-js-pagination";
import RefundFilter from './RefundFilter';
import { CSVLink, CSVDownload } from "react-csv";

class RefundReporting extends Component {
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

  downloadResult(){
    refundListing({...this.state.filters, is_csv: true}).then((response) => {  
      this.setState({
        startDownload: response
      });
    });
  }

  componentDidMount(){
    //this.fetchRecords(1);
  }

  fetchRecords(page_number=1, filters){
    refundListing({'pageNumber': page_number, ...filters}).then((response) => {
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
                <h4 className="heading">Refund Transactions</h4>
              </div>
              
              <div className="col-sm-7 tr-block text-right align-self-center">
                <div className="download-block">
                    <button className="btn btn2 download-btn" onClick={this.downloadResult}><i className="material-icons">file_download</i>Download CSV</button>
                </div>
              </div>
            
            </div>
            
            <RefundFilter getFilterFields={this.getFilterFields} />
           
            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th className="manage-content">Shop Name</th>
                        <th>Order Id</th>
                        <th>Amount</th>
                        <th>Refunded By</th>
                        <th>Reason</th>
                        <th>Type</th>
                        <th>Who Bear Cost</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        detail && detail.orders && detail.orders.length > 0 && detail.orders.map((obj, index) => (
                          <RefundReportingSlide slideData={obj} index={index}  key={obj._id} srno={srno}  />
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

export default RefundReporting;