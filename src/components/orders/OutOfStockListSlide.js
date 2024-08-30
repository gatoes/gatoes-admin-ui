import React, { Component, Suspense } from 'react';
import moment from 'moment';
import { render } from 'react-dom';
import {getCurrencySymbol} from '../../utilities';
import Modal from '../../Modal';
import OutOfStockDetail from './OutOfStockDetail';

class OutOfStockListSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno,
      isPaneOpen: false,
      isPaneOpenLeft: false
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  OutOfStockDetail(e){
    const {slideData} = this.state;
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<><h4 className="modal-title">{slideData.restaurant.shopName}</h4><span>{slideData.restaurant.shopCuisines}</span><button type="button" className="btn m-cancel-btn" data-dismiss="modal">Close</button></>}
              body={<OutOfStockDetail slideData={this.state.slideData}  updateOrderList={this.props.updateOrderList} />}
            />
    });
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

	render() {
      const { slideData, index, srno } = this.state;
      let currency = getCurrencySymbol();
      return (
        <>
        <tr>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td><a onClick={this.OutOfStockDetail.bind(this)} href="javascript:void(0)" >{slideData.orderId}</a></td>
          {/*
          <td><a href={"/dashboard/outofstockorderbyid/" + slideData.orderId} >{slideData.orderId}</a></td>
          */}
          <td>{slideData.restaurant.shopName }</td>
          <td>{moment(slideData.order.placedAt).format('llll')}</td>
          <td>{ currency + slideData.order.itemTotal }</td>
        </tr>
        </>
    	);
  	}
}

export default OutOfStockListSlide;