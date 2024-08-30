import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import DealSlide from './DealSlide';
import { promoCodeList, promoCodeListSuccess } from '../../actions/newpromocodes';
import { Link, withRouter } from 'react-router-dom';

class DealsListing extends Component {
  constructor(props){
    super(props);
    this.state = {
      promoCodeListing: props.promoCodeListing,
      status: props.status,
    };
    this.fetchRecords = this.fetchRecords.bind(this);
  }

 
  componentDidMount(){
    this.fetchRecords(1);
  }

 
  fetchRecords() {
    promoCodeList({isDeal:1,merchantShopId:this.props.match.params.index}).then((response) => {
      this.props.promoCodeListSuccess(response.data.responseData.data);
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (
      this.props.status != nextProps.status &&
      nextProps.compName == "promocodeList"
    ) {
      this.setState({
        promoCodeListing: nextProps.promoCodeListing,
        status: nextProps.status,
      });
    }
  }

 


  render() {
    const {promoCodeListing} = this.state;


    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Deals </h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
               
               <Link className="btn green-btn" to="/dashboard/deals"><span className="icon-ic_plus"></span>Back</Link>
             
           </div>
            </div>
               
            {/* <ShopFilter getFilterFields={this.getFilterFields} /> */}
            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                  <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Created By</th>
                        <th>Discount Type</th>
                        <th>Total Used</th>
                        <th>Discount</th>
                        <th>Rule Name</th>
                        {/* <th>Coupon Type</th> */}
                        {/* <th>Coupon Code</th> */}

                        <th>Start Date</th>
                        <th>End Date</th>
                        {/* <th>Time</th> */}
                        <th>Status</th>
                        {/* <th>Show on Restaurant </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        promoCodeListing  && promoCodeListing.length > 0 && promoCodeListing.map((obj, index) => (
                          <DealSlide  key={obj.id}
                          slideData={obj}  index={index}
                          />
                        ))
                      }
                      {promoCodeListing.length == 0  && (
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
  console.log(state.NewPromoCode, "promocodeList");

  return {
    promoCodeListing: state.NewPromoCode.promocodeList,
    status: state.NewPromoCode.status,
    compName: state.NewPromoCode.compName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    promoCodeListSuccess: (payload) => {
      dispatch(promoCodeListSuccess(payload));
    },
  };
};

DealsListing = withRouter(DealsListing);

export default connect(mapStatesToProps, mapDispatchToProps)(DealsListing);


