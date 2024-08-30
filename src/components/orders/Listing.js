import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { orderListing, orderListingSuccess } from '../../actions/orders';
import OrderListSlide from './OrderListSlide';
import Pagination from "react-js-pagination";
import OrdersFilter from './OrdersFilter';

class Listing extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderListing: props.orderListing,
      status: props.status,
      activePage: 1
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.reloadOrder = this.reloadOrder.bind(this);
  }

  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(1, filters);
  }

  reloadOrder(page){
    this.fetchRecords(page);
  }
 
  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber, filters){
    orderListing({pageNumber, ...filters}).then((response) => {
      this.props.orderListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps);
    if(this.props.status != nextProps.status && nextProps.compName == 'orderlist'){
      this.setState({
        orderListing: nextProps.orderListing,
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
    const {orderListing, activePage} = this.state;
    const srno = (activePage-1) * orderListing.limit;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-12 tl-block align-self-center">
                <h4 className="heading">Orders</h4>
              </div>
            </div>

            <OrdersFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Order Id</th>
                        <th>Last order Delivery</th>
                        <th>Total Price</th>
                        <th className="manage-content">Restaurant Name</th>
                        <th className="manage-content">Order Status</th>
                        {
                          localStorage.getItem('hasAllAccess') == 'true'
                          ?
                          <th>Payment Type</th>
                          :
                          null
                        }
                        <th>Time Limit</th>
                        <th>Rider</th>
                        <th>Delivery/Pickup</th>
                        <th>Preparation Time</th>
                        <th>Mark Ready Time</th>
                        <th>Delivery Time</th>
                        <th className="manage-content">Order Time</th>
                        <th className="manage-content">Accepting Time</th>
                        <th className="manage-content">Pickup Time</th>
                        <th className="manage-content">Delivery Time</th>
                        {
                          localStorage.getItem('hasAllAccess') == 'true'
                          ?
                          <>
                            <th>User Name</th>
                            <th>User Contact</th>
                          </>
                          :
                          null
                        }
                        <th>Refund</th>
                        <th>Mark Unassigned</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orderListing && orderListing.orders && orderListing.orders.length > 0 && orderListing.orders.map((obj, index) => (
                          <OrderListSlide slideData={obj} index={index} key={obj.orderId} srno={srno} activePage={activePage} reloadOrder={this.reloadOrder} maxCashLimit={orderListing.maxCashRiderCarry}  maxTripLimit={orderListing.maxTripRiderCarry} />
                        ))
                      }
                    </tbody>
                  </table>
                  </div>
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={orderListing.limit}
                      totalItemsCount={orderListing.total ? orderListing.total : 0}
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
    orderListing: state.Order.order_list,
    status: state.Order.status,
    compName: state.Order.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    orderListingSuccess: (payload) => {
      dispatch(orderListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(Listing);

