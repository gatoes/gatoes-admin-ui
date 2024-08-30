import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestedItemListing, requestedItemListingSuccess } from '../../actions/menus';
import { manageRequiredCounterSuccess} from '../../actions/settings';
import RequestedMenuItemSlide from './RequestedMenuItemSlide';
import Pagination from "react-js-pagination";
import ItemsShopFilter from './ItemsShopFilter';

class RequestedMenuItems extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemListing: props.itemListing,
      status: props.status,
      activePage: 1
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(1, filters);
  }
 
  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber, filters){
    requestedItemListing({pageNumber, ...filters}).then((response) => {
      this.props.requestedItemListingSuccess(response.data.data);
      this.props.manageRequiredCounterSuccess('requesteditems', response.data.data.total);
    })
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps);
    if(this.props.status != nextProps.status && nextProps.compName == 'requesteditemlist'){
      this.setState({
        itemListing: nextProps.itemListing,
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
    const {itemListing, activePage} = this.state;
    const srno = (activePage-1) * itemListing.limit;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-12 tl-block align-self-center">
                <h4 className="heading">Requested Menu Items</h4>
              </div>
            </div>

            <ItemsShopFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Restaurant Name</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        itemListing && itemListing.items && itemListing.items.length > 0 && itemListing.items.map((obj, index) => (
                          <RequestedMenuItemSlide slideData={obj} index={index} key={obj.id} srno={srno} />
                        ))
                      }
                    </tbody>
                  </table>
                  </div>
                
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={itemListing.limit}
                      totalItemsCount={itemListing.total ? itemListing.total : 0}
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
    itemListing: state.Menu.requested_item_list,
    status: state.Menu.status,
    compName: state.Menu.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestedItemListingSuccess: (payload) => {
      dispatch(requestedItemListingSuccess(payload));
    },
    manageRequiredCounterSuccess: (payload, counter) => {
      dispatch(manageRequiredCounterSuccess(payload, counter));
    }
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(RequestedMenuItems);