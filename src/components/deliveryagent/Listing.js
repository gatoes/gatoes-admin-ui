import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { driverListing, driverListingSuccess, getRiderCsvDownload } from '../../actions/deliveryagent';
import DriverSlide from './DriverSlide';
import Pagination from "react-js-pagination";
import DeliveryAgentFilter from './DeliveryAgentFilter';
import { CSVLink, CSVDownload } from "react-csv";
import {getAclChecks} from '../../utilities';

class Listing extends Component {
  constructor(props){
    super(props);
    this.state = {
      driverListing: props.driverListing,
      status: props.status,
      activePage: 1,
      totalDrivers:0,
      filter: {},
      startDownload: null,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.downloadResult = this.downloadResult.bind(this);
  }

  downloadResult(){
    getRiderCsvDownload().then((response) => {  
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
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber, filters){
    driverListing({pageNumber, ...filters}).then((response) => {
      this.props.driverListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps);
    if(this.props.status != nextProps.status && nextProps.compName == 'driverlist'){
      this.setState({
        driverListing: nextProps.driverListing,
        status: nextProps.status
      });
    }
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const {driverListing, activePage, startDownload, lang} = this.state;
    const srno = (activePage-1) * driverListing.limit;
    //console.log('111', driverListing);
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
                <h4 className="heading">Rider Listing</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('RIDERS_ADD_EDIT') && lang == 'en'
                  ?
                  <Link className="btn green-btn" to="/dashboard/addnewdeliveryagent"><span className="icon-ic_plus"></span>Add New</Link>
                  :
                  null
                }
                {
                  localStorage.getItem('hasAllAccess') == 'true'
                  ?
                  <div className="download-block">
                      <button className="btn btn2 download-btn" onClick={this.downloadResult}><i className="material-icons">file_download</i>Download CSV</button>
                  </div>
                  :
                  null
                }
                <Link className="btn green-btn" to="/dashboard/ridergeomaplocation">Riders Map View</Link>
              </div>
            </div>

            <DeliveryAgentFilter getFilterFields={this.getFilterFields} />

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
                        <th>Type</th>
                        <th>Work Status</th>
                        <th>Online/Offline Status</th>
                        <th>Vehicle Detail</th>
                        <th>Phone No.</th>
                        <th>Zone</th>
                        <th>Delivery Region</th>
                        
                        <th>Cash Transaction</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        driverListing && driverListing.agent && driverListing.agent.length > 0 && driverListing.agent.map((obj, index) => (
                          <DriverSlide slideData={obj} index={index} key={obj.driverId} srno={srno} />
                        ))
                      }
                    </tbody>
                  </table>
                  </div>
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={driverListing.limit}
                      totalItemsCount={driverListing.total ? driverListing.total : 0}
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

const mapStatesToProps = (state, ownProps) => {
  return {
    driverListing: {...state.DeliveryAgent.driver_list},
    status: state.DeliveryAgent.status,
    compName: state.DeliveryAgent.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    driverListingSuccess: (payload) => {
      dispatch(driverListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(Listing);

