import React, { Component, Suspense } from 'react';
import {withRouter} from 'react-router';
import moment from 'moment';
import Pagination from "react-js-pagination";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import {getShopListing} from '../../actions/shops';
import { regionListing } from '../../actions/regions';
import Select from 'react-select';
import renderReactSelect from '../FormFields/renderReactSelect';
const queryString = require('query-string');

class MerchantFinanceFilter extends Component {
	constructor(props){
	    super(props);
	    const filters = queryString.parse(props.location.search, {arrayFormat: 'bracket'});
	    this.state = {
			shopId: '',
			shopObj: [],
			zoneId: '',
			zoneObj: [],
	      	shopListing: [],
	      	regionListing: [],
	      	startDate: '01/01/2020', //moment().format("MM/DD/YYYY"),
	    	endDate: moment().format("MM/DD/YYYY"),
	    	dateRangeString: '01/01/2020' + 
	    	' - ' + moment().format("MM/DD/YYYY"),
	      	...filters
	    };
	    this.onApply = this.onApply.bind(this);
		this.submit = this.submit.bind(this);
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
    	delete filters.dateRangeString;
    	delete filters.shopListing;
    	delete filters.regionListing;
    	delete filters.shopObj;

    	console.log('e3433434', filters);

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
		const shopId = shopObj.map(shop => shop.value).join(',');
		this.setState({
		  shopId,
		  shopObj
		});
	  };
	
	  handleZoneChange = (zoneObj) => {
		const zoneId = zoneObj.map(zone => zone.value).join(',');
		this.setState({
		  zoneId,
		  zoneObj
		});
	  };
	

  	render() {
  		const { name, startDate, endDate, dateRangeString, shopListing, shopId, regionListing, zoneId, shopObj,zoneObj} = this.state;
		  let shopData = [];
		  let zoneData = [];

  		shopListing && shopListing.length > 0 && shopListing.map((obj, index) => {
          let shop = {value: obj.id, label: obj.shopName};
          shopData.push(shop);
  		})


		  shopListing && shopListing.length > 0 && shopListing.map((obj) => {
			let shop = { value: obj.id, label: obj.shopName };
			shopData.push(shop);
		  });
	  
		  regionListing && regionListing.length > 0 && regionListing.map((obj) => {
			let zone = { value: obj.id, label: obj.name };
			zoneData.push(zone);
		  });


		  const customStyles = {
			multiValue: (base) => ({
			  ...base,
			  backgroundColor: '#e4e7ea', // Customize the background color
			  borderRadius: '5px',
			  padding: '2px'
			}),
			multiValueLabel: (base) => ({
			  ...base,
			  color: '#333', // Customize the text color
			  padding: '3px'
			}),
			multiValueRemove: (base) => ({
			  ...base,
			  cursor: 'pointer',
			  ':hover': {
				color: '#fff',
				backgroundColor: '#e74c3c', // Customize the remove button hover color
				borderRadius: '5px'
			  }
			}),
			control: (base, state) => ({
			  ...base,
			  minHeight: '40px',
			  height: 'auto',
			  overflow: 'visible'
			}),
			valueContainer: (base) => ({
			  ...base,
			  flexWrap: 'wrap',
			  maxHeight: 'none',
			  overflow: 'visible'
			}),
			container: (base) => ({
			  ...base,
			  minHeight: '40px',
			  overflow: 'visible'
			})
		  };


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
                    component={renderReactSelect}
                    placeholder="Choose Shop"
                    isMulti={true}
                    closeMenuOnSelect={false}
                    className="select-ui"
                    parentDivClass="form-group w-45"
                    styles={customStyles}
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
			                <div className="col-sm-3 col-lg-4 col-xl-3">
			                  	<div className="form-group">
			                    	<label>Zone</label>
				                    <Select
                    value={zoneObj}
                    onChange={this.handleZoneChange}
                    options={zoneData}
                    component={renderReactSelect}
                    placeholder="Choose Zone"
                    isMulti={true}
                    closeMenuOnSelect={false}
                    className="select-ui"
                    parentDivClass="form-group w-45"
                    styles={customStyles}
                  />
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

export default withRouter(MerchantFinanceFilter)