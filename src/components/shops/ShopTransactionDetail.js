import React, { Component, Suspense } from 'react';
import {getShopCash} from '../../actions/shops';
import {getCurrencySymbol} from '../../utilities';
import moment from 'moment';
import Pagination from "react-js-pagination";
import { CSVLink, CSVDownload } from "react-csv";
import {getAclChecks} from '../../utilities';
import { toast } from 'react-toastify';
import UpdateDepositCashShop from './UpdateDepositCashShop';
import Modal from '../../Modal';


class ShopTransactionDetail extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	    	shopId: props.shopId,
	    	detail: [],
	    	activePage: 1,
      		startDownload: null
	    };
	    this.handlePageChange = this.handlePageChange.bind(this);
	    this.downloadResult = this.downloadResult.bind(this);
	    this.updateCollectCash = this.updateCollectCash.bind(this);
	    this.removePanel = this.removePanel.bind(this);
	}

	updateCollectCash(shopId, amount, id, index){
		//this.hide();
	    window.getFooter().setState({
	      renderElement: <Modal 
	              id="add-new-category"
	              show={true}
	              onHide={this.hide}
	              header={<h4 className="modal-title">Update Cash</h4>}
	              body={<UpdateDepositCashShop shopId={shopId} oldAmount={amount} id={id} index={index} removePanel={this.removePanel}  />}
            />
	    });
	}

	removePanel(){
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

	downloadResult(){
	    getShopCash({'is_csv': true, 'shopId': this.state.shopId}).then((response) => {	
			this.setState({
				startDownload: response
			});
	    });
	}

	componentDidMount(){
	    this.fetchRecords();
	}

	fetchRecords(page_number=1){
	    getShopCash({'pageNumber': page_number, 'shopId': this.state.shopId}).then((response) => {
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
			                                 	<th>Amount</th>
			                                 	<th>Cashier</th>
			                                 	<th>Reference Number</th>
			                                 	<th>Action</th>
			                              	</tr>
		                        		</thead>
		                        		
		                        		<tbody>
		                        			{
		                        				detail.data && detail.data.length > 0 && detail.data.map((obj, index) => (
                        							<tr key={obj.id}>
						                              	<td>{ parseInt(parseInt(index+1) + srno)}</td>
						                              	<td>{ moment(obj.date).format('llll') }</td>
						                              	<td>{currecySymbol + obj.amount}</td>
						                              	<td>{obj.addedBy}</td>
						                              	<td>{obj.referenceNumber}</td>
						                              	<td>
												            {
												            ((localStorage.getItem('hasAllAccess') == 'true') && (obj.referenceNumber != 'normal-payout')  && (obj.referenceNumber != 'fasttrack-payout'))
												            ?
												            <a href="javascript:void(0)" className="add-money" onClick={() => this.updateCollectCash(this.state.shopId, obj.amount, obj.id, index)}>Update Deposit Cash</a>
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

export default ShopTransactionDetail;