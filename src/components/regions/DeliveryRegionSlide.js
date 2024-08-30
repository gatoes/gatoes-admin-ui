import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import EditDeliveryRegion from './EditDeliveryRegion';
import Modal from '../../Modal';
import { getDeliveryRegionById } from '../../actions/regions';
import Tooltip from '../common/Tooltip';
import {getAclChecks} from '../../utilities';

class DeliveryRegionalSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index
    };
    this.editDeliveryRegionPanel = this.editDeliveryRegionPanel.bind(this);
  }

  editDeliveryRegionPanel(itemIndex){
    const {slideData} = this.state;
    getDeliveryRegionById({'id' : slideData.id}).then((response) => {
        window.getFooter().setState({
          renderElement: <Modal 
                  id="business-detail-modal"
                  show={true}
                  onHide={this.hide}
                  header={<h4 className="modal-title">Edit Delivery Region</h4>}
                  body={<EditDeliveryRegion regionDetail={response.data.data} updateRegionSlide={this.updateRegionSlide.bind(this)} itemIndex={itemIndex} />} 
                />
        });
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  updateRegionSlide(result){
    console.log('result', result);
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    window.getFooter().setState({
        renderElement: null
    });
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

	render() {
      const { slideData, index } = this.state;
    	return (
        <tr>
          <td>{ parseInt(index+1) }</td>
          <td>{slideData.name}</td>
          <td>
            {
              getAclChecks('DELIVERY_REGION_ADD_EDIT')
              ?
              <Tooltip title="Edit">
                <div className="table-btn-block">
                  <a href="javascript:void(0);"  onClick={() => this.editDeliveryRegionPanel(index)}><button className="btn edit-btn"><i className="material-icons">edit</i></button></a>
                </div>
              </Tooltip>
              :
              null
            }
          </td>
        </tr>
    	);
  	}
}


export default DeliveryRegionalSlide;