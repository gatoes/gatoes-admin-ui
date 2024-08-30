import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { superShopListing, superShopListingSuccess } from '../../actions/shops';
import ManageSuperMerchantSlide from './ManageSuperMerchantSlide';
import Pagination from "react-js-pagination";
import {getAclChecks} from '../../utilities';

class ManageSuperMerchant extends Component {
  constructor(props){
    super(props);
    this.state = {
      superShopListing: props.superShopListing,
      activePage: 1,
      status: props.status,
      lang: window.localStorage.contentlanguage
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  
  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber, filters){
    superShopListing({pageNumber}).then((response) => {
      this.props.superShopListingSuccess(response.data.data, pageNumber);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.state.status != nextProps.status && nextProps.compName == 'supershoplist'){
      this.setState({
        superShopListing: nextProps.superShopListing,
        status: nextProps.status
      });
    }
  }

  handlePageChange(activePage) {
    //console.log(`active page is ${activePage}`);
    this.setState({
      activePage
    })
    this.fetchRecords(activePage);
  }


  render() {
    const {superShopListing, activePage, lang} = this.state;
    let listingLimit = superShopListing && superShopListing.limit ? superShopListing.limit : 0;
    let srno = (activePage-1) * listingLimit;

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Super Merchants</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('SHOPS_ADD_EDIT') && lang == 'en'
                  ?
                  <Link className="btn green-btn" to="/dashboard/addsupermerchant"><span className="icon-ic_plus"></span>Add New</Link>
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
                        <th>Owner</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Alternate Contact</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      {
                        superShopListing  && superShopListing.merchant && superShopListing.merchant.length > 0 && superShopListing.merchant.map((obj, index) => (
                          <ManageSuperMerchantSlide slideData={obj} index={index} key={obj.id} srno={srno} />
                        ))
                      }
                    </tbody>
                   
                  </table>
                  <div className="pagination">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={superShopListing.limit}
                        totalItemsCount={superShopListing.total ? superShopListing.total : 0}
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
      </div>
    );
  }
}

const mapStatesToProps = (state, ownProps) => {
  return {
    superShopListing: {...state.Shop.super_shop_list},
    status: state.Shop.status,
    compName: state.Shop.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    superShopListingSuccess: (payload, activePage) => {
      dispatch(superShopListingSuccess(payload, activePage));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManageSuperMerchant);


