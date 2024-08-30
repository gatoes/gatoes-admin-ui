import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import { regionListing, deliveryRegionListing } from '../../actions/regions';
import {SHOP_STATUS, VENDOR_TYPE} from '../../constants';
const queryString = require('query-string');

class ShopFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	    	regionListing : [],
	    	deliveryregion: [],
	    	delivery_region:0,
	      	name: '',
	      	ownername: '',
	      	phone : '',
	      	zone: 0,
	      	status: '-1',
	      	vendor_type: 0,
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
  		console.log('ata', this.state);
  		const {name, ownername, phone, zone, email, status, vendor_type, delivery_region, deliveryregion} = this.state;

  		console.log('=====', deliveryregion);

	    return (
			<form name="filter" onSubmit={this.submit.bind(this)} onChange={this.handleChange.bind(this)} >
	            <div className="row filter-block">
	             <div className="col-sm-12 col-md-12 align-self-center">
	              <div className="row">
	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Restaurant Name</label>
	                    	<input type="text" name="name" className="form-control" value={name} placeholder="eg. Mahak" />
	                  	</div>
	                </div>
	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Owner Name</label>
	                    	<input type="text" name="ownername" className="form-control" value={ownername} placeholder="eg. Vin" />
	                  	</div>
	                </div>
	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Contact No.</label>
	                    	<input type="text" name="phone" className="form-control" value={phone} placeholder="eg. 9876787654" />
	                  	</div>
	                </div>

	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Zone</label>
	                    	<div className="select-ui">
		                    <select className="form-control selectbox-block" name="zone"  value={zone}>
		                      <option value="0">Choose zone</option>
		                      {
		                        this.state.regionListing.length > 0
		                        &&
		                        this.state.regionListing.map((obj, index) => (
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
	                    	<label>Status</label>
	                    	<div className="select-ui">
			                    <select className="form-control selectbox-block" name="status"  value={status}>
			                      <option value="-1">Choose Status</option>
			                      {
			                        SHOP_STATUS.map((obj, index) => (
			                          <option value={obj.value}>{obj.label}</option>
			                        ))
			                      }
			                    </select>
		                    </div>
	                  	</div>
	                </div>

	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Vendor Type</label>
	                    	<div className="select-ui">
			                    <select className="form-control selectbox-block" name="vendor_type"  value={vendor_type}>
			                      <option value="0">Choose Vendor Type</option>
			                      {
			                        VENDOR_TYPE.map((obj, index) => (
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

export default withRouter(ShopFilter)