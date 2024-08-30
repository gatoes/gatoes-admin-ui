import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import {getCurrencySymbol} from '../../utilities';
import { downloadMerchantReporting } from '../../actions/shops';
import { toast } from 'react-toastify';

class MerchantReportingSlide extends Component {
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
      status: nextProps.status,
      index: nextProps.index
    });
  }

  downloadRecords(status, type){
    const {slideData, startDate, endDate} = this.state;
    downloadMerchantReporting({shopId : slideData.shopId, startDate: this.props.startDate, endDate: this.props.endDate, sendEmail: status, type: type}).then((response) => {
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
      console.log('slideData', slideData);
      let currency = getCurrencySymbol();
      var acceptedRate = ((slideData.orderAccepted/slideData.orderRequested)*100).toFixed(2);
      var rejectedRate = (100 - acceptedRate).toFixed(2);
      var wastedRate = ((slideData.wastedOrders/slideData.orderRequested)*100).toFixed(2);
      var totalTax = slideData.totalTax ? slideData.totalTax : 0;
      var packagingCharge = slideData.packagingCharge ? slideData.packagingCharge : 0;

      var deliveryCharge = slideData.deliveryCharge ? slideData.deliveryCharge : 0;
      var merchantDeliveryCharge = slideData.merchantDeliveryCharges ? slideData.merchantDeliveryCharges : 0;
      var discountGivenAdmin = slideData.discountGivenAdmin ? slideData.discountGivenAdmin : 0;
      var discountGivenMerchant = slideData.discountGivenMerchant ? slideData.discountGivenMerchant : 0;
      var subTotal = slideData.subTotal ? slideData.subTotal : 0;
      var walletUsed = slideData.walletUsed ? slideData.walletUsed : 0;

      console.log(slideData,"slideData7777")
      return (
        <>
        <tr key={slideData.shopId}>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{slideData.unique_id ? slideData.unique_id: null}</td>
          <td>{slideData.shopName}</td>
          <td>{slideData.orderRequested}</td>
          <td>{slideData.orderAccepted}</td>
          <td>{slideData.orderCompleted}</td>
          <td>{slideData.orderCancelled}</td>
          <td>{slideData.orderOutofstock}</td>
          <td>{slideData.totalTaxes ? currency+ slideData.totalTaxes : 0 }</td>
          <td>{subTotal ? currency+ subTotal.toFixed(2) : 0}</td>
          <td>{slideData.totalCollection ? currency+ slideData.totalCollection.toFixed(2) : 0}</td>
          <td>{walletUsed ? currency+ walletUsed.toFixed(2) : 0}</td>
          <td>{packagingCharge ? currency+ packagingCharge.toFixed(2) : 0}</td>
          <td>{slideData.platformFee ? currency+ slideData.platformFee.toFixed(2)  : 0}</td>

          <td>{deliveryCharge ? currency+ deliveryCharge.toFixed(2) : 0}</td>
          <td>{merchantDeliveryCharge ? currency+ merchantDeliveryCharge.toFixed(2) : 0}</td>
          <td>{discountGivenMerchant ? currency+ discountGivenMerchant.toFixed(2) : 0}</td>
          <td>{discountGivenAdmin ? currency+ discountGivenAdmin.toFixed(2) : 0}</td>
          <td>{slideData.merchantCollection ? currency+ slideData.merchantCollection.toFixed(2) : 0 }</td>
          <td>{slideData.clientCommission ? currency+ slideData.clientCommission.toFixed(2) : 0 }</td>
          <td>{ acceptedRate }</td>
          <td>{ rejectedRate }</td>
          <td>{slideData.driverRating ? (slideData.driverRating).toFixed(2) : 0}</td>
          <td>{slideData.userRating ? (slideData.userRating).toFixed(2) : 0}</td>

          
          <td>
            <a href="javascript:void(0)" onClick={() => this.downloadRecords(false, 1)}>Download Report</a> | <a href="javascript:void(0)" onClick={() => this.downloadRecords(true, 1)}>Email Report</a>
          </td>
          <td>
            <a href="javascript:void(0)" onClick={() => this.downloadRecords(false, 2)}>Download Invoice</a> | <a href="javascript:void(0)" onClick={() => this.downloadRecords(true, 2)}>Email Invoice</a>
          </td>
        </tr>
        </>
    	);
  	}
}

export default MerchantReportingSlide;