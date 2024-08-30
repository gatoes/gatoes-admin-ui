import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
const queryString = require('query-string');

class WalletFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	    	search: '',
	      	startDate: moment().format("MM/DD/YYYY"),
	    	endDate: moment().format("MM/DD/YYYY"),
	    	dateRangeString: moment().format("MM/DD/YYYY") + 
	    	' - ' + moment().format("MM/DD/YYYY"),
	      	...filters
	    };
	    this.onApply = this.onApply.bind(this);
	}

	componentWillMount(){
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
    	delete filters.shopListing;
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
  	}

  	render() {
  		const { name, startDate, endDate, dateRangeString, search} = this.state;
	    return (
			<form name="filter" onSubmit={this.submit.bind(this)} onChange={this.handleChange.bind(this)}  >
	            <div className="row filter-block">
	                <div className="col-sm-12 col-md-12 col-xl-12 align-self-center">
	              		<div className="row">
	              			<div className="col-sm-3 col-lg-4 col-xl-2">
			                  	<div className="form-group">
			                    	<label>User Name</label>
			                    	<input type="text" name="search" className="form-control" value={search} placeholder="eg. Ali" />
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
			              	<div className="col-sm-3 col-md-2 col-xl-2 align-self-center">
			                  	<div className="filter-result-block">
			                      	<button className="btn btn1" onClick={this.filterResult}>Save</button>
			                  	</div>
			                </div>
	                	</div>
	                </div>
	                
	            </div>
	        </form>
	    );
	}
}

export default withRouter(WalletFilter)