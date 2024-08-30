import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { shopListing, shopListingSuccess, getRestaurantCsvDownload } from '../../actions/shops';
import ShopSlide from './ShopSlide';
import Pagination from "react-js-pagination";
import ShopFilter from './ShopFilter';
import { CSVLink, CSVDownload } from "react-csv";
import {getAclChecks} from '../../utilities';

class Listing extends Component {
  constructor(props){
    super(props);
    this.state = {
      shopListing: props.shopListing,
      limit: props.limit,
      total: props.total,
      activePage: props.activePage,
      status: props.status,
      totalItems:0,
      filter: {},
      startDownload: null,
      lang: window.localStorage.contentlanguage
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getFilterFields = this.getFilterFields.bind(this);
    this.downloadResult = this.downloadResult.bind(this);
    this.fetchRecords = this.fetchRecords.bind(this);
  }

  downloadResult(){
    const {filters} = this.state;
    getRestaurantCsvDownload({...filters}).then((response) => {  
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
    shopListing({pageNumber, ...filters}).then((response) => {
      this.props.shopListingSuccess(response.data.data, pageNumber);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.state.status != nextProps.status && nextProps.compName == 'shoplist'){
      this.setState({
        shopListing: nextProps.shopListing,
        limit: nextProps.limit,
        total: nextProps.total,
        activePage: nextProps.activePage,
        status: nextProps.status
      });
    }
  }

  handlePageChange(activePage) {
    //console.log(`active page is ${activePage}`);
    this.fetchRecords(activePage, this.state.filters);
  }


  render() {
    const {shopListing, activePage, limit, total, startDownload, lang} = this.state;
    const srno = (activePage - 1) * limit
    console.log('shopListing', shopListing);

    if(startDownload !== null){
      this.setState({
        startDownload: null
      });
      return <CSVDownload data={startDownload.data} target="_parent" />
    }

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Restaurants Listing</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('SHOPS_ADD_EDIT') && lang == 'en'
                  ?
                  <Link className="btn green-btn" to="/dashboard/addnewshop"><span className="icon-ic_plus"></span>Add New</Link>
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
                
                {
                  getAclChecks('SHOPS_ADD_EDIT')
                  ?
                  <Link className="btn green-btn" to="/dashboard/managesupermerchant">Manage Super Merchant</Link>
                  :
                  null
                }
              </div>
            </div>
               
            <ShopFilter getFilterFields={this.getFilterFields} />

            <div className="row shop-info">
              <div className="col-sm-12">
                <span><label>Active : </label>{shopListing && shopListing.totalShops && shopListing.totalShops.active}</span>
                <span><label>Inactive :</label> {shopListing && shopListing.totalShops && shopListing.totalShops.inactive}</span>
                <span><label>Out of service : </label> {shopListing && shopListing.totalShops && shopListing.totalShops.outOfService}</span>
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
                        <th className="manage-content">Restaurant Name</th>
                        <th>Assigned Plan</th>
                        <th>Manage Plan</th>
                        <th>Account Manager</th>
                        <th>Owner</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th className="manage-content">Address</th>
                        <th>Zone</th>
                        <th>Region</th>
                        
                        <th>Avg. Rating</th>
                        <th>Menu</th>
                        <th>Activation Date</th>
                        <th>Online/Offline Status</th>
                        {
                          getAclChecks('MARK_ORDER_UNASSIGN')
                          ?
                          <>
                            <th>Manage Transaction</th>
                            <th>View Transaction</th>
                          </>
                          :
                          null
                        }

                        <th>Status</th>
                        <th>QRcode</th>
                        <th>Action</th>

                      </tr>
                    </thead>
                    <tbody>
                      {
                        shopListing  && shopListing.shop && shopListing.shop.length > 0 && shopListing.shop.map((obj, index) => (
                          <ShopSlide activePage={activePage} slideData={obj} index={index} key={obj.shopId} srno={srno} fetchRecords={this.fetchRecords} />
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
  return {
    shopListing: {...state.Shop.shop_list},
    limit: state.Shop.shop_list.limit,
    total: state.Shop.shop_list.total,
    activePage: state.Shop.activePage,
    status: state.Shop.status,
    compName: state.Shop.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    shopListingSuccess: (payload, activePage) => {
      dispatch(shopListingSuccess(payload, activePage));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(Listing);


