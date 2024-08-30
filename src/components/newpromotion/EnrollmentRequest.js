import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { enrollmentListSuccess, promotionEnrollmentListingUsingMicroservice } from '../../actions/newpromocodes';
import EnrollmentRequestSlide from './EnrollmentRequestSlide';

class EnrollmentRequest extends Component {
  constructor(props){
    super(props);
    this.state = {
      enrollmentListing: props.enrollmentListing || { enrollments: [], totalPages: 0, perPage: 20 },
      activePage: 1,
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.isUpdateAction = this.isUpdateAction.bind(this);
    this.reloadOrder = this.reloadOrder.bind(this);

  }

  getFilterFields(filters){
    this.setState({ filters });
    this.fetchRecords(1);
  }
 
  isUpdateAction(){
    this.fetchRecords(1)
    console.log('isUpdateAction');
  }

  reloadOrder(page){
    this.fetchRecords(page);
  }
 
  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber){
    promotionEnrollmentListingUsingMicroservice({ pageNumber }).then((response) => {
      console.log(response.data, "promotionEnrollmentListingUsingMicroservice")
      this.props.enrollmentListSuccess(response.data.responseData);
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status !== nextProps.status && nextProps.compName === 'enrollmentList'){
      this.setState({
        enrollmentListing: nextProps.enrollmentListing,
        status: nextProps.status
      });
    }
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.fetchRecords(pageNumber);
  }

  render() {
    const { enrollmentListing, activePage } = this.state;
    const { enrollments, totalPages, perPage } = enrollmentListing;
    const srno = (activePage - 1) * perPage;

    console.log(enrollmentListing,"enrollmentListing")
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Enrollment Requests</h4>
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
                          <th>Restaurant Name</th>
                          <th>Name</th>
                          <th>Budget</th>
                          {/* <th>Restaurent Name</th>
                          <th>Discount Type</th> */}
                          <th>Status</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrollments && enrollments.length > 0 ? (
                          enrollments.map((obj, index) => (
                            <EnrollmentRequestSlide reloadOrder={this.reloadOrder} slideData={obj} index={index} key={obj.id} srno={srno} isUpdate={this.isUpdateAction} />
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
                      activePage={activePage}
                      itemsCountPerPage={perPage}
                      totalItemsCount={totalPages * perPage}
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

const mapStateToProps = (state) => {
  return {
    enrollmentListing: state.NewPromoCode.enrollmentList,
    status: state.NewPromoCode.status,
    compName: state.NewPromoCode.compName,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    enrollmentListSuccess: (payload) => {
      dispatch(enrollmentListSuccess(payload));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnrollmentRequest);
