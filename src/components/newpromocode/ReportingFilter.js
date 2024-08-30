import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import moment from 'moment';
import Pagination from "react-js-pagination";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import {getShopListing} from '../../actions/shops';
import { regionListing } from '../../actions/regions';
import Select from 'react-select';
const queryString = require('query-string');

class ReportingFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
	      	status:0,
	      	shopId : 0,
	      	shopObj: null,
	      	// zoneId: 0,
	      	shopListing: [],
	      	regionListing: [],
	      	startDate: null,
	    	endDate: null,
	    	// dateRangeString: moment().format("MM/DD/YYYY") + 
	    	// ' - ' + moment().format("MM/DD/YYYY"),
	      	...filters
	    };
	    this.onApply = this.onApply.bind(this);
	}

	componentDidMount(){
	    getShopListing({is_all: true}).then((response) => {
	      this.setState({
	        shopListing: response.data.data
	      })
	    });

	    regionListing({status: 1}).then((response) => {
	      this.setState({
	        regionListing: response.data.data.region
	      });
	    });
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
    	delete filters.regionListing;
    	delete filters.shopObj;
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

  	handleShopChange = (shopObj) => {
	    this.setState({
	    	shopId: shopObj.value,
	    	shopObj
	    }, () =>
	      console.log(`Option selected:`, this.state.shopObj)
	    );
	};

  	render() {
  		const { name, startDate, endDate, dateRangeString, shopListing, shopId, regionListing, zoneId, shopObj} = this.state;
  		let shopData = [];

  		shopListing && shopListing.length > 0 && shopListing.map((obj, index) => {
          let shop = {value: obj.id, label: obj.shopName};
          shopData.push(shop);
  		})

	    return (
			<form name="filter" onSubmit={this.submit.bind(this)} onChange={this.handleChange.bind(this)}  >
	            <div className="row filter-block">
	                <div className="col-sm-12 col-md-12 col-xl-12 align-self-center">
	              		<div className="row">
	              			<div className="col-sm-3 col-lg-4 col-xl-3">
			                  	<div className="form-group">
			                    	<label>Shop</label>
				                    <Select
								        value={shopObj}
								        onChange={this.handleShopChange}
								        options={shopData}
								        placeholder="Choose Shop"
								    />
			                  	</div>
			                </div>
			                {/*}
			                <div className="col-sm-3 col-lg-4 col-xl-3">
			                  	<div className="form-group">
			                    	<label>Shop</label>
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
			            	*/}
			                {/* <div className="col-sm-3 col-lg-4 col-xl-3">
			                  	<div className="form-group">
			                    	<label>Zone</label>
				                    <select className="form-control selectbox-block" name="zoneId" value={zoneId}>
				                      <option value="0">Choose Zone</option>
				                      {
				                        regionListing && regionListing.length > 0 && regionListing.map((obj, index) => (
				                          <option value={obj.id}>{obj.name}</option>
				                        ))
				                      }
				                    </select>
			                  	</div>
			                </div> */}
			                {/* <div className="col-sm-3 col-lg-4 col-xl-3">
			                 	<div className="form-group calender-block">
			                    	<label>Choose Filter Date</label>
			                    	<DateRangePicker startDate={startDate} endDate={endDate}  onApply={this.onApply}>
								        <input type="text" value={dateRangeString} />
								    </DateRangePicker>
			                 	</div>
			              	</div> */}
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

export default withRouter(ReportingFilter)