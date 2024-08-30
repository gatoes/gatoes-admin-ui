import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import {RIDER_APP_EVENTS} from '../../constants';

class LogsSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
  }

	render() {
    const { slideData, index, srno } = this.state;
    return (
      <>
      <tr>
        <td>{ parseInt(parseInt(index+1) + srno)}</td>
        <td>{slideData.userId}</td>
        <td>{slideData.userName}</td>
        <td>{RIDER_APP_EVENTS[slideData.type].label}</td>
        <td>{moment(slideData.timestamp).format('llll')}</td>
        <td>{slideData.device.manufacturer  + " " + slideData.device.model}</td>
      </tr>
      </>
  	);
	}
}

export default LogsSlide;