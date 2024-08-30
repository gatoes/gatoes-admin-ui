import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
//import {getCurrencySymbol} from '../../utilities';
import { downloadRiderReporting } from '../../actions/deliveryagent';
import { toast } from 'react-toastify';

class PartnerWithUsSlide extends Component {
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
      return (
        <tr>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{slideData.shopName}</td>
          <td>{slideData.ownerName}</td>
          <td>+{slideData.countryCode} {slideData.mobileNumber}</td>
          <td>{slideData.email}</td>
        </tr>
    	);
  	}
}

export default PartnerWithUsSlide;