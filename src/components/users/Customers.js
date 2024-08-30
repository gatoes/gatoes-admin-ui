import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { customerListing, customerListingSuccess } from '../../actions/users';
import CustomersSlide from './CustomersSlide';
import Pagination from "react-js-pagination";
import CustomerFilter from './CustomerFilter';
import { CSVLink, CSVDownload } from "react-csv";

class Customers extends Component {
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
    customerListing({pageNumber : this.state.activePage, ...this.state.filters, is_csv: true}).then((response) => {  
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
    customerListing({pageNumber, ...filters}).then((response) => {
      this.props.customerListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'customerlist'){
      this.setState({
        customerListing: nextProps.customerListing,
        status: nextProps.status
      });
    }
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const {customerListing, activePage, filters, startDownload} = this.state;
    //console.log('customerListing', customerListing);
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
                        <th className="manage-content">Contact No.</th>
                        <th className="manage-content">Refferal Code</th>
                        <th className="manage-content">Refferal Use</th>
                        <th>Total Orders</th>
                        <th className="manage-content">Joining Date</th>
                        <th>Action</th>
                        <th>Wallet Balance</th>
                        <th>Manage Wallet</th>
                        <th>Transactions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        customerListing && customerListing.user && customerListing.user.length > 0 && customerListing.user.map((obj, index) => (
                          <CustomersSlide slideData={obj} index={index} key={obj.unique_id} srno={srno} />
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

const mapStatesToProps = (state, ownProps) => {
  console.log('state.User.customer_list', state.User.customer_list);
  return {
    customerListing: {...state.User.customer_list},
    status: state.User.status,
    compName: state.User.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    customerListingSuccess: (payload) => {
      dispatch(customerListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(Customers);