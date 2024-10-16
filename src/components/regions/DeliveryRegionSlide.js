import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import EditDeliveryRegion from './EditDeliveryRegion';
import Modal from '../../Modal';
import { activateDeactivateSurgeByRegionId, getDeliveryRegionById } from '../../actions/regions';
import Tooltip from '../common/Tooltip';
import {getAclChecks} from '../../utilities';
import {DEACTIVATE_CONFIRMATION, DEACTIVATE_SUCCESS, ACTIVATE_SUCCESS, ACTIVATE_CONFIRMATION} from '../../constants';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

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
    console.log("editng",slideData)
    if(slideData.id)
    {
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
  }
  changeNormalSurgeStatus(id, status ,index){
    let confirmation = null;
    let sucess = null;
    let stats = null;
    if(status == 1){
       confirmation = DEACTIVATE_CONFIRMATION;
       sucess = DEACTIVATE_SUCCESS;
       stats = 0;
    } else {
       confirmation = ACTIVATE_CONFIRMATION;
       sucess = ACTIVATE_SUCCESS;
       stats = 1;
    }
    confirmAlert({
      title: '',
      message: confirmation,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            activateDeactivateSurgeByRegionId({value: stats, regionId: id, type: 'surge'}).then((response) => {
              this.setState({
                slideData: {...this.state.slideData, surge: stats}
              })
              toast.success(sucess, {
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

  changeWeatherSurgeStatus(id, status ,index){
    let confirmation = null;
    let sucess = null;
    let stats = null;
    if(status == 1){
       confirmation = DEACTIVATE_CONFIRMATION;
       sucess = DEACTIVATE_SUCCESS;
       stats = 0;
    } else {
       confirmation = ACTIVATE_CONFIRMATION;
       sucess = ACTIVATE_SUCCESS;
       stats = 1;
    }
    confirmAlert({
      title: '',
      message: confirmation,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            activateDeactivateSurgeByRegionId({value: stats, regionId: id, type: 'weather_surge'}).then((response) => {
              this.setState({
                slideData: {...this.state.slideData, weather_surge: stats}
              })
              toast.success(sucess, {
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
            <Tooltip title={slideData.surge == 1 ? "Click to Hide" : "Click to Activate"}>
              <div className={slideData.surge == 1 ? 'stock-field on-btn' : 'stock-field off-btn'} onClick={() => this.changeNormalSurgeStatus(slideData.id, slideData.surge, index)}>
                <label className="switch" >
                  <div className="switch-slider"></div>
                    {slideData.surge == 1 ? 'Active' : 'Hide'}
                </label>
              </div>
            </Tooltip>
          </td>
          <td>
            <Tooltip title={slideData.weather_surge == 1 ? "Click to Hide" : "Click to Activate"}>
              <div className={slideData.weather_surge == 1 ? 'stock-field on-btn' : 'stock-field off-btn'} onClick={() => this.changeWeatherSurgeStatus(slideData.id, slideData.weather_surge, index)}>
                <label className="switch" >
                  <div className="switch-slider"></div>
                    {slideData.weather_surge == 1 ? 'Active' : 'Hide'}
                </label>
              </div>
            </Tooltip>
          </td>
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