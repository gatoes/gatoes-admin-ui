import React, { Component } from 'react';
import BasicOrderAnalytis from './BasicOrderAnalytis';
import BasicRevenueAnalytics from './BasicRevenueAnalytics';
import BasicCustomerAnalytics from './BasicCustomerAnalytics';
import BasicLocationAnalytics from './BasicLocationAnalytics';
import BasicRestaurantAnalytics from './BasicRestaurantAnalytics';
import HourlyReporting from './HourlyReporting';
import {getAclChecks} from '../../utilities';
import {getDashboardDetails} from '../../actions/orders';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      reloaded: true,
      records: {}
    };
  }

  componentDidMount(){
    getDashboardDetails().then((response) => {
      this.setState({
        records: response.data.data
      });
    });
  }

  // reloadDashboard(){
  //   this.setState({
  //       reloaded: false
  //   })
  //   setTimeout(() => {
  //     this.setState({
  //       reloaded: true
  //     })
  //   }, 0)
  // }

  render() {
    let {records} = this.state;
    // if(this.state.reloaded === false)
    //   return null;

    //console.log('records', records);

    return (
      <div className="right-ui-block dashboard-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            <div className="row menu-top-block">
              <div className="col-sm-2 tl-block align-self-center">
                <h4 className="heading">Dashboard</h4>
              </div>
              {/*
              {
                getAclChecks()
                ?
                <div className="col-sm-2 tl-block align-self-center">
                  <a href="javascript: void();" className="reload-btn" onClick={this.reloadDashboard.bind(this)}>
                    <i className="material-icons">autorenew</i>Reload
                  </a>
                </div>
                :
                null
              }
             */}
              {
                getAclChecks() || getAclChecks('DASHBOARD')
                ?
                <div className="col-sm-12 tl-block align-self-center comingsoon">
                  <div className="row">
                    <BasicOrderAnalytis />
                    <BasicRevenueAnalytics revenueDetails={records && records.revenueDetails} />
                  </div>
                  <div className="row cs-tabs-row">
                    <BasicLocationAnalytics locationDetails={records && records.locationDetails} />
                    <BasicRestaurantAnalytics restaurentDetails={records && records.restaurentDetails} />
                    <BasicCustomerAnalytics newUserDetails={records && records.newUserDetails} />
                    <HourlyReporting getHourlyReport={records && records.getHourlyReport} />
                  </div>
                </div>
                :
                null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;