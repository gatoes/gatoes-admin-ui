import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import {getCurrencySymbol} from '../../utilities';
import moment from 'moment';

class WalletReportingSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      startDate: props.startDate,
      endDate: props.endDate,
      index: props.index,
      srno: props.srno
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      status: nextProps.status,
      index: nextProps.index
    });
  }

  

	render() {
      const { slideData, index, srno } = this.state;
      let currency = getCurrencySymbol();
      return (
        <>
        <tr key={slideData.id}>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{slideData.name ? slideData.name : ''}</td>
          <td>{currency}{slideData.amount}</td>
          <td>{slideData.message}</td>
          <td>{slideData.status ? 'Add Fund' : 'Reduce Fund'}</td>
          <td>{ moment(slideData.date).format('llll') }</td>
        </tr>
        </>
    	);
  	}
}

export default WalletReportingSlide;