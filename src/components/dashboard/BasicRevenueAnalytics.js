import React, { Component } from 'react';
//import {getBasicRevenueAnalytics} from '../../actions/orders.js';
import BasicRevenueAnalyticsGraph from './BasicRevenueAnalyticsGraph';
//import {currencyFormat} from '../../constants';
import {getCurrencySymbol} from '../../utilities';
import NumberFormat from 'react-number-format';

class BasicRevenueAnalytics extends Component {
	constructor(props){
    super(props);
    this.state = {
      revenueDetails: props.revenueDetails,
      activeMenu: 'dayz',
      records: {},
      type: 7
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e, activeMenu, type){
    e.preventDefault();
    let {revenueDetails} = this.state;
    let detail = '';
    if(type == 0){
      detail = revenueDetails && revenueDetails.day_0;
    } else if(type == 30){
      detail = revenueDetails && revenueDetails.day_30;
    } else if(type == 365){
      detail = revenueDetails && revenueDetails.day_365;
    } else {
      detail = revenueDetails && revenueDetails.day_7;
    }
    this.setState({
      records: detail,
      activeMenu
    });
    //this.fetchRecords(type);
  }

  componentWillReceiveProps(nextProps){
    if(typeof this.state.revenueDetails === 'undefined'){
      this.setState({
        revenueDetails: nextProps.revenueDetails,
        records: nextProps.revenueDetails && nextProps.revenueDetails.day_7
      });
    }
  }


  // fetchRecords(type){
  //   getBasicRevenueAnalytics({dayz: type}).then((response) => {
  //     this.setState({
  //       revenueRecords: response.data.data
  //     });
  //   });
  // }

  	render() {
      const {activeMenu, records} = this.state;
      let { revenueDetails } = this.props;
      let currecySymbol = getCurrencySymbol();
      // let sevenDays = records && records.earning && (records.earning.lastWeek).toFixed(0) || 0;
      // let thirtyDays = records && records.earning && (records.earning.lastMonth).toFixed(0) || 0;
      // let yearDays = records && records.earning && (records.earning.lastYear).toFixed(0) || 0;
      // let allDays = records && records.earning && (records.earning.allTime).toFixed(0) || 0;
      const sevenDays = records && records.earning && records.earning.lastWeek !== null && records.earning.lastWeek !== undefined
      ? records.earning.lastWeek.toFixed(0)
      : 0;
    const thirtyDays = records && records.earning && records.earning.lastMonth !== null && records.earning.lastMonth !== undefined
      ? records.earning.lastMonth.toFixed(0)
      : 0;
    const yearDays = records && records.earning && records.earning.lastYear !== null && records.earning.lastYear !== undefined
      ? records.earning.lastYear.toFixed(0)
      : 0;
    const allDays = records && records.earning && records.earning.allTime !== null && records.earning.allTime !== undefined
      ? records.earning.allTime.toFixed(0)
      : 0;
    	return (
    		<div className="col-sm-8 col-md-8">
          <div className="white-bg-ui od-ui-block">
            <div className="revenue-ui-block">
              <div className="heading-wrapper">
                <div className="heading-block">
                  <label className="in-title">revenue ({currecySymbol})</label>
                </div>
              </div>
              <div className="revenue-card-block">
                <div className="inner-content-ui">
                  <div className="revenue-list-ui">
                    <ul>
                      <li className={`${activeMenu == 'dayz' ? "active" : ""}`} onClick={(e)=>this.toggle(e, 'dayz', 7)}><a href="javascript:void(0)"> <p><NumberFormat value={sevenDays} displayType={'text'} thousandSeparator={true} /></p> <span>Last 7 Days</span></a> </li>
                      <li className={`${activeMenu == 'week' ? "active" : ""}`} onClick={(e)=>this.toggle(e, 'week', 30)}> <a href="javascript:void(0)"><p><NumberFormat value={thirtyDays} displayType={'text'} thousandSeparator={true} /></p> <span>Last 30 Days</span></a> </li> 
                      <li className={`${activeMenu == 'month' ? "active" : ""}`} onClick={(e)=>this.toggle(e, 'month', 365)}><a href="javascript:void(0)"> <p><NumberFormat value={yearDays} displayType={'text'} thousandSeparator={true} /></p> <span>Last 365 Days</span> </a></li> 
                      <li className={`${activeMenu == 'year' ? "active" : ""}`} onClick={(e)=>this.toggle(e, 'year', 0)}> <a href="javascript:void(0)"><p><NumberFormat value={allDays} displayType={'text'} thousandSeparator={true} /></p> <span>All</span></a> </li>
                    </ul>
                  </div>
                  <div className="revenue-chart-block">
                    <BasicRevenueAnalyticsGraph revenueData={records && records.dataToSend} currecySymbol={currecySymbol} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

   		);
  	}
}
export default BasicRevenueAnalytics;