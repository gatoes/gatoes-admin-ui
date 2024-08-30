import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import {getCurrencySymbol} from '../../utilities';
import { toast } from 'react-toastify';
import moment from 'moment';
import Modal from '../../Modal';
import {PAYOUT_REQUEST_STATUS} from "../../constants";
import HandleMerchantPayoutRequest from './HandleMerchantPayoutRequest';
import ShopTransactionDetail from '../shops/ShopTransactionDetail';

class PayoutRequestSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
    this.manageRequest = this.manageRequest.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.showTransaction = this.showTransaction.bind(this);
  }

  manageRequest(shopId, index){
    const {slideData} = this.props;
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Manage Request</h4>}
              body={<HandleMerchantPayoutRequest shopId={slideData.shop_id} index={index} requestId={slideData.id} refreshData={this.refreshData}  />}
            />
    });
  }

  showTransaction(shopId, index){
    window.getFooter().setState({
      renderElement: <Modal 
        id="business-detail-modal"
        show={true}
        onHide={this.hide}
        header={<h4 className="modal-title">Transactions</h4>}
        body={<ShopTransactionDetail shopId={shopId} index={index}  />}
      />
    });
  }

  hide(){
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    window.getFooter().setState({
        renderElement: null
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  refreshData(){
    this.hide();
    this.props.reload();
  }

	render() {
      const { slideData, index, srno } = this.state;
      let currency = getCurrencySymbol();

      let pendingAmount = slideData && slideData.pendingAmount ? parseFloat(slideData.pendingAmount) : 0;
      let amount = slideData.amount ? parseFloat(slideData.amount) : 0;
      let balance = slideData.balance ? parseFloat(slideData.balance) : 0;

      return (
        <>
        <tr key={slideData.id}>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{slideData.id}</td>
          <td>{parseInt(slideData.type) ? 'Fast-track payout charges' : 'Normal Payout charges'} {slideData.transaction_charge ? "(charges:"+ currency + slideData.transaction_charge + ')' : null}   </td>
          <td>{slideData && slideData.shopName ? slideData.shopName : null}</td>
          <td>{moment(slideData.created_at).format('lll')}</td>
          <td>
            {
              slideData.last_payout_date
              ?
              moment(slideData.last_payout_date).format('lll')
              :
              null
            }
          </td>
          {/*}
          <td>
            {
              slideData.processed_at 
              ? 
              moment(slideData.processed_at).format('lll') 
              : 
                slideData.lastPaid
                ?
                moment(slideData.lastPaid).format('lll') 
                :
                'Not Available'
            }
          </td>
        */}
          <td>{ currency + amount.toFixed(2) }</td>
          <td>
            {
              slideData && slideData.status == 1
              ?
              currency + pendingAmount.toFixed(2)
              :
              currency + balance.toFixed(2)
            }
          </td>
          <td>
            {
              slideData.status == 1
              ?
              <a href="javascript:void(0)" className="add-money" onClick={() => this.manageRequest()}>
                {slideData.status ? PAYOUT_REQUEST_STATUS[slideData.status - 1].label : null}
              </a>
              :
              slideData.status ? PAYOUT_REQUEST_STATUS[slideData.status - 1].label : null
            }
            
          </td>
          <td><a href="javascript:void(0)" className="add-money" onClick={() => this.showTransaction(slideData.shop_id, index)}>View Transactions</a></td>
        </tr>
        </>
    	);
  	}
}

export default PayoutRequestSlide;