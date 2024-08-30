import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { customerListing, getCustomerDeactivatedAccount, userListingSuccess } from '../../actions/users';
import Pagination from "react-js-pagination";
import { CSVLink, CSVDownload } from "react-csv";
import ManageStatusSlide from './ManageStatusSlide';

class ManageStatus extends Component {
  constructor(props){
    super(props);
    this.state = {
      userListing: props.userListing,
      listData: [],
      activePage: 1,
      startDownload: null
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.downloadResult = this.downloadResult.bind(this);
  }

  downloadResult(){
    getCustomerDeactivatedAccount({pageNumber : this.state.activePage, is_csv: true}).then((response) => {  
      this.setState({
        startDownload: response
      });
    });
  }

 
 
  componentDidMount(){
    this.fetchRecords(1)
  }

  fetchRecords(pageNumber){
    getCustomerDeactivatedAccount({pageNumber}).then((response) => {
      this.props.userListingSuccess(response.data.data);

      // this.setState({
      //   userListing: response.data.data.user,
      //   listData: response.data.data,
      // })

    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'userlist'){
      this.setState({
        userListing: nextProps.userListing,
        status: nextProps.status
      });
    }
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber);
  }

  render() {
    const {userListing, activePage, listData, startDownload,status} = this.state;
    //console.log('customerListing', customerListing);
    var limit = 10;
    var total = 0;
    if(userListing && userListing.limit){
      var srno = (activePage-1) * userListing.limit;
      limit = userListing.limit;
      total = userListing.total;
    } else {
      var srno = 0;   
      limit = 10;
      total = 0
    }
    

    if(startDownload !== null){
      this.setState({
        startDownload: null
      });
      console.log(startDownload.data, "starDonwload")
      return <CSVDownload data={startDownload.data} target="_parent" />
    }

    // console.log(userListing,listData,status,"userListing")

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Manage Users Status</h4>
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
                        {/* <th>Total Orders</th> */}
                        <th className="manage-content">Joining Date</th>
                        {/* <th className="manage-content">Status</th> */}
                        <th>Deleted Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(userListing).length > 0 && userListing.user.length > 0 && userListing.user.map((obj, index) => (
                          <ManageStatusSlide slideData={obj} index={index} key={obj.unique_id} srno={srno} />
                        ))
                      }
                     
                      {Object.values(userListing).length == 0 || userListing.user.length == 0 && (
                      <tr>
                          <td colSpan="9">
                          <div className='norecord_wrapper'>
                            <h4 className='text-notfound'>No record found</h4>
                          </div>
                          </td>
                      </tr>
                      )}
                   
                     
                     
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
  console.log('state.User.user_list', state.User.user_list);
  return {
    userListing: {...state.User.user_list},
    status: state.User.status,
    compName: state.User.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   userListingSuccess: (payload) => {
    console.log(payload, "Heypayload")
      dispatch(userListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManageStatus);