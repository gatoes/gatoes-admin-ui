import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import CouponFilter from './CouponFilter';
import { promotionListingSuccess, promotionListingUsingMicroservice } from '../../actions/newpromotion';
import ListingSlide from './ListingSlide';

class Listing extends Component {
  constructor(props){
    super(props);
    this.state = {
      promotionListing: props.promotionListing || { promotions: [], pagination: {} },
      listData: [],
      activePage: 1,
      startDownload: null,
      filters: {},
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.isUpdateAction = this.isUpdateAction.bind(this);
  }

  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(1);
  }

  isUpdateAction(){
    this.fetchRecords(1);
  }

  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber){
    promotionListingUsingMicroservice({pageNumber, ...this.state.filters}).then((response) => {
      console.log(response.data.responseData, "PromotionList");
      this.setState({
        promotionListing:response.data.responseData
      })
      this.props.promotionListingSuccess(response.data.responseData);
    });
  }

  componentWillReceiveProps(nextProps){
    if (this.props.status !== nextProps.status && nextProps.compName === 'promotionList') {
      this.setState({
        promotionListing: nextProps.promotionListing,
        status: nextProps.status
      });
    }
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber);
  }

  render() {
    const { promotionListing, activePage } = this.state;
    const limit = 20;
    const total = promotionListing.pagination ? promotionListing.pagination.totalPages : 1;
    var totalRecords = promotionListing.totalRecords
    const srno = (activePage - 1) * limit;
    console.log(promotionListing,"promotionListing")
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Promotion Settings</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                <a className="btn green-btn" href="/dashboard/addpromotionsetting"><span className="icon-ic_plus"></span>Add </a>
              </div>
            </div>
            {/* <CouponFilter getFilterFields={this.getFilterFields} /> */}
            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Sr.no.</th>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Per Click Charges</th>
                          <th>Base Price</th>
                          <th>Minimum Days</th>
                          {/* <th>Date</th>
                          <th>Time</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {promotionListing.promotions && promotionListing.promotions.length > 0 ? (
                          promotionListing.promotions.map((obj, index) => (
                            <ListingSlide slideData={obj} index={index} key={obj.id} srno={srno} isUpdate={this.isUpdateAction} />
                          ))
                        ) : (
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
                      totalItemsCount={totalRecords || 0}
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
    promotionListing: state.NewPromotionCode.promotionList,
    status: state.NewPromotionCode.status,
    compName: state.NewPromotionCode.compName
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    promotionListingSuccess: (payload) => {
      dispatch(promotionListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(Listing);
