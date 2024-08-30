import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import {getCurrencySymbol} from '../../utilities';

class CustomerReportingSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

	render() {
    const { slideData, index, srno } = this.state;
    let currency = getCurrencySymbol();
    return (
      <>
      <tr>
        <td>{ parseInt(parseInt(index+1) + srno)}</td>
        <td>{slideData.unique_id}</td>
        <td>{slideData.name}</td>
        <td>{slideData.email && slideData.email }</td>
        <td>{slideData.phoneNumber ? "+" + slideData.countryCode + slideData.phoneNumber : null}</td>
        <td>{slideData.averageRating && slideData.averageRating}</td>
        <td>{slideData.totalOrders}</td>
        <td>{slideData.totalCompleted}</td>
        <td>{slideData.orderCancelled}</td>
        <td>{currency+slideData.totalAmountSpend.toFixed(2)}</td>
      </tr>
      </>
  	);
	}
}

export default CustomerReportingSlide;