import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getCurrencySymbol} from '../../utilities';
import moment from 'moment';
import {REFUND_REASON, WHO_BEAR_COST_REFUND_ORDER, TRANSFER_TYPE} from '../../constants';
import { toast } from 'react-toastify';
import {updateRefundStatus} from '../../actions/orders';

class RefundReportingSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      startDate: props.startDate,
      endDate: props.endDate,
      index: props.index,
      srno: props.srno
    };
    this.markClosed = this.markClosed.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      status: nextProps.status,
      index: nextProps.index
    });
  }

  markClosed(){
    const { slideData } = this.state;
    confirmAlert({
      title: '',
      message: "Do you want to mark this transaction closed?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updateRefundStatus({id: slideData._id}).then((response) => {
              this.setState({
                slideData: {...slideData, isOpen: false}
              });
              toast.success('Transaction marked closed successfully.', {
                position: toast.POSITION.TOP_RIGHT
              });
            });
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

  

	render() {
      const { slideData, index, srno } = this.state;
      let currency = getCurrencySymbol();
      return (
        <>
        <tr>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{ slideData && slideData.restaurant && slideData.restaurant.shopName }</td>
          <td>{slideData.orderId}</td>
          <td>{currency}{slideData.refund_amount}</td>
          <td>{slideData && slideData.refundedBy && slideData.refundedBy.name ? slideData.refundedBy.name : null}</td>
          <td> {slideData.other_reason != '' ? slideData.other_reason : REFUND_REASON[slideData.refund_reason].label}</td>
          <td>{TRANSFER_TYPE[slideData.transfer_type].label}</td>
          <td>{WHO_BEAR_COST_REFUND_ORDER[slideData.who_bear_cost].label}</td>
          <td>
            {
              slideData && slideData.isOpen && slideData.isOpen === true
              ? 
              <label><a href="javascript:void(0)" onClick={this.markClosed}>Open</a></label>
              :
              <label>Closed</label>
            }
          </td>
          <td>{ moment(slideData.createdAt).format('llll') }</td>
        </tr>
        </>
    	);
  	}
}

export default RefundReportingSlide;