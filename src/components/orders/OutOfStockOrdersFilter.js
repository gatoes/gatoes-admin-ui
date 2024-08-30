import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
const queryString = require('query-string');

class OutOfStockOrdersFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	      	orderId: '',
	      	shopName: '',
	      	contactNumber:'',
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
  		const {orderId, regionListing, zone, delivery_region, deliveryregion, shopName, contactNumber, status} = this.state;
  		console.log('111', deliveryregion);
	    return (
			<form name="filter" onSubmit={this.submit.bind(this)} onChange={this.handleChange.bind(this)} >
	            <div className="row filter-block">
	                <div className="col-sm-3">
	                  	<div className="form-group">
	                    	<label>Order id</label>
	                    	<input type="number" name="orderId" className="form-control" value={orderId} />
	                  	</div>
	                </div>
	                <div className="col-sm-3">
	                  	<div className="form-group">
	                    	<label>Restaurant Name</label>
	                    	<input type="text" name="shopName" className="form-control" value={shopName} />
	                  	</div>
	                </div>
	                <div className="col-sm-3">
	                  	<div className="form-group">
	                    	<label>User Contact</label>
	                    	<input type="text" name="contactNumber" className="form-control" value={contactNumber} />
	                  	</div>
	                </div>
	                <div className="col-sm-3">
	                  	<div className="filter-result-block">
	                      	<button className="btn btn1" onClick={this.filterResult}><i className="material-icons">filter_list</i>Filter Result</button>
	                  	</div>
	                </div>
	            </div>
	        </form>
	    );
	}
}

export default withRouter(OutOfStockOrdersFilter)