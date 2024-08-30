import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { outOfStockOrdersListing, outOfStockOrdersListingSuccess } from '../../actions/orders';
import { manageRequiredCounterSuccess} from '../../actions/settings';
import OutOfStockListSlide from './OutOfStockListSlide';
import Pagination from "react-js-pagination";
//import OutOfStockOrdersFilter from './OutOfStockOrdersFilter';

class OutOfStockOrders extends Component {
  constructor(props){
    super(props);
    this.state = {
      outStockOrders: props.outStockOrders,
      status: props.status,
      activePage: 1
    };
    //this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateOrderList = this.updateOrderList.bind(this);
  }

  updateOrderList(orderId){
    const {outStockOrders} = this.state;
    outStockOrders && outStockOrders.orders && outStockOrders.orders.length > 0 && outStockOrders.orders.map((obj, index) => {
      if(obj.orderId === orderId){
        outStockOrders.orders.splice(index, 1);
      }
    })
    this.setState({
      outStockOrders
    })
  }

  // getFilterFields(filters){
  //   this.setState({filters});
  //   this.fetchRecords(1, filters);
  // }
 
  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber, filters){
    outOfStockOrdersListing({pageNumber, ...filters}).then((response) => {
      this.props.outOfStockOrdersListingSuccess(response.data.data);
      this.props.manageRequiredCounterSuccess('outofstock', response.data.data.total);
    })
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps);
    if(this.props.status != nextProps.status && nextProps.compName == 'outofstockorderlist'){
      this.setState({
        outStockOrders: nextProps.outStockOrders,
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
    const {outStockOrders, activePage} = this.state;
    const srno = (activePage-1) * outStockOrders.limit;
    console.log('outStockOrders', outStockOrders);
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-12 tl-block align-self-center">
                <h4 className="heading">Out of stock Orders</h4>
              </div>
            </div>
            {/*
            <OutOfStockOrdersFilter getFilterFields={this.getFilterFields} />
            */}
            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Order Id</th>
                        <th>Restaurant Name</th>
                        <th>Order Placed Time</th>
                        <th>Order Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        outStockOrders && outStockOrders.orders && outStockOrders.orders.length > 0 && outStockOrders.orders.map((obj, index) => (
                          <OutOfStockListSlide slideData={obj} index={index} key={obj.orderId} srno={srno} updateOrderList={this.updateOrderList} />
                        ))
                      }
                    </tbody>
                  </table>
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={outStockOrders.limit}
                      totalItemsCount={outStockOrders.total ? outStockOrders.total : 0}
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
    outStockOrders: state.Order.outstock_order_list,
    status: state.Order.status,
    compName: state.Order.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    outOfStockOrdersListingSuccess: (payload) => {
      dispatch(outOfStockOrdersListingSuccess(payload));
    },
    manageRequiredCounterSuccess: (payload, counter) => {
      dispatch(manageRequiredCounterSuccess(payload, counter));
    }
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(OutOfStockOrders);