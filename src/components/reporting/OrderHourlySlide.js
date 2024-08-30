import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
class OrderHourlySlide extends Component {
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
      const { slideData, index } = this.state;
      console.log('slide', slideData);
      return (
        <>
        <tr>
          <td>{ slideData.timing }</td>
          <td>{slideData.totalOrders}</td>
          <td>{slideData.orderAccepted}</td>
          <td>{slideData.orderCancelled}</td>
          <td>{slideData.orderCompleted}</td>
          <td>{slideData.promo }</td>
        </tr>
        </>
    	);
  	}
}

export default OrderHourlySlide;