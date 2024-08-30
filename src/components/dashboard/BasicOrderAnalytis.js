import React, { Component } from 'react';
import {getBasicOrderAnalytics} from '../../actions/orders';
import BasicOrderAnalytisGraph from './BasicOrderAnalytisGraph';
import DetailRevenueOrderDetail from './DetailRevenueOrderDetail';
import Modal from '../../Modal';
import NumberFormat from 'react-number-format';

class BasicOrderAnalytis extends Component {
  	constructor(props){
	    super(props);
	    this.state = {
	    	orderRecords: '',
	      	activeMenu: 'dayz',
	      	type: 1
	    };
	    this.toggle = this.toggle.bind(this);
	}

	toggle(e, activeMenu, type){
		e.preventDefault();
		this.setState({
			activeMenu
		});
		this.fetchRecords(type);
	}

	componentDidMount(){
	    this.fetchRecords(this.state.type);
	}

	fetchRecords(type){
	    getBasicOrderAnalytics({dayz: type}).then((response) => {
	      	this.setState({
	      		orderRecords: response.data.data
	      	});
	    });
	}

	detailRevenueOrderDetail(e){
      	window.getFooter().setState({
	        renderElement: <Modal 
	                id="business-detail-modal"
	                show={true}
	                onHide={this.hide}
	                header={<h4 className="modal-title">Revenue & Orders</h4>}
	                body={<DetailRevenueOrderDetail />}
	              />
      	});
    }

    hide(){
      	window.getFooter().setState({
          	renderElement: null
      	});
    }

  	render() {
  		const {activeMenu, orderRecords} = this.state;
    	return (
    		<div className="col-sm-4 col-md-4">
                <div className="white-bg-ui od-ui-block">
                   	<div className="heading-wrapper"> 
                   		<div className="heading-block">
                   	 		<label className="in-title">orders</label>
                     		<span className="ic-calender">
                     			<a href="javascript:;" className="rtext-btn" onClick={this.detailRevenueOrderDetail.bind(this)}>MORE Details</a>
                     		</span>
                    	</div>
                      	<div className="tab-heading">
                          	<ul className="nav nav-tabs">
                                <li><a className={`${activeMenu == 'dayz' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'dayz', 1)}>Today</a>
		                     	</li>
		                     	<li><a className={`${activeMenu == 'week' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'week', 7)}>Last 7 Days</a>
		                     	</li>
		                     	<li><a className={`${activeMenu == 'month' ? "active" : ""}`} href="javascript:void(0);" onClick={(e)=>this.toggle(e, 'month', 30)}>Last 30 Days</a>
		                     	</li>
                            </ul>
                      	</div>
                    </div>

                    <div className="cs-tab-ui">
                        <div className="tab-content">
                          	<div className="tab-pane100">
                            	<div className="panel panel-default">
                              		<div className="panel-heading">
                                		<h4 className="panel-title">
                                  			<a data-toggle="collapse" data-parent=".tab-pane" href="#collapseOne">
			                                    Today
			                                </a>
                                		</h4>
                              		</div>
		                            <div id="collapseOne" className="panel-collapse collapse in">
		                                <div className="panel-body">
		                                    <div className="inner-content-ui">
		                                        <div className="revenue-content-block">
		                                            <div className="left-block tr-value">
		                                              	<h5>{orderRecords.orderCount}</h5>
		                                              	<span className="percentage-text">
		                                              		{
		                                              			orderRecords.orderChange >= 0
		                                              			?
		                                              			<>
		                                              			<span className="icon-ic_arrow_up"></span>
		                                              			{orderRecords.orderChange.toFixed(2) + "%"}
		                                              			</>
		                                              			:
		                                              			<>
		                                              			<span className="icon-ic_arrow_down1"></span>
		                                              			{ (orderRecords.orderChange*-1).toFixed(2) + "%"}
		                                              			</>
		                                              		}
		                                              	</span>
		                                              	<p>Total orders</p>
		                                            </div>
		                                            <div className="right-block tr-value">
		                                              	<h5>
		                                              		<NumberFormat value={orderRecords.revenue && orderRecords.revenue.toFixed(2)} displayType={'text'} thousandSeparator={true} />
		                                              	</h5>
		                                              	<span className="percentage-text">
		                                              		{
		                                              			orderRecords.revenueChange >= 0
		                                              			?
		                                              			<>
		                                              			<span className="icon-ic_arrow_up"></span>
		                                              			{orderRecords.revenueChange.toFixed(2) + "%"}
		                                              			</>
		                                              			:
		                                              			<>
		                                              			<span className="icon-ic_arrow_down1"></span>
		                                              			{ (orderRecords.revenueChange*-1).toFixed(2) + "%"}
		                                              			</>
		                                              		}
		                                              	</span>
		                                              	<p>Revenue</p>
		                                            </div>

		                                            <div className="revenue-list-ui">
		                                                <ul>
	                                                      	<li> <p>{orderRecords.Delivered}</p> <span>Delivered</span> </li>
	                                                      	<li> <p>{orderRecords.Canceled}</p> <span>Canceled</span> </li>
	                                                      	<li> <p>{orderRecords.Ongoing}</p> <span>Ongoing</span> </li>
	                                                    </ul>
		                                            </div>
		                                        </div>
		                                    </div>
		                                    <BasicOrderAnalytisGraph orderData={orderRecords.colorConstant} />
	                                	</div>
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
export default BasicOrderAnalytis;