import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
//import Modal from '../../Modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import MenuItemInfo from './MenuItemInfo';
import {currencyFormat} from '../../constants';

class RequestedMenuItemSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno,
      isPaneOpen: false,
      isPaneOpenLeft: false
    };
    this.onCloseSlide = this.onCloseSlide.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  onCloseSlide(){
    this.setState({
      isPaneOpen: false,
      isPaneOpenLeft: false
    })
  }

	render() {
      const { slideData, index, srno } = this.state;
      return (
        <>
        <tr>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{slideData.shopName}</td>
          <td>
            <a href="javascript:void(0)" onClick={ () => this.setState({ isPaneOpen: true }) }>  {slideData.itemName} </a>
          </td>
          
          <td>{ slideData.itemPrice ? currencyFormat(slideData.itemPrice) : '' }</td>
          <td>{ slideData.itemStatus == 2 ? 'Edited' : 'New'  }</td>
        </tr>
        <SlidingPane
          className='some-custom-class'
          overlayClassName='some-custom-overlay-class'
          isOpen={ this.state.isPaneOpen }
          title={slideData.shopName}
          subtitle={ slideData.itemName }
          onRequestClose={ () => {
              this.setState({ isPaneOpen: false });
          } }>
          <div>
            <MenuItemInfo itemInfo={slideData} index={index} onCloseSlide={this.onCloseSlide} />
          </div>
          
        </SlidingPane>
        </>
    	);
  	}
}

export default RequestedMenuItemSlide;