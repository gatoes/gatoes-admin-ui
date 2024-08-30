import React, { Component, Suspense } from 'react';
import {getUserWalletTransactions} from '../../actions/users';
import {getCurrencySymbol} from '../../utilities';
import moment from 'moment';
import Pagination from "react-js-pagination";

class TransactionDetail extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	    	userId: props.userId,
	    	detail: [],
	    	activePage: 1
	    };
	    this.handlePageChange = this.handlePageChange.bind(this);
	}

	componentDidMount(){
	    this.fetchRecords();
	}

	fetchRecords(page_number=1){
	    getUserWalletTransactions({'pageNumber': page_number, customerId: this.state.userId}).then((response) => {
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
  		const {detail, activePage } = this.state;
  		const srno = (activePage-1) * detail.limit;
  		let currecySymbol = getCurrencySymbol();

  		return (
  			<div className="modal-body">
		      	<div className="popup-content-block">
		         	<div className="business-list">
		            	

		            	<div className="row">
		               		<div className="col-sm-12">
		                  		<div className="result-listing">
		                     		<table>
		                        		<thead>
			                              	<tr>
			                                 	<th>#</th>
			                                 	<th>Date</th>
			                                 	<th>Reason</th>
			                                 	<th>Amount</th>
			                                 	<th>Type</th>
			                              	</tr>
		                        		</thead>
		                        		<tbody>
		                        			{
		                        				detail.shop && detail.shop.length > 0 && detail.shop.map((item, index) => (
                        							<tr key={item.id}>
						                              	<td>{ parseInt(parseInt(index+1) + srno)}</td>
						                              	<td>{ moment(item.date).format('llll') }</td>
						                              	<td>{item.message}</td>
						                              	<td>{currecySymbol + item.amount}</td>
						                              	<td>{item.status ? 'Add Fund' : 'Reduce Fund'}</td>
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

export default TransactionDetail;