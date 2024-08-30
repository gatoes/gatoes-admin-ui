import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import moment from 'moment';
import Pagination from "react-js-pagination";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { regionListing, deliveryRegionListing } from '../../actions/regions';
const queryString = require('query-string');


class RiderFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	    	regionListing : [],
	    	deliveryregion: [],
	    	zone: 0,
	      	delivery_region:0,
	    	name: '',
	      	status:0,
	      	startDate: moment().format("MM/DD/YYYY"),
	    	endDate: moment().format("MM/DD/YYYY"),
	    	dateRangeString: moment().format("MM/DD/YYYY") + 
	    	' - ' + moment().format("MM/DD/YYYY"),
	      	...filters
	    };
	    this.onApply = this.onApply.bind(this);
	}

	componentWillMount(){
		// if(this.state.zone != 0){
	 //        this.getDeliveryRegion(this.state.zone);
	 //     }
		this.props.getFilterFields({...this.state});
	}

	onApply(e, val){
		this.setState({
			startDate: val.startDate.format("MM/DD/YYYY"),
	    	endDate: val.endDate.format("MM/DD/YYYY"),
	    	dateRangeString: val.startDate.format("DD/MM/YYYY") + 
	    	' - ' + val.endDate.format("DD/MM/YYYY")
		});
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


  	render() {
  		const { name, startDate, endDate, dateRangeString, regionListing, zone, delivery_region, deliveryregion} = this.state;
	    return (
			<form name="filter" onSubmit={this.submit.bind(this)}  onChange={this.handleChange.bind(this)} >
	            <div className="row filter-block">
		           <div className="col-sm-12 col-md-12 col-xl-12 align-self-center">
		            <div className="row">
		                <div className="col-sm-3 col-lg-4 col-xl-3">
	                  	<div className="form-group">
	                    	<label>Rider Name</label>
	                    	<input type="text" name="name" className="form-control" placeholder="eg. Alpha" value={name} />
	                  	</div>
	                </div>

	                <div className="col-sm-3 col-lg-4 col-xl-3">
	                 	<div className="form-group calender-block">
	                    	<label>Choose Filter Date</label>
	                    	<DateRangePicker startDate={startDate} endDate={endDate}  onApply={this.onApply}>
						        <input type="text" value={dateRangeString} />
						    </DateRangePicker>
	                 	</div>
	              	</div>
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

export default withRouter(RiderFilter)