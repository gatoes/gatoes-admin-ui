import React, { Component } from 'react';
//import {getShopAnalytics} from '../../actions/orders.js';
import BasicRestaurantAnalyticsGraph from './BasicRestaurantAnalyticsGraph';
import Modal from '../../Modal';
import RestaurantOrderDetail from './RestaurantOrderDetail';

class BasicRestaurantAnalytics extends Component {
    constructor(props){
      super(props);
      this.state = {
        shopRecords: '',
        restaurentDetails: props.restaurentDetails,
        records: {},
        activeMenu: 'dayz',
        type: 1
      };
      this.toggle = this.toggle.bind(this);
    }

    toggle(e, activeMenu, type){
      e.preventDefault();
      let {restaurentDetails} = this.state;
      let detail = '';
      if(type == 7){
        detail = restaurentDetails && restaurentDetails.day_7;
      } else if(type == 30){
        detail = restaurentDetails && restaurentDetails.day_30;
      } else {
        detail = restaurentDetails && restaurentDetails.day_1;
      }
      this.setState({
        records: detail,
        activeMenu
      });
    }

    componentWillReceiveProps(nextProps){
      if(typeof this.state.restaurentDetails === 'undefined'){
        this.setState({
          restaurentDetails: nextProps.restaurentDetails,
          records: nextProps.restaurentDetails && nextProps.restaurentDetails.day_1
        });
      }
    }

    restaurantOrderDetail(e){
      window.getFooter().setState({
        renderElement: <Modal 
                id="business-detail-modal"
                show={true}
                onHide={this.hide}
                header={<h4 className="modal-title">Revenue & Completed Orders</h4>}
                body={<RestaurantOrderDetail />}
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
      const {restaurentDetails} = this.props;
      return (
        <div className="col-sm-12 col-md-12">
          <div className="white-bg-ui top-location-ui">
            <div className="heading-wrapper">
              <div className="heading-block">
                 <label className="in-title">Top Restaurants</label>
                 <span className="ic-calender">
                  <a href="javascript:void(0);" className="rtext-btn" onClick={this.restaurantOrderDetail.bind(this)}>MORE Details</a>
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
              <BasicRestaurantAnalyticsGraph shopData={records} />
            </div>
          </div>
        </div>

      );
    }
}
export default BasicRestaurantAnalytics;