import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import { regionListing, deliveryRegionListing } from '../../actions/regions';
import {order_status, NOTIFICATION_TYPE, NOTIFICATION_USER} from '../../constants';
const queryString = require('query-string');

class OrdersFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	    	regionListing : [],
	    	notification_type: [],
	    	notification_user: [],
	      	zone: 0,
	      	...filters
	    };
	}

	componentDidMount(){
	    regionListing().then((response) => {
	      	this.setState({
	        	regionListing: response.data.data.region
	      	});
	    })
	}

	componentWillMount(){
		this.props.getFilterFields({...this.state});
	}

  	submit(e){
    	e.preventDefault();
    	const filters = {...this.state};
    	delete filters.regionListing;
    	
    	this.props.history.push({
            pathname: this.props.location.pathname,
            search: "?" + window.$$.param(filters)
        });
    	this.props.getFilterFields(filters);
  	}

  	handleChange(event){
  		const {name, value} = event.target;
  		this.setState({
  			[name]: value
  		});	
  	}


  	render() {
  		const { regionListing, zone, notification_type, notification_user} = this.state;
	    return (
			<form name="filter" onSubmit={this.submit.bind(this)} onChange={this.handleChange.bind(this)} >
	            <div className="row filter-block">
	                <div className="col-sm-12 col-md-12 col-xl-12 align-self-center">
	              <div className="row">
	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Zone</label>
	                    	<div className="select-ui">
		                    <select className="form-control selectbox-block" name="zone" value={zone}>
		                      <option value="0">Choose zone</option>
		                      {
		                        regionListing.map((obj, index) => (
		                          <option value={obj.id}>{obj.name}</option>
		                        ))
		                      }
		                    </select>
		                    </div>
	                  	</div>
	                </div>
	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Notification Type</label>
	                    	<div className="select-ui">
		                    <select className="form-control selectbox-block" name="notification_type" value={notification_type}>
		                      <option value="">Choose Type</option>
		                      {
		                        NOTIFICATION_TYPE.map((obj, index) => (
		                          <option value={obj.value}>{obj.label}</option>
		                        ))
		                      }
		                    </select>
		                    </div>
	                  	</div>
	                </div>
	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Notification User</label>
	                    	<div className="select-ui">
		                    <select className="form-control selectbox-block" name="notification_user" value={notification_user}>
		                      <option value="">Choose User Type</option>
		                      {
		                        NOTIFICATION_USER.map((obj, index) => (
		                          <option value={obj.value}>{obj.label}</option>
		                        ))
		                      }
		                    </select>
		                    </div>
	                  	</div>
	                </div>
	                <div className="col-sm-3 col-lg-4 col-xl-2 align-self-center">
	                  	<div className="filter-result-block">
	                      	<button className="btn btn1" onClick={this.filterResult}>Apply</button>
	                  	</div>
	                </div>
	                </div>
	                </div>
	                
	            </div>
	        </form>
	    );
	}
}

export default withRouter(OrdersFilter)