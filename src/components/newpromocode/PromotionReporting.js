import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { merchantReporting } from '../../actions/shops';
import Pagination from "react-js-pagination";
import { CSVLink, CSVDownload } from "react-csv";
import PromotionReportingSlide from './PromotionReportingSlide';
import ReportingFilter from './ReportingFilter';
import { promotionReporting } from '../../actions/newpromotion';

class PromotionReporting extends Component {
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
    promotionReporting({pageNumber : this.state.activePage, ...this.state.filters, is_csv: true}).then((response) => { 
      console.log(response,"responseDownload") 
      this.setState({
        startDownload: response.data
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
    promotionReporting({pageNumber, ...filters}).then((response) => {

      console.log(response.data.responseData,"responsePremotionReport");
      this.setState({
        merchantListing : response.data.responseData
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
    console.log('merchantListing', merchantListing);
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
                <h4 className="heading">Reporting</h4>
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

            <ReportingFilter getFilterFields={this.getFilterFields} />

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
                        <th>Banner Click Count</th>
                        <th>Banner Click Charges</th>
                        <th>Banner Base Price</th>
                        <th>Ads Click Count</th>
                        <th>Ads Click Charges</th>
                        <th>Ads Base Charges</th>
                        <th>Curative Click Count</th>
                        <th>Curative Click Charges</th>
                        <th>Curative Base Price</th>
                        <th>Total Click Count</th>
                        <th>Total Click Charges</th>
                        <th>Total Base Price</th>
                        <th>Total Merchant Payable</th>
                        {/* <th className="manage-content">Action</th> */}
                        {/* <th className="manage-content">Invoice</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        merchantListing && merchantListing.enrollments && merchantListing.enrollments.length > 0 && merchantListing.enrollments.map((obj, index) => (
                          <PromotionReportingSlide slideData={obj} index={index}  key={obj._id} srno={srno} startDate={merchantListing.startDate} endDate={merchantListing.endDate} />
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

export default PromotionReporting;