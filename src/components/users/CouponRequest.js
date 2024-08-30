import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { customerListing, getCustomerDeactivatedAccount, userListingSuccess } from '../../actions/users';
import Pagination from "react-js-pagination";
import { CSVLink, CSVDownload } from "react-csv";
import CouponRequestSlide from './CouponRequestSlide';
import CouponFilter from './CouponFilter';
import { couponRequestListSuccess, promoCodeList } from '../../actions/newpromocodes';

class CouponRequest extends Component {
  constructor(props){
    super(props);
    this.state = {
      dealsListing: props.dealsListing,
      listData: [],
      activePage: 1,
      startDownload: null,
      filters: {}
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    // this.downloadResult = this.downloadResult.bind(this);
    this.isUpdateAction = this.isUpdateAction.bind(this);
    this.reloadOrder = this.reloadOrder.bind(this);
    this.fetchRecords = this.fetchRecords.bind(this);

    
  }

  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(1, filters);
  }
 
  isUpdateAction(){
    this.fetchRecords(1)
  }
  reloadOrder(page){
    this.fetchRecords(page);
  }
 
 
  componentDidMount(){
    this.fetchRecords(1)
  }

  fetchRecords(pageNumber = 1, filters = this.state.filters){
    const { location } = this.props;
    const currentPath = location.pathname;
    console.log(filters,"filters")
    let params = { pageNumber, ...filters };

    if(currentPath.includes("couponrequests")){
      params.isApprovalRequired = 1;
    } else if(currentPath.includes("broadcastrequests")){
      params.isBroadcast = true;
    } else {
      params.isApprovalRequired = 1;
      params.isDeal = 1;
    }
    promoCodeList(params).then((response) => {
      this.props.couponRequestListSuccess(response.data.responseData);
    })
  


  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'dealsList'){
      this.setState({
        dealsListing: nextProps.dealsListing,
        status: nextProps.status
      });
    }
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }


  render() {
    const {dealsListing, activePage, listData, startDownload,status} = this.state;
    const { location } = this.props;
    const currentPath = location.pathname;
    console.log('dealsListing', dealsListing);
    var limit = 20;
    var total = 0;
    var totalRecords = 0
    if(dealsListing && dealsListing.perPage){
      var srno = (activePage-1) * dealsListing.perPage;
      limit = dealsListing.perPage;
      total = dealsListing.totalPages;
      totalRecords = dealsListing.totalRecords;
    } else {
      var srno = 0;   
      limit = 20;
      total = 0
    }
    

    
    // console.log(userListing,listData,status,"userListing")

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Requests</h4>
              </div>
              {/* <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  localStorage.getItem('hasAllAccess') == 'true'
                  ?
                  <div className="download-block">
                      <button className="btn btn2 download-btn" onClick={this.downloadResult}><i className="material-icons">file_download</i>Download CSV</button>
                  </div>
                  :
                  null
                }
              </div> */}
            </div>
            {!location.pathname.includes("broadcastrequests")  && (
            <CouponFilter getFilterFields={this.getFilterFields} />
          )}
            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Title</th>
                        {currentPath.includes("couponrequests") && (
                          <>
                        <th>Type</th>
                        <th>Restaurant Name</th>
                        </>
                        )
                        }

                        <th>Discount Type</th>
                        {!currentPath.includes("broadcastrequests") && (
                        <th>Status</th>)}
                        {/* <th className="manage-content">Contact No.</th> */}
                        {/* <th>Total Orders</th> */}
                        <th>Start Date</th>
                        <th>End Date</th>
                        {/* <th>Time</th> */}
                        {/* <th>Time</th> */}
                        {!currentPath.includes("broadcastrequests") && (
                        <th>Action</th>)}
                      </tr>
                    </thead>
                    <tbody>
                  

                      { dealsListing && dealsListing.data && dealsListing.data.length > 0 && dealsListing.data.map((obj, index) => (

                          <CouponRequestSlide  reloadOrder={this.reloadOrder} slideData={obj} index={index} key={obj.id} srno={srno} isUpdate={this.isUpdateAction} location={location}/>
                        ))
                      }
                     
                      {dealsListing.length == 0 || dealsListing.data.length == 0 && (
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
                      totalItemsCount={totalRecords ? totalRecords : 0}
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
  console.log('stateDeals', state);
  return {
    dealsListing:state.NewPromoCode.dealsList,
    status: state.NewPromoCode.status,
    compName: state.NewPromoCode.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    couponRequestListSuccess: (payload) => {
    console.log(payload, "Heypayload")
      dispatch(couponRequestListSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(CouponRequest);