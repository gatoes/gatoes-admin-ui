import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import CouponFilter from './CouponFilter';
import { getPromotionCategoryUsingMicroservice, promotionCatListingSuccess, promotionListingSuccess, promotionListingUsingMicroservice } from '../../actions/newpromotion';
import ListingSlide from './ListingSlide';
import PromotionCatListingSlide from './PromotionCatListingSlide';

class PromotionCatListing extends Component {
  constructor(props){
    super(props);
    this.state = {
      promotionCategoryListing: props.promotionCategoryList,
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

  fetchRecords(){
    getPromotionCategoryUsingMicroservice().then((response) => {
      console.log(response.data.categories, "999PromotionCategory");
      this.setState({
        promotionCategoryListing:response.data.categories
      })
      this.props.promotionCatListingSuccess(response.data.categories);
    });
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps);
    if (this.props.status !== nextProps.status && nextProps.compName === 'promotionCategoryList') {
      this.setState({
        promotionCategoryListing: nextProps.promotionCategoryListing,
        status: nextProps.status
      });
    }
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber);
  }

  render() {
    const { promotionCategoryListing, activePage } = this.state;
    const limit = 20;
    // const total = promotionListing.pagination ? promotionListing.pagination.totalPages : 0;
    const srno = (1 - 1) * limit;
    console.log(promotionCategoryListing,"promotionListing666")
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Promotions Category</h4>
              </div>
              {/* <div className="col-sm-7 tr-block text-right align-self-center">
                <a className="btn green-btn" href="/dashboard/promotioncategory/add"><span className="icon-ic_plus"></span>Add</a>
              </div> */}
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
                          <th>Title</th>
                          <th>Code</th>
                         
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {promotionCategoryListing && promotionCategoryListing.length > 0 ? (
                          promotionCategoryListing.map((obj, index) => (
                            <PromotionCatListingSlide slideData={obj} index={index} key={obj.id} srno={srno} isUpdate={this.isUpdateAction} />
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
                  {/* <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={limit}
                      totalItemsCount={total || 0}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div> */}
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
  console.log(state.NewPromotionCode.promotionCategoryList, "state.NewPromotionCode.promotionCategoryList")
  return {
    promotionCategoryListing: state.NewPromotionCode.promotionCategoryList,
    status: state.NewPromotionCode.status,
    compName: state.NewPromotionCode.compName
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    promotionCatListingSuccess: (payload) => {
      dispatch(promotionCatListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(PromotionCatListing);
