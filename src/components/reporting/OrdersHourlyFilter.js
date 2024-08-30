import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import moment from 'moment';
import Pagination from "react-js-pagination";
//import DateRangePicker from 'react-bootstrap-daterangepicker';
//import 'bootstrap-daterangepicker/daterangepicker.css';
import {getShopListing} from '../../actions/shops';
//import { OPENING_CLOSING_TIME} from '../../constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const queryString = require('query-string');


class OrderFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	      	// startTime : 0,
	      	// endTime: 0,
	      	startDate: new Date(),
	     //  	startDate: moment().format("MM/DD/YYYY"),
	    	// endDate: moment().format("MM/DD/YYYY"),
	    	// dateRangeString: moment().format("MM/DD/YYYY") + 
	    	// ' - ' + moment().format("MM/DD/YYYY"),
	      	...filters
	    };
	    //this.onApply = this.onApply.bind(this);
	    this.changeDatePanel = this.changeDatePanel.bind(this);
	}

	changeDatePanel(date) {
	    this.setState({
	      startDate: date
	    });
	}

	// componentWillMount(){
	// 	this.props.getFilterFields({...this.state});
	// }

	// onApply(e, val){
	// 	this.setState({
	// 		startDate: val.startDate.format("MM/DD/YYYY"),
	//     	endDate: val.endDate.format("MM/DD/YYYY"),
	//     	dateRangeString: val.startDate.format("DD/MM/YYYY") + 
	//     	' - ' + val.endDate.format("DD/MM/YYYY")
	// 	});
	// }

  	submit(e){
    	e.preventDefault();
    	this.props.history.push({
            pathname: this.props.location.pathname,
            search: "?" + window.$$.param({...this.state})
        });
    	this.props.getFilterFields({...this.state});
  	}

  	handleChange(event){
  		const {name, value} = event.target;
  		this.setState({
  			[name]: value,
  		});
  	}

  	render() {
  		const { startDate } = this.state;
	    return (
			<form name="filter" onSubmit={this.submit.bind(this)} onChange={this.handleChange.bind(this)}  >
	            <div className="row filter-block">
	                <div className="col-sm-12 col-md-12 col-xl-12 align-self-center">
	              		<div className="row">
	              			<div className="col-sm-3 col-lg-4 col-xl-3">
		              			<div className="form-group calender-block">
	                    			<label>Choose Date</label>
				                    <DatePicker
				                      name="available_date"
				                      selected={this.state.startDate}
				                      onChange={this.changeDatePanel}
				                      dateFormat= "yyyy-MM-dd"
				                    />
				                </div>
			            	</div>


	                 		{/*
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
			                    	<label>Start Time</label>
			                    	<div className="select-ui">
			                    	<select className="form-control selectbox-block" name="startTime"  value={startTime}>
			                      		<option value="0">start time</option>
				                      	{
				                        	OPENING_CLOSING_TIME.map((obj, index) => (
				                          	<option value={obj.value}>{obj.label}</option>
				                        	))
				                      	}
			                    	</select>
			                    	</div>
			                  	</div>
			                </div>
			                <div className="col-sm-3 col-lg-4 col-xl-2">
			                  	<div className="form-group">
			                    	<label>End Time</label>
			                    	<div className="select-ui">
				                    <select className="form-control selectbox-block" name="endTime"  value={endTime}>
				                      <option value="0">end time</option>
				                      {
				                        OPENING_CLOSING_TIME.map((obj, index) => (
				                          <option value={obj.value}>{obj.label}</option>
				                        ))
				                      }
				                    </select>
				                    </div>
			                  	</div>
			                </div>
							*/}
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

export default withRouter(OrderFilter)