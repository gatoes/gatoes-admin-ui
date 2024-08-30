import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getShopBanners, getShopBannersSuccess, changeRestaurantBannerPosition } from '../../actions/shops';
import ManageRestaurantBannerSlide from './ManageRestaurantBannerSlide';
import Pagination from "react-js-pagination";
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const DragHandle = sortableHandle(() => <td><span className="sort_icon"></span></td>);


const SortableItem = sortableElement(({slideData, index, srno, activePage, updateList}) => <ManageRestaurantBannerSlide slideData={slideData} index={index} srno={srno} activePage={activePage} updateList={updateList} component={<DragHandle />} />);

const SortableContainer = sortableContainer(({children}) => {
  return <tbody>{children}</tbody>;
});


class ManageRestaurantBanner extends Component {
  constructor(props){
    super(props);
    this.state = {
      bannerListing: props.bannerListing,
      status: props.status,
      activePage: 1,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  updateList(activePage){
    this.fetchRecords(activePage);
  }

  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber){
    getShopBanners({pageNumber}).then((response) => {
      this.props.getShopBannersSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'bannerlist'){
      this.setState({
        bannerListing: nextProps.bannerListing,
        status: nextProps.status
      });
    }
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber);
  }

  onSortEnd({oldIndex, newIndex}){
    //console.log(oldIndex, 'bannerListing', this.state.bannerListing);
    changeRestaurantBannerPosition({oldPosition: this.state.bannerListing.promos[oldIndex].position, newPosition: this.state.bannerListing.promos[newIndex].position, promoId: this.state.bannerListing.promos[oldIndex].id}).then((response) => {
      // this.setState({
      //   bannerListing: response.data.data
      // });
      this.fetchRecords(this.state.activePage);
    })
  }

  render() {
    const {bannerListing, lang, activePage} = this.state;
    let listingLimit = bannerListing && bannerListing.limit ? bannerListing.limit : 0;
    let srno = (activePage-1) * listingLimit;

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Promote Restaurants</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  lang == 'en'
                  ?
                  <Link className="btn green-btn" to="/dashboard/addrestaurantbanner"><span className="icon-ic_plus"></span>Add New</Link>
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
                        <th>#</th>
                        <th>Name</th>
                        <th>Restaurants</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <SortableContainer onSortEnd={this.onSortEnd.bind(this)} useDragHandle>
                      {
                        bannerListing && bannerListing.promos && bannerListing.promos.length > 0 && bannerListing.promos.map((obj, index) => (
                          <SortableItem key={obj.id} slideData = {obj} index={index} srno={srno} activePage={activePage} updateList={this.updateList} />
                        ))
                      }
                    </SortableContainer>
                  </table>
                  <div className="pagination">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={bannerListing.limit}
                        totalItemsCount={bannerListing.total ? bannerListing.total : 0}
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
    bannerListing: state.Shop.banner_list,
    status: state.Shop.status,
    compName: state.Shop.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getShopBannersSuccess: (payload) => {
      dispatch(getShopBannersSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManageRestaurantBanner);

