import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import {OPENING_CLOSING_TIME, OPENING_TIME} from "../../constants";
const queryString = require('query-string');

class RegionFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	      name: '',
	      startTime : 0,
	      endTime: 0,
	      ...filters
	    };
	}

	componentWillMount(){
		this.props.getFilterFields({...this.state});
	}

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
  			[name]: value
  		});
  	}


  	render() {
  		const {name, startTime, endTime} = this.state;
  		console.log({name, startTime, endTime});
	    return (
			<form name="filter" onSubmit={this.submit.bind(this)} onChange={this.handleChange.bind(this)} >
	            <div className="row filter-block">
	            	<div className="col-sm-12 col-md-12 align-self-center">
		              	<div className="row">
		                	<div className="col-sm-3 col-lg-4 col-xl-2">
			                  	<div className="form-group">
			                    	<label>Name</label>
			                    	<input type="text" name="name" className="form-control" value={name} placeholder="eg. Mohali" />
			                  	</div>
			                </div>
			                <div className="col-sm-3 col-lg-4 col-xl-2">
			                  	<div className="form-group">
			                    	<label>Start Time</label>
			                    	<div className="select-ui">
			                    	<select className="form-control selectbox-block" name="startTime"  value={startTime}>
			                      		<option value="0">start time</option>
				                      	{
				                        	OPENING_TIME.map((obj, index) => (
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

export default withRouter(RegionFilter)