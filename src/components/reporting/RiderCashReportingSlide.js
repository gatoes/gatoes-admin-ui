import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import Modal from '../../Modal';
import {getCurrencySymbol} from '../../utilities';
import { toast } from 'react-toastify';
import RiderTransactionDetail from '../deliveryagent/RiderTransactionDetail';
import CollectCashRider from "./CollectCashRider";

class RidersReportingSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
    this.collectCash = this.collectCash.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  showTransaction(riderId, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Transactions</h4>}
              body={<RiderTransactionDetail riderId={riderId} index={index} updateData={this.updateData}  />}
            />
    });
  }

  updateData(){
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

  collectCash(driverId, amount, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Collect Cash</h4>}
              body={<CollectCashRider driverId={driverId} index={index} updateUserData={this.updateUserData} amount_dues={amount}  />}
            />
    });
  }

  updateUserData(userId, total){
    const { slideData} = this.state;
    this.setState({
      slideData: {...this.state.slideData, cashCarried: total}
    })
    
    //slideData.shop_status = status;
    toast.success('Cash collected successfully.', {
      position: toast.POSITION.TOP_RIGHT
    });  

    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
  }

	render() {
      const { slideData, index, srno } = this.state;
      let currecySymbol = getCurrencySymbol();
      return (
        <>
        <tr>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{slideData.unique_id}</td>
          <td>{slideData.name}</td>
          <td>{currecySymbol + + slideData.cashCarried.toFixed(2)}</td>
          <td><a href="javascript:void(0)" className="add-money" onClick={() => this.collectCash(slideData.driverId, slideData.cashCarried, index)}>Deposit Cash</a></td>
          <td><a href="javascript:void(0)" className="add-money" onClick={() => this.showTransaction(slideData.driverId, index)}>View Transactions</a></td>
        </tr>
        </>
    	);
  	}
}

export default RidersReportingSlide;