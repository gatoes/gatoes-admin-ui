import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { customerReporting } from '../../actions/users';
import CustomerReportingSlide from './CustomerReportingSlide';
import Pagination from "react-js-pagination";
import CustomerFilter from './CustomerFilter';
import { CSVLink, CSVDownload } from "react-csv";

class CustomerReporting extends Component {
  constructor(props){
    super(props);
    this.state = {
      customerListing: props.customerListing,
      status: props.status,
      activePage: 1,
      startDownload: null
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.downloadResult = this.downloadResult.bind(this);
  }

  downloadResult(){
    customerReporting({pageNumber : this.state.activePage, ...this.state.filters, is_csv: true}).then((response) => {  
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
    customerReporting({pageNumber, ...filters}).then((response) => {
      this.setState({
        customerListing : response.data.data
      });
    })
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const {customerListing, activePage, filters, startDownload} = this.state;
    var limit = 10;
    var total = 0;
    if(customerListing && customerListing.limit){
      var srno = (activePage-1) * customerListing.limit;
      limit = customerListing.limit;
      total = customerListing.total;
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
                <h4 className="heading">Users</h4>
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

            <CustomerFilter getFilterFields={this.getFilterFields} />

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
                        <th>Email</th>
                        <th>Contact No.</th>
                        <th>Avg. Rating</th>
                        <th>Total Orders</th>
                        <th>Completed</th>
                        <th>Cancelled</th>
                        <th>Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        customerListing && customerListing.users && customerListing.users.length > 0 && customerListing.users.map((obj, index) => (
                          <CustomerReportingSlide slideData={obj} index={index} key={obj._id} srno={srno} />
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

export default CustomerReporting;