import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { driverRegionGroupList, driverRegionGroupListSuccess } from '../../actions/deliveryagent';
import  DriverRegionGroupSlide from './DriverRegionGroupSlide';
import {getAclChecks} from '../../utilities';

class DriverRegionGroupSetting extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupListing: props.groupListing,
      status: props.status,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
  }
 
  componentDidMount(){
    this.fetchRecords();
  }

  fetchRecords(){
    driverRegionGroupList().then((response) => {
      this.props.driverRegionGroupListSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'regiongrouplisting'){
      this.setState({
        groupListing: nextProps.groupListing,
        status: nextProps.status
      });
    }
  }

  render() {
    const {groupListing, lang} = this.state;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">

            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Rider Region Group</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('RIDER_REGION_GROUP_ADD_EDIT') && lang == 'en'
                  ?
                  <Link  className="btn green-btn" to="/dashboard/adddriverregiongroup" ><span className="icon-ic_plus"></span> Add Region Group</Link>
                  :
                  null
                }
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Group Name</th>
                        <th>Regions</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        groupListing && groupListing.length > 0 && groupListing.map((obj, index) => (
                          <DriverRegionGroupSlide key={obj.id} slideData = {obj} index={index}  />
                        ))
                      }
                    </tbody>
                  </table>
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
    groupListing: state.DeliveryAgent.driver_region_group,
    status: state.DeliveryAgent.status,
    compName: state.DeliveryAgent.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    driverRegionGroupListSuccess: (payload) => {
      dispatch(driverRegionGroupListSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(DriverRegionGroupSetting);