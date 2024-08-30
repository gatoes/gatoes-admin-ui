import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { regionListing, regionListingSuccess } from '../../actions/regions';
import RegionSlide from './RegionSlide';
import Pagination from "react-js-pagination";
//import {OPENING_CLOSING_TIME} from "../../constants";
import RegionFilter from './RegionFilter';
import {getAclChecks} from '../../utilities';

class Listing extends Component {
  constructor(props){
    super(props);
    this.state = {
      regionListing: props.regionListing,
      status: props.status,
      activePage: 1,
      totalItems:0,
      filter: {},
      lang: window.localStorage.contentlanguage
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
 
  getFilterFields(filters){
    this.setState({filters});
    this.fetchRecords(1, filters);
  }

  fetchRecords(pageNumber, filters){
    regionListing({pageNumber, ...filters}).then((response) => {
      this.props.regionListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'regionlist'){
      this.setState({
        regionListing: nextProps.regionListing,
        status: nextProps.status
      });
    }
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  submit(e){
    e.preventDefault();
  }


  render() {
    const {regionListing, activePage, lang} = this.state;
    const srno = (activePage-1) * regionListing.limit
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Zones Listing</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('ZONE_ADD_EDIT') && lang == 'en'
                  ?
                  <a href="/dashboard/addnewregion" className="btn green-btn"><span className="icon-ic_plus"></span>Add Zone</a>
                  :
                  null
                }
              </div>
            </div>

            <RegionFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                 <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th><th>Name</th>
                        <th>City</th>
                        <th>Service Start Time</th>
                        <th>Service Close Time</th>
                        <th>Status</th>
                        <th>Restaurant Status</th>
                        <th>Set Restaurant Service Radius</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        regionListing && regionListing.region && regionListing.region.length > 0 && regionListing.region.map((obj, index) => (
                          <RegionSlide slideData={obj} index={index} key={obj.id} srno={srno} />
                        ))
                      }
                    </tbody>
                  </table>
                  </div>
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={regionListing.limit}
                      totalItemsCount={regionListing.total ? regionListing.total : 0}
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
    regionListing: state.Region.region_list,
    status: state.Region.status,
    compName: state.Region.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    regionListingSuccess: (payload) => {
      dispatch(regionListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(Listing);

