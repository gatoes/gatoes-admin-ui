import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import { regionListing, deliveryRegionListing } from '../../actions/regions';
import {order_status} from '../../constants';
import {getShopListing} from '../../actions/shops';
const queryString = require('query-string');

class ItemsShopFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	    	shopListing : [],
	    	shopId : 0,
	      	...filters
	    };
	}

	componentDidMount(){
	    getShopListing({is_all: true}).then((response) => {
	      this.setState({
	        shopListing: response.data.data
	      })
	    });
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
  		const { status, shopListing, shopId} = this.state;
	    return (
			<form name="filter" onSubmit={this.submit.bind(this)}  onChange={this.handleChange.bind(this)} >
	            <div className="row filter-block">
	            <div className="col-sm-12 col-md-12 align-self-center">
	              <div className="row">
	                <div className="col-sm-3 col-lg-4 col-xl-2">
	                  	<div className="form-group">
	                    	<label>Shop</label>
	                    	<div className="select-ui">
		                    <select className="form-control selectbox-block" name="shopId" value={shopId}>
		                      <option value="0">Choose shop</option>
		                      {
		                        shopListing && shopListing.length > 0 && shopListing.map((obj, index) => (
		                          <option value={obj.id}>{obj.shopName}</option>
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

export default withRouter(ItemsShopFilter)