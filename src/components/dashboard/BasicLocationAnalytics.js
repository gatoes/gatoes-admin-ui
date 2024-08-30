import React, { Component } from 'react';
//import {getLocationAnalytics} from '../../actions/orders.js';
import BasicLocationAnalyticsGraph from './BasicLocationAnalyticsGraph';
import LocationOrderDetail from './LocationOrderDetail';
import Modal from '../../Modal';

class BasicLocationAnalytics extends Component {
  	constructor(props){
      super(props);
      this.state = {
        locationDetails: props.locationDetails,
        activeMenu: 'dayz',
        records: {},
        type: 1
      };
      this.toggle = this.toggle.bind(this);
    }

    toggle(e, activeMenu, type){
      e.preventDefault();
      let {locationDetails} = this.state;
      let detail = '';
      if(type == 7){
        detail = locationDetails && locationDetails.day_7;
      } else if(type == 30){
        detail = locationDetails && locationDetails.day_30;
      } else {
        detail = locationDetails && locationDetails.day_1;
      }
      this.setState({
        records: detail,
        activeMenu
      });
    }

    componentWillReceiveProps(nextProps){
      if(typeof this.state.revenueDetails === 'undefined'){
        this.setState({
          locationDetails: nextProps.locationDetails,
          records: nextProps.locationDetails && nextProps.locationDetails.day_1
        });
      }
    }

    locationOrderDetail(e){
      window.getFooter().setState({
        renderElement: <Modal 
                id="business-detail-modal"
                show={true}
                onHide={this.hide}
                header={<h4 className="modal-title">Revenue & Completed Orders</h4>}
                body={<LocationOrderDetail />}
              />
      });
    }

    hide(){
      window.getFooter().setState({
          renderElement: null
      });
    }

  	render() {
      const {activeMenu, records} = this.state;
      const {locationDetails} = this.props;
      
    	return (
    		<div className="col-sm-12 col-md-12">
          <div className="white-bg-ui top-location-ui">
            <div className="heading-wrapper">
              <div className="heading-block">
                 <label className="in-title">top locations</label>
                 <span className="ic-calender">
                  <a href="javascript:void(0);" className="rtext-btn" onClick={this.locationOrderDetail.bind(this)}>MORE Details</a>
                </span>
              </div>
              <div className="tab-heading">
                 <ul className="nav nav-tabs">
                    <li><a className={`${activeMenu == 'dayz' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'dayz', 1)}>Today</a></li>
                    <li><a className={`${activeMenu == 'week' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'week', 7)}>Last Week</a></li>
                    <li><a className={`${activeMenu == 'month' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'month', 30)}>Last month</a></li>
                 </ul>
              </div>
            </div>
            <div className="revenue-chart-block">
              <BasicLocationAnalyticsGraph locationData={records} />
            </div>
          </div>
        </div>

   		);
  	}
}
export default BasicLocationAnalytics;