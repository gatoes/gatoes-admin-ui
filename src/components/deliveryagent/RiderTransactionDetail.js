import React, { Component, Suspense } from 'react';
import {getRiderTransactions} from '../../actions/deliveryagent';
import {getCurrencySymbol} from '../../utilities';
import {RIDER_PAYMENT_STATUS} from '../../constants';
import moment from 'moment';
import Pagination from "react-js-pagination";
import { CSVLink, CSVDownload } from "react-csv";
import UpdateCollectCashRider from "../reporting/UpdateCollectCashRider";
import Modal from '../../Modal';
import { toast } from 'react-toastify';

class RiderTransactionDetail extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	    	riderId: props.riderId,
	    	detail: [],
	    	activePage: 1,
      		startDownload: null
	    };
	    this.handlePageChange = this.handlePageChange.bind(this);
	    this.downloadResult = this.downloadResult.bind(this);
	    this.updateCollectCash = this.updateCollectCash.bind(this);
	    this.updateUserData = this.updateUserData.bind(this);
	}

	downloadResult(){
	    getRiderTransactions({'is_csv': true, 'driverId': this.state.riderId}).then((response) => {	
			this.setState({
				startDownload: response
			});
	    });
	  }

	componentDidMount(){
	    this.fetchRecords();
	}

	fetchRecords(page_number=1){
	    getRiderTransactions({'pageNumber': page_number, 'driverId': this.state.riderId}).then((response) => {
	      	this.setState({
	      		detail: response.data.data
	      	});
	    });
	}

	handlePageChange(pageNumber) {
	    console.log(`active page is ${pageNumber}`);
	    this.setState({activePage: pageNumber});
	    this.fetchRecords(pageNumber);
	}

	updateCollectCash(driverId, amount, id, index){
	    window.getFooter().setState({
	      renderElement: <Modal 
	              id="add-new-category"
	              show={true}
	              onHide={this.hide}
	              header={<h4 className="modal-title">Update Collection</h4>}
	              body={<UpdateCollectCashRider driverId={driverId} index={index} id={id} updateUserData={this.updateUserData} amount={amount}  />}
	            />
	    });
	}

	updateUserData(){
	    //this.fetchRecords();
	    //slideData.shop_status = status;
	    toast.success('Cash collected successfully.', {
	      position: toast.POSITION.TOP_RIGHT
	    });  
	    window.location.reload();
	    window.$$('body').removeClass('modal-open');
	    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
	    this.hide();
	}

  	hide(){
	    window.getFooter().setState({
	        renderElement: null
	    });
	 }

  	render() {
  		const {detail, activePage, startDownload } = this.state;
  		const srno = (activePage-1) * detail.limit;
  		let currecySymbol = getCurrencySymbol();
  		
  		if(startDownload !== null){
	      	this.setState({
	        	startDownload: null
	      	});
	      	return <CSVDownload data={startDownload.data} target="_parent" />
	    }

  		return (
  			<div className="modal-body">
		      	<div className="popup-content-block">
		         	<div className="business-list">
		            	
		            	<div className="download-block">
                    		<button className="btn btn2 download-btn" onClick={this.downloadResult}><i className="material-icons">file_download</i>Download CSV</button>
                		</div>

		            	<div className="row">
		               		<div className="col-sm-12">
		                  		<div className="result-listing">
		                     		<table>
		                        		<thead>
			                              	<tr>
			                                 	<th>#</th>
			                                 	<th>Date</th>
			                                 	<th>Message</th>
			                                 	<th>Amount</th>
			                                 	<th>Type</th>
			                                 	<th>Cashier</th>
			                                 	<th>Edit</th>
			                              	</tr>
		                        		</thead>
		                        		<tbody>
		                        			{
		                        				detail.transaction && detail.transaction.length > 0 && detail.transaction.map((item, index) => (
                        							<tr key={item.id}>
						                              	<td>{ parseInt(parseInt(index+1) + srno)}</td>
						                              	<td>{ moment(item.transactionAt).format('llll') }</td>
						                              	<td>{item.message ? item.message : null}</td>
						                              	<td>{currecySymbol + item.amount}</td>
						                              	<td>{RIDER_PAYMENT_STATUS[item.type].label}</td>
						                              	<td>
						                              		{ 
						                              			item.type == "0" && item.collectedBy ? item.collectedBy : null  
						                              		}
						                              	</td>

						                              	<td>
						                              		{ 
						                              			item.type == "0" && localStorage.getItem('hasAllAccess') == 'true'
						                              			?
						                              			<a href="javascript:void(0)" className="add-money" onClick={() => this.updateCollectCash(this.state.riderId, item.amount, item.id, index)}>Edit Deposit Cash</a>
						                              			:
						                              			null
						                              		}
						                              	</td>

						                            </tr>
						                        ))
		                        			}
			                           		
		                        		</tbody>
		                     		</table>

		                     		<div className="pagination">
				                        <Pagination
								          	activePage={this.state.activePage}
								          	itemsCountPerPage={detail.limit}
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

export default RiderTransactionDetail;