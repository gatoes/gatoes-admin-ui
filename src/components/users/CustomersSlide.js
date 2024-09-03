import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import {getCurrencySymbol} from '../../utilities';
import AddMoneyUserWallet from './AddMoneyUserWallet';
import Modal from '../../Modal';
import {WALLET_SUCCESS} from '../../constants';
import {toast} from 'react-toastify';
import TransactionDetail from './TransactionDetail';
import {setCustommerStatus} from '../../actions/users';
import { ACTIVATE_CONFIRMATION, BLOCK_CONFIRMATION, STATUS_UPDATE_SUCCESS } from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Tooltip from '../common/Tooltip';
import {getAclChecks} from '../../utilities';

class CustomersSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
    this.addMoneyWallet = this.addMoneyWallet.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this.setCustommerStatus = this.setCustommerStatus.bind(this);
  }

  addMoneyWallet(userId, amount, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Add money to wallet</h4>}
              body={<AddMoneyUserWallet userId={userId} index={index} updateUserData={this.updateUserData} panel="wallet" current_amount={amount}  />}
            />
    });
  }

  showTransaction(userId, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Transactions</h4>}
              body={<TransactionDetail userId={userId} index={index}  />}
            />
    });
  }

  updateUserData(userId, total){
    const { slideData} = this.state;
    this.setState({
      slideData: {...this.state.slideData, wallet_total: total}
    })
    
    //slideData.shop_status = status;
    toast.success(WALLET_SUCCESS, {
      position: toast.POSITION.TOP_RIGHT
    });  

    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

  setCustommerStatus(dId, index, stats){
    const { slideData } = this.state;
    confirmAlert({
      title: '',
      message: stats === true ? ACTIVATE_CONFIRMATION : BLOCK_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setCustommerStatus({userId: dId, isActive: stats}).then((response) => {
              this.setState({
                slideData: {...slideData, isActive: stats}
              });
              toast.success(STATUS_UPDATE_SUCCESS, {
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
    let currecySymbol = getCurrencySymbol();
    const stats = slideData.isActive ? false : true;
    return (
      <>
      <tr>
        <td>{ parseInt(parseInt(index+1) + srno)}</td>
        <td>{slideData.unique_id}</td>
        <td>{slideData.full_name ? slideData.full_name : null}</td>
        <td>{slideData.email && slideData.email }</td>
        <td>{slideData.phone_number ? "+" + slideData.country_code + ' ' +slideData.phone_number : null}</td>
        
        <td>{ slideData.referralCode }</td>
        <td>{ slideData.referralUse ?  slideData.referralUse : null }</td>

        <td>{ slideData.totalOrders }</td>
        <td>{ slideData.totalsaving? slideData.totalsaving:0 }</td>
        <td>{ slideData.referralearning?slideData.referralearning:0 }</td>
        <td>{moment(slideData.registered_at).format('ll')}</td>

        <td>
          <div className="status-ui" onClick={() => this.setCustommerStatus(slideData.id, index, stats)}>
              {
                slideData.isActive 
                ? 
                <Tooltip title="Click to block"><div className="stock-field on-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
                :
                <Tooltip title="Click to activate"><div className="stock-field off-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
              }
            </div>
        </td>


        <td>{ currecySymbol + slideData.wallet_total }</td>
        <td>
          {
            getAclChecks('CUSTOMERS_MANAGE_WALLET')
            ?
            <a href="javascript:void(0)" className="add-money" onClick={() => this.addMoneyWallet(slideData.id, slideData.wallet_total, index)}>Manage Fund</a>
            :
            null
          }
        </td>
        <td>
          {
            getAclChecks('CUSTOMER_WALLET_RECENT_TRANSACTION')
            ?
            <a href="javascript:void(0)" className="add-money" onClick={() => this.showTransaction(slideData.id, index)}>View Transactions</a>
            :
            null
          }
        </td>
      </tr>
      </>
  	);
	}
}

export default CustomersSlide;