import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
//import {getCurrencySymbol} from '../../utilities';
import { downloadRiderReporting } from '../../actions/deliveryagent';
import { toast } from 'react-toastify';

class RidersReportingSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      startDate: props.startDate,
      endDate: props.endDate,
      index: props.index,
      srno: props.srno
    };
    //this.downloadRecords = this.downloadRecords.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  // downloadRecords(status){
  //   const {slideData, startDate, endDate} = this.state;
  //   downloadRiderReporting({driverId : slideData.driverId, startDate: this.props.startDate, endDate: this.props.endDate, sendEmail: status}).then((response) => {
  //     if(status){
  //       toast.success(response.data, {
  //         position: toast.POSITION.TOP_RIGHT
  //       });
  //     } else {
  //       window.open(response.data, "_blank");
  //     }
  //     // console.log('response', response);
  //     // var fileDownload = require('js-file-download');
  //     // fileDownload(response.data, 'report.pdf');
  //   })
  // }

	render() {
      const { slideData, index, srno } = this.state;
      var avg_rate = slideData.rating/slideData.rateCount;
      var rat_perc = (slideData.rateCount/slideData.orderCompleted)*100;
      var accept_rate = (slideData.accepted/slideData.requested)*100;
      return (
        <>
        <tr>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{slideData.unique_id}</td>
          <td>{slideData.driverName}</td>
          <td>{slideData.requested}</td>
          <td>{slideData.accepted}</td>
          <td>{slideData.orderCompleted}</td>
          <td>{slideData.totalAutoAccepted ? slideData.totalAutoAccepted : 0 }</td>
          <td>{accept_rate ? accept_rate.toFixed(2) : 0 }</td>

          <td>{rat_perc ? rat_perc.toFixed(2) : 0}</td>
          <td>{ avg_rate ? avg_rate.toFixed(2) : 0}</td>
        </tr>
        </>
    	);
  	}
}

export default RidersReportingSlide;