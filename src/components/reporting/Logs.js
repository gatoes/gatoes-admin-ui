import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logsReporting } from '../../actions/users';
import LogsSlide from './LogsSlide';
import Pagination from "react-js-pagination";
import LogsFilter from './LogsFilter';
import { CSVLink, CSVDownload } from "react-csv";

class Logs extends Component {
  constructor(props){
    super(props);
    this.state = {
      logsListing: props.logsListing,
      status: props.status,
      activePage: 1,
      startDownload: null
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.downloadResult = this.downloadResult.bind(this);
  }

  downloadResult(){
    logsReporting({pageNumber : this.state.activePage, ...this.state.filters, is_csv: true}).then((response) => {  
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
    logsReporting({pageNumber, ...filters}).then((response) => {
      this.setState({
        logsListing : response.data.data
      });
    })
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const {logsListing, activePage, filters, startDownload} = this.state;
    var limit = 10;
    var total = 0;
    if(logsListing && logsListing.limit){
      var srno = (activePage-1) * logsListing.limit;
      limit = logsListing.limit;
      total = logsListing.total;
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
                <h4 className="heading">Logs</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                <div className="download-block">
                    <button className="btn btn2 download-btn" onClick={this.downloadResult}><i className="material-icons">file_download</i>Download CSV</button>
                </div>
              </div>
            </div>

            <LogsFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Type</th>
                        <th>Time Stamp</th>
                        <th>Device</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        logsListing && logsListing.riderLogs && logsListing.riderLogs.length > 0 && logsListing.riderLogs.map((obj, index) => (
                          <LogsSlide slideData={obj} index={index} key={obj.id} srno={srno} />
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

export default Logs;