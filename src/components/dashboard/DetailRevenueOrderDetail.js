import React, { Component, Suspense } from 'react';
import {getDetailOrderAnalytics} from '../../actions/orders';
import {currencyFormat } from '../../constants';
import moment from 'moment';
import Pagination from "react-js-pagination";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { CSVLink, CSVDownload } from "react-csv";
import {getCurrencySymbol} from '../../utilities';

class DailyRevenueOrderDetail extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	    	orderRevenues: [],
	    	activePage: 1,
	    	startDate: moment().subtract(6, "days").format("MM/DD/YYYY"),
	    	endDate: moment().format("MM/DD/YYYY"),
	    	dateRangeString: moment().subtract(6, "days").format("DD/MM/YYYY") + 
	    	' - ' + moment().format("DD/MM/YYYY"),
	    	startDownload: null
	    };
	    this.handlePageChange = this.handlePageChange.bind(this);
	    this.onApply = this.onApply.bind(this);
	    this.filterResult = this.filterResult.bind(this);
	    this.downloadResult = this.downloadResult.bind(this);
	}

	componentDidMount(){
	    this.fetchRecords();
	}

	filterResult(){
		this.fetchRecords();	
	}

	downloadResult(){
		getDetailOrderAnalytics({'is_csv': true, 'startDate': this.state.startDate, 'endDate': this.state.endDate}).then((response) => {	
			this.setState({
				startDownload: response
			});
	    });
	}

	onApply(e, val){
		this.setState({
			startDate: val.startDate.format("MM/DD/YYYY"),
	    	endDate: val.endDate.format("MM/DD/YYYY"),
	    	dateRangeString: val.startDate.format("DD/MM/YYYY") + 
	    	' - ' + val.endDate.format("DD/MM/YYYY")
		});
	}

	fetchRecords(page_number=1){
	    getDetailOrderAnalytics({'pageNumber': page_number, 'startDate': this.state.startDate, 'endDate': this.state.endDate}).then((response) => {
	      	this.setState({
	      		orderRevenues: response.data.data
	      	});
	    });
	}

	handlePageChange(pageNumber) {
	    //console.log(`active page is ${pageNumber}`);
	    this.setState({activePage: pageNumber});
	    this.fetchRecords(pageNumber);
	}


  	render() {
  		const {orderRevenues, activePage, startDate, endDate, dateRangeString, startDownload } = this.state;
  		const srno = (activePage-1) * orderRevenues.limit;

  		//console.log('orderRevenues', orderRevenues);
  		
  		if(startDownload !== null){
  			this.setState({
  				startDownload: null
  			});
  			//console.log('startDownload', startDownload.data);
  			return <CSVDownload data={startDownload.data} target="_parent" />
  		}
  		let currecySymbol = getCurrencySymbol();
  		return (
  			<div className="modal-body">
		      	<div className="popup-content-block">
		         	<div className="business-list">
		            	<div className="row filter-block">
		                  	<div className="col-sm-5">
		                     	<div className="form-group calender-block">
		                        	<label>Choose Filter Date</label>
		                        	<DateRangePicker startDate={startDate} endDate={endDate}  onApply={this.onApply}>
								        <input type="text" value={dateRangeString} />
								    </DateRangePicker>
		                     	</div>
		                  	</div>
		                  	<div className="col-sm-3 button-top-margin">
		                  		<div className="filter-result-block">
		                        	<button className="btn btn1" onClick={this.filterResult}>Apply</button>
		                     	</div>
		                  	</div>
		                  	<div className="col-sm-4 button-top-margin">
		                     	<div className="download-block">
		                        	<button className="btn btn2 download-btn" onClick={this.downloadResult}><i className="material-icons">cloud_download</i>Download CSV</button>
		                     	</div>
		                  	</div>
		            	</div>

		            	<div className="row">
		               		<div className="col-sm-12">
		                  		<div className="result-listing">
		                     		<table>
		                        		<thead>
			                              	<tr>
			                                 	<th>#</th>
			                                 	<th>Orders</th>
			                                 	<th>Order Delivered</th>
			                                 	<th>Order Cancelled</th>
			                                 	<th>Revenue</th>
			                              	</tr>
		                        		</thead>
		                        		<tbody>
			                           		{
			                           			orderRevenues && orderRevenues.revenue && orderRevenues.revenue.length>0 && orderRevenues.revenue.map((obj, index) => (
			                           				<tr>
			                           					<td>{ parseInt(srno + parseInt(index+1)) }</td>
			                           					<td>{obj.orderCount}</td>
			                           					<td>{obj.Delivered}</td>
			                           					<td>{obj.Canceled}</td>
			                           					<td>{currecySymbol + obj.revenue}</td>
			                           				</tr>
			                           			))
			                           		}	
		                        		</tbody>
		                     		</table>

		                     		<div className="pagination">
				                        <Pagination
								          	activePage={this.state.activePage}
								          	itemsCountPerPage={orderRevenues.limit}
								          	totalItemsCount={orderRevenues.count ? orderRevenues.count : 0}
								          	pageRangeDisplayed={5}
								          	onChange={this.handlePageChange}
								        />
		                     		</div>
		                  		</div>
		               		</div>
		            	</div>
		         	</div>
		      	</div>
		   	</div>
	    );
  	}
}

export default DailyRevenueOrderDetail;