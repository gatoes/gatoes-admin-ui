import React, { Component, Suspense } from 'react';
import {getZoneNewOldUserData} from '../../actions/orders';
import { CSVLink, CSVDownload } from "react-csv";

class ZoneUserData extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	    	zoneUser: [],
	    	startDownload: null
	    };
	    this.downloadResult = this.downloadResult.bind(this);
	}

	componentDidMount(){
	    this.fetchRecords();
	}

	filterResult(){
		this.fetchRecords();	
	}

	downloadResult(){
		getZoneNewOldUserData({'is_csv': true, 'is_all': true}).then((response) => {	
			console.log("response for csv",response)
			this.setState({
				startDownload: response.data
			});
	    });
	}

	fetchRecords(page_number=1){
	    getZoneNewOldUserData({'is_all': true}).then((response) => {
	      	this.setState({
	      		zoneUser: response.data.data
	      	});
	    });
	}


  	render() {
		console.log("user data check",this.state )
  		const {zoneUser, startDownload } = this.state;
		console.log("zone user",zoneUser,startDownload)
		const zoneUserData = zoneUser.data || [];
  		
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
		            	<div className="row">
		                  	<div className="col-sm-8"></div>
		                  	<div className="col-sm-4">
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
			                                 	<th>Zone</th>
			                                 	<th>New User</th>
			                                 	<th>Old User</th>
			                              	</tr>
		                        		</thead>
		                        		<tbody>
			                           		{
			                           			zoneUserData && zoneUserData.length>0 && zoneUserData.map((obj, index) => (
			                           				<tr>
			                           					<td>{ parseInt(index+1) }</td>
			                           					<td>{obj.name}</td>
			                           					<td>{obj.newUser}</td>
			                           					<td>{obj.oldUser}</td>
			                           				</tr>
			                           			))
			                           		}
		                        		</tbody>
		                     		</table>
		                  		</div>
		                  		<div className="pagination">
				                       
		                     	</div>
		               		</div>
		            	</div>
		         	</div>
		      	</div>
		   	</div>
	    );
  	}
}

export default ZoneUserData;