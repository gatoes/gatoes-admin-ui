import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
//import {getCurrencySymbol} from '../../utilities';
import { downloadRiderReporting } from '../../actions/deliveryagent';
import { toast } from 'react-toastify';

class BestSellingItemsReportingSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      startDate: props.startDate,
      endDate: props.endDate,
      index: props.index,
      srno: props.srno
    };
    this.downloadRecords = this.downloadRecords.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  downloadRecords(status){
    const {slideData, startDate, endDate} = this.state;
    downloadRiderReporting({driverId : slideData.driverId, startDate: this.props.startDate, endDate: this.props.endDate, sendEmail: status}).then((response) => {
      if(status){
        toast.success(response.data, {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        window.open(response.data, "_blank");
      }
      // console.log('response', response);
      // var fileDownload = require('js-file-download');
      // fileDownload(response.data, 'report.pdf');
    })
  }

	render() {
      const { slideData, index, srno } = this.state;
      return (
        <>
        <tr>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{slideData.itemName}</td>
          <td>{slideData.shopName}</td>
          <td>{slideData.totalItems}</td>
          
        </tr>
        </>
    	);
  	}
}

export default BestSellingItemsReportingSlide;