import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import { regionListing, deliveryRegionListing } from '../../actions/regions';
import {order_status} from '../../constants';
import {getAclChecks} from '../../utilities';
const queryString = require('query-string');

class OrdersFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	    	regionListing : [],
	    	deliveryregion: [],
	      	orderId: '',
	      	zone: 0,
	      	email: '',
	      	shopName: '',
	      	contactNumber:'',
	      	status:-1,
	      	driverName: '',
	      	delivery_region:0,
	      	timeLimit: null,
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
    	delete filters.deliveryregion;
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
  		if(name === 'zone'){
  			this.getDeliveryRegion(value);
  		}
  	}

  	getDeliveryRegion(id){
	    deliveryRegionListing({regionId : id}).then((response) => {
	      	this.setState({
	        	deliveryregion: response.data.data
	      	});
	    })
	}

	componentWillMount(){
	  	if(this.state.zone != 0){
	  		this.getDeliveryRegion(this.state.zone);
	  	}
	}



  	render() {
  		const {orderId, regionListing, zone, delivery_region, deliveryregion, shopName, contactNumber, status, driverName, email, timeLimit} = this.state;
  		// console.log('111', deliveryregion);
  		// console.log('^^^^^^', getAclChecks('ORDERS_LISTING_RESTRICTED'));
	    return (
			<form name="filter" onSubmit={this.submit.bind(this)} onChange={this.handleChange.bind(this)} >
	            <div className="row filter-block">
	                <div className="col-sm-12 col-md-12 col-xl-12 align-self-center">
		              <div className="row">
		                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Order id</label>
	                    	<input type="number" name="orderId" className="form-control" value={orderId} placeholder="eg. 99" />
	                  	</div>
	                </div>
	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>User Contact</label>
	                    	<input type="text" name="contactNumber" className="form-control" value={contactNumber} placeholder="eg. 9876567854" />
	                  	</div>
	                </div>

	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>User Email</label>
	                    	<input type="text" name="email" className="form-control" value={email} placeholder="eg. admin@gatoes.com" />
	                  	</div>
	                </div>
	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Time Limit</label>
	                    	<input type="number" name="timeLimit" className="form-control" value={timeLimit} placeholder="eg. 50" />
	                  	</div>
	                </div>

	                {
	                	getAclChecks('ORDERS_LISTING_RESTRICTED') && !getAclChecks('SERVICEPROVIDER')
	                	?
	                	null
	                	:
	                	<>
	                	<div className="col-sm-3 col-lg-4 col-xl-2">
		                  	<div className="form-group">
		                    	<label>Zone</label>
		                    	<div className="select-ui">
				                    <select className="form-control selectbox-block" name="zone"  value={zone}>
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
		                    	<label>Delivery Region</label>
		                    	<div className="select-ui">
			                    <select className="form-control selectbox-block" name="delivery_region" value={delivery_region}>
			                      <option value="0">Choose delivery region</option>
			                      {
			                        deliveryregion.length > 0 
			                        &&
			                        deliveryregion.map((obj, index) => (
			                          <option value={obj.id}>{obj.name}</option>
			                        ))
			                      }
			                    </select>
			                    </div>
		                  	</div>
		                </div>
		                <div className="col-sm-3 col-lg-4 col-xl-2">
		                  	<div className="form-group">
		                    	<label>Restaurant Name</label>
		                    	<input type="text" name="shopName" className="form-control" value={shopName} placeholder="eg. Amrit" />
		                  	</div>
		                </div>
		                <div className="col-sm-3 col-lg-4 col-xl-2">
		                  	<div className="form-group">
		                    	<label>Rider Name</label>
		                    	<input type="text" name="driverName" className="form-control" value={driverName} placeholder="eg. Ali" />
		                  	</div>
		                </div>
		                <div className="col-sm-3 col-lg-4 col-xl-2">
		                  	<div className="form-group">
		                    	<label>Order Status</label>
		                    	<div className="select-ui">
				                    <select className="form-control selectbox-block" name="status" value={status}>
				                      <option value="-1">Choose status</option>
				                      {
				                        order_status.map((obj, index) => (
				                          <option value={index}>{obj}</option>
				                        ))
				                      }
				                    </select>
			                    </div>
		                  	</div>
		                </div>
	                	</>
	                }

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