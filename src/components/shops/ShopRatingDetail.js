import React, { Component, Suspense } from 'react';
import {getShopRating} from '../../actions/shops';
import moment from 'moment';
import Pagination from "react-js-pagination";


class ShopRatingDetail extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	    	shopId: props.shopId,
	    	detail: [],
	    	activePage: 1
	    };
	    this.handlePageChange = this.handlePageChange.bind(this);
	}

	componentDidMount(){
	    this.fetchRecords();
	}

	fetchRecords(page_number=1){
	    getShopRating({'pageNumber': page_number, 'shopId': this.state.shopId}).then((response) => {
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
			                                 	<th>Order Id</th>
			                                 	<th>Driver Rating</th>
			                                 	<th>Packaging Rating</th>
			                                 	<th>Vendor Rating</th>
			                                 	<th>Comment</th>
			                              	</tr>
		                        		</thead>
		                        		
		                        		<tbody>
		                        			{
		                        				detail.orders && detail.orders.length > 0 && detail.orders.map((item, index) => (
                        							<tr key={item.orderId}>
						                              	<td>{ parseInt(parseInt(index+1) + srno)}</td>
						                              	<td>{ item.orderId }</td>
						                              	<td>{item && item.order && item.order.userRating && item.order.userRating.driverRating}</td>
						                              	<td>{item && item.order && item.order.userRating && item.order.userRating.packageRating}</td>
						                              	<td>{item && item.order && item.order.userRating && item.order.userRating.restaurantRating}</td>
						                              	<td>{item && item.order && item.order.userFeedback}</td>
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

export default ShopRatingDetail;