import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import moment from 'moment';
import Pagination from "react-js-pagination";
import { regionListing } from '../../actions/regions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const queryString = require('query-string');

class CustomerFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	    	regionListing : [],
	    	startDate: null,
	    	zone: 0,
	    	name: '',
	    	unique_id:'',
	    	phone_number: '',
	      	...filters
	    };
	    this.changeDatePanel = this.changeDatePanel.bind(this);
	}

	changeDatePanel(date) {
	    this.setState({
	      startDate: date
	    });
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
    	delete filters.dateRangeString;
    	delete filters.pageNumber;
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
  		const { regionListing, zone, name, unique_id, phone_number, startDate} = this.state;
	    return (
			<form name="filter" onSubmit={this.submit.bind(this)}  onChange={this.handleChange.bind(this)} >
	            <div className="row filter-block">
		           <div className="col-sm-12 col-md-12 col-xl-12 align-self-center">
			            <div className="row">
			                <div className="col-sm-3 col-lg-4 col-xl-3">
			                  	<div className="form-group">
			                    	<label>Unique Id</label>
			                    	<input type="text" name="unique_id" className="form-control" placeholder="eg. 00000786" value={unique_id} />
			                  	</div>
			                </div>
			                <div className="col-sm-3 col-lg-4 col-xl-3">
			                  	<div className="form-group">
			                    	<label>User Name</label>
			                    	<input type="text" name="name" className="form-control" placeholder="eg. Alpha" value={name} />
			                  	</div>
			                </div>
			                <div className="col-sm-3 col-lg-4 col-xl-3">
			                  	<div className="form-group">
			                    	<label>Contact Number</label>
			                    	<input type="text" name="phone_number" className="form-control" placeholder="eg. 987678987" value={phone_number} />
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

			                <div className="col-sm-3 col-lg-4 col-xl-3">
		              			<div className="form-group calender-block">
	                    			<label>Choose Date</label>
				                    <DatePicker
				                      name="startDate"
				                      selected={this.state.startDate}
				                      onChange={this.changeDatePanel}
				                      dateFormat= "yyyy-MM-dd"
				                    />
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

export default withRouter(CustomerFilter)