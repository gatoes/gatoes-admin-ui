import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { riderReporting } from '../../actions/deliveryagent';
import RidersReportingSlide from './RidersReportingSlide';
import Pagination from "react-js-pagination";
import RiderFilter from './RiderFilter';
import { CSVLink, CSVDownload } from "react-csv";

class RidersReporting extends Component {
  constructor(props){
    super(props);
    this.state = {
      riderListing: props.riderListing,
      status: props.status,
      activePage: 1,
      startDownload: null
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.downloadResult = this.downloadResult.bind(this);
  }

  downloadResult(){
    riderReporting({pageNumber : this.state.activePage, ...this.state.filters, is_csv: true}).then((response) => {  
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
    riderReporting({pageNumber, ...filters}).then((response) => {
      this.setState({
        riderListing : response.data.data
      });
    })
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const {riderListing, activePage, filters, startDownload} = this.state;
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
                <h4 className="heading">Riders</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                <div className="download-block">
                    <button className="btn btn2 download-btn" onClick={this.downloadResult}><i className="material-icons">file_download</i>Download CSV</button>
                </div>
              </div>
            </div>

            <RiderFilter getFilterFields={this.getFilterFields} />

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
                        <th>Requests</th>
                        <th>Accepted</th>
                        <th>Order Complete</th>
                        <th>Auto Accept</th>
                        <th>Accepting Rate(%)</th>
                        <th>Rating Percentage(%)</th>
                        <th>Avg. Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        riderListing && riderListing.shops && riderListing.shops.length > 0 && riderListing.shops.map((obj, index) => (
                          <RidersReportingSlide slideData={obj} index={index} key={obj.driverId} srno={srno} startDate={riderListing.startDate} endDate={riderListing.endDate} />
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

export default RidersReporting;