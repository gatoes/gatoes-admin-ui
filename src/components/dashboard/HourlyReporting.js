import React, { Component } from 'react';
//import { getHourlyReports } from '../../actions/orders';
import HourlyReportingGraph from './HourlyReportingGraph';
import { Link } from 'react-router-dom';

class HourlyReporting extends Component {
	constructor(props){
  	super(props);
    this.state = {
      getHourlyReport: props.getHourlyReport
    };
	}

  componentWillReceiveProps(nextProps){
    if(typeof this.state.getHourlyReport === 'undefined'){
      this.setState({
        getHourlyReport: nextProps.getHourlyReport
      });
    }
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

	render() {
    const {getHourlyReport} = this.state;

    console.log('getHourlyReport', getHourlyReport);

  	return (
  		<div className="col-sm-12 col-md-12">
        <div className="white-bg-ui od-ui-block">
          <div className="heading-wrapper">
            <div className="heading-block">
              <label className="in-title">Order Hourly analytics</label>
              <span className="ic-calender">
                <Link to="/dashboard/orderhourlyreporting" className="rtext-btn">MORE Details</Link>
              </span>
            </div>
            <div className="tab-heading"></div>
          </div>
          
          <div className="revenue-chart-block">
              <HourlyReportingGraph reporting={getHourlyReport && getHourlyReport.data} />
          </div>
        </div>
      </div>

 	  );
  }
}
export default HourlyReporting;