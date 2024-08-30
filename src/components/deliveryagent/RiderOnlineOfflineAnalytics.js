import React, { Component, Suspense } from 'react';
import {getDriverAvailabiltyTimingById} from '../../actions/deliveryagent';
import moment from 'moment';
import Pagination from "react-js-pagination";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

class RiderOnlineOfflineAnalytics extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	    	detail: [],
	    	driverId: props.driverId,
	    	activePage: 1,
	    	startDate: moment().subtract(6, "days").format("MM/DD/YYYY"),
	    	endDate: moment().format("MM/DD/YYYY"),
	    	dateRangeString: moment().subtract(6, "days").format("DD/MM/YYYY") + 
	    	' - ' + moment().format("DD/MM/YYYY")
	    };
	    this.handlePageChange = this.handlePageChange.bind(this);
	    this.onApply = this.onApply.bind(this);
	    this.filterResult = this.filterResult.bind(this);
	}

	componentDidMount(){
	    this.fetchRecords();
	}

	filterResult(){
		this.fetchRecords();	
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
	    getDriverAvailabiltyTimingById({'pageNumber': page_number, 'startDate': this.state.startDate, 'endDate': this.state.endDate, 'id': this.state.driverId}).then((response) => {
	      	this.setState({
	      		detail: response.data.data
	      	});
	    });
	}

	handlePageChange(pageNumber) {
	    //console.log(`active page is ${pageNumber}`);
	    this.setState({activePage: pageNumber});
	    this.fetchRecords(pageNumber);
	}


  	render() {
  		const {detail, activePage, startDate, endDate, dateRangeString, startDownload } = this.state;
  		const srno = (activePage-1) * detail.limit;
  		console.log('detail', detail);
  		
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
		            	</div>

		            	<div className="row">
		               		<div className="col-sm-12">
		                  		<div className="result-listing">
		                     		<table>
		                        		<thead>
			                              	<tr>
			                                 	<th>#</th>
			                                 	<th>Date</th>
			                                 	<th>Start Date</th>
			                                 	<th>End Date</th>
			                                 	<th>Operational Time(mins)</th>
			                              	</tr>
		                        		</thead>
		                        		<tbody>
		                        			
			                           		{
			                           			detail && detail.data && detail.data.length>0 && detail.data.map((obj, index) => (
			                           				<tr key={obj.id}>
			                           					<td>{ parseInt(srno + parseInt(index+1)) }</td>
			                           					<td>{moment(obj.date).format('llll')}</td>
			                           					<td>{moment(obj.in_time).format('llll')}</td>
			                           					<td>{obj.out_time != null ? moment(obj.out_time).format('llll') : ''}</td>
			                           					<td>{obj.time_difference}</td>
			                           				</tr>
			                           			))
			                           		}
			                           	
		                        		</tbody>
		                     		</table>
		                     		
		                     		<div className="pagination">
				                        <Pagination
								          	activePage={this.state.activePage}
								          	itemsCountPerPage={detail.limit ? detail.limit : 20}
								          	totalItemsCount={detail.total ? detail.total : 0}
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

export default RiderOnlineOfflineAnalytics;