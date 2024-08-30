import React, { Component } from 'react';
//import {getZoneNewOldUserData} from '../../actions/orders.js';
import ZoneUserAnalyticsGraph from './ZoneUserAnalyticsGraph';
import ZoneUserData from './ZoneUserData';
import Modal from '../../Modal';

class BasicCustomerAnalytics extends Component {
	constructor(props){
  	super(props);
    this.state = {
      newUserDetails: props.newUserDetails
    };
	}

  // componentDidMount(){
  //   getZoneNewOldUserData({'is_all': false}).then((response) => {
  //     this.setState({
  //       userRecords: response.data.data
  //     });
  //   });
  // }

  componentWillReceiveProps(nextProps){
    if(typeof this.state.newUserDetails === 'undefined'){
      this.setState({
        newUserDetails: nextProps.newUserDetails
      });
    }
  }

  customerOrderDetail(e){
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">New/Returning User</h4>}
              body={<ZoneUserData />}
            />
    });
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

	render() {
    const {newUserDetails} = this.state;

  	return (
  		<div className="col-sm-12 col-md-12">
        <div className="white-bg-ui od-ui-block">
          <div className="heading-wrapper">
            <div className="heading-block">
              <label className="in-title">Users analytics</label>
              <span className="ic-calender">
                <a href="javascript:void(0);" className="rtext-btn" onClick={this.customerOrderDetail.bind(this)}>MORE Details</a>
              </span>
            </div>
            <div className="tab-heading"></div>
          </div>
          
          <div className="revenue-chart-block">
              <ZoneUserAnalyticsGraph userData={newUserDetails} />
          </div>
        </div>
      </div>

 	  );
  }
}
export default BasicCustomerAnalytics;