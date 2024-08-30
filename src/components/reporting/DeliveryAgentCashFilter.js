import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import { regionListing, deliveryRegionListing } from '../../actions/regions';
const queryString = require('query-string');

class DeliveryAgentCashFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	      	name: '',
	      	phone : '',
	      	rider_uid:'',
	      	regionListing : [],
	    	deliveryregion: [],
	    	zone: 0,
	      	delivery_region:0,
	      	...filters
	    };
	}

	componentWillMount(){
		this.props.getFilterFields({...this.state});
	}

	componentDidMount(){
	    regionListing().then((response) => {
	        this.setState({
	          regionListing: response.data.data.region
	        });
	    })
	}

	getDeliveryRegion(id){
	    deliveryRegionListing({regionId : id}).then((response) => {
	        this.setState({
	            deliveryregion: response.data.data
	        });
	    })
	}

  	submit(e){
    	e.preventDefault();
    	const filters = {...this.state};
    	delete filters.regionListing;
    	delete filters.deliveryregion;
    	delete filters.dateRangeString;
    	
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

  	render() {
  		const {name, phone, rider_uid, regionListing, zone, delivery_region, deliveryregion} = this.state;
	    return (
			<form name="filter" onSubmit={this.submit.bind(this)} onChange={this.handleChange.bind(this)} >
	            <div className="row filter-block">
		            <div className="col-sm-12 col-md-12 align-self-center">
			            <div className="row">
			              	<div className="col-sm-3 col-lg-4 col-xl-2">
			                  	<div className="form-group">
			                    	<label>Rider UID</label>
			                    	<input type="text" name="rider_uid" className="form-control" value={rider_uid} placeholder="eg. ATOB786" />
			                  	</div>
			                </div>
			                <div className="col-sm-3 col-lg-4 col-xl-2">
			                  	<div className="form-group">
			                    	<label>Name</label>
			                    	<input type="text" name="name" className="form-control" value={name} placeholder="eg. Kevin" />
			                  	</div>
			                </div>
			                <div className="col-sm-3 col-lg-4 col-xl-2">
			                  	<div className="form-group">
			                    	<label>Phone No.</label>
			                    	<input type="text" name="phone" className="form-control" value={phone} placeholder="eg. 9876754365" />
			                  	</div>
			                </div>
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

export default withRouter(DeliveryAgentCashFilter)