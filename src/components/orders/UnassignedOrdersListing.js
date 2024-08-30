import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { unassignedOrdersListing, unassignedOrdersListingSuccess } from '../../actions/orders';
import UnassignedOrderListSlide from './UnassignedOrderListSlide';
import Pagination from "react-js-pagination";
import OrdersFilter from './OrdersFilter';
import { manageRequiredCounterSuccess} from '../../actions/settings';

class UnassignedOrdersListing extends Component {
  constructor(props){
    super(props);
    this.state = {
      unassignedOrders: props.unassignedOrders,
      status: props.status,
      activePage: 1
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateOrderList = this.updateOrderList.bind(this);
  }

  updateOrderList(orderId){
    const {unassignedOrders} = this.state;
    unassignedOrders && unassignedOrders.orders && unassignedOrders.orders.length > 0 && unassignedOrders.orders.map((obj, index) => {
      if(obj.orderId === orderId){
        unassignedOrders.orders.splice(index, 1);
      }
    })
    this.setState({
      unassignedOrders
    })
  }

  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(1, filters);
  }
 
  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber, filters){
    unassignedOrdersListing({pageNumber, ...filters}).then((response) => {
      this.props.unassignedOrdersListingSuccess(response.data.data);
      this.props.manageRequiredCounterSuccess('unassignedorder', response.data.data.total);

    })
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps);
    if(this.props.status != nextProps.status && nextProps.compName == 'unassignorderlist'){
      this.setState({
        unassignedOrders: nextProps.unassignedOrders,
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
    const {unassignedOrders, activePage} = this.state;
    const srno = (activePage-1) * unassignedOrders.limit;
    let maxCashLimit = unassignedOrders && unassignedOrders.maxCashRiderCarry ? unassignedOrders.maxCashRiderCarry : 0;
    let maxRiderTrips = unassignedOrders && unassignedOrders.maxTripRiderCarry ? unassignedOrders.maxTripRiderCarry : 0;
    console.log('>>>>>>>>>', maxRiderTrips);
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-12 tl-block align-self-center">
                <h4 className="heading">Unassigned Orders</h4>
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
                        <th>Last Order Delivery</th>
                        <th>Reason</th>
                        <th>Total Price</th>
                        <th>Restaurant Name</th>
                        <th>Restaurant Address</th>
                        <th>Order Status</th>
                        <th>Order Time</th>
                        <th>Delivery Time</th>
                        <th>User Name</th>
                        <th>User Contact</th>
                        <th>Manage Rider</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        unassignedOrders && unassignedOrders.orders && unassignedOrders.orders.length > 0 && unassignedOrders.orders.map((obj, index) => (
                          <UnassignedOrderListSlide slideData={obj} index={index} key={obj.orderId} srno={srno} updateOrderList={this.updateOrderList} maxCashLimit={maxCashLimit} maxRiderTrips={maxRiderTrips} />
                        ))
                      }
                    </tbody>
                  </table>
                  </div>
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={unassignedOrders.limit}
                      totalItemsCount={unassignedOrders.total ? unassignedOrders.total : 0}
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
    unassignedOrders: state.Order.unassigned_order_list,
    status: state.Order.status,
    compName: state.Order.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    unassignedOrdersListingSuccess: (payload) => {
      dispatch(unassignedOrdersListingSuccess(payload));
    },
    manageRequiredCounterSuccess: (payload, counter) => {
      dispatch(manageRequiredCounterSuccess(payload, counter));
    }
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UnassignedOrdersListing);