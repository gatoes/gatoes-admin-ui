import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteTax, deleteTaxSuccess, updateStatus } from '../../actions/taxes';
import {DELETE_CONFIRMATION, DELETE_SUCCESS, TAX_TYPE, ACTIVATE_CONFIRMATION, DEACTIVATE_CONFIRMATION, STATUS_UPDATE_SUCCESS } from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tooltip from '../common/Tooltip';
import {getAclChecks} from '../../utilities';

class ManageTaxesSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index
    };
    this.deleteItem = this.deleteItem.bind(this);
     this.setStatus = this.setStatus.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData
    });
  }

  setStatus(dId, index, stats){
    const { slideData } = this.state;
    confirmAlert({
      title: '',
      message: stats == 1 ? ACTIVATE_CONFIRMATION : DEACTIVATE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updateStatus({status: stats, id: dId}, dId).then((response) => {
              this.setState({
                slideData: {...slideData, status: stats}
              });
              toast.success(STATUS_UPDATE_SUCCESS, {
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

  deleteItem(dId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteTax({id: dId}).then((response) => {
              this.props.reload();
              toast.success(DELETE_SUCCESS, {
                position: toast.POSITION.TOP_RIGHT
              });
            }).catch(error => {
              //throw new SubmissionError(error.response.data.error);
            });
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

	render() {
      const { slideData, index } = this.state;
       const stats = slideData.status ? 0 : 1;
      return (
        <tr>
          <td>{ parseInt(index+1) }</td>
          <td>{slideData.tax_name}</td>
          <td>{slideData.tax_amount}</td>
          <td>{slideData.category_name}</td>
          <td>{TAX_TYPE[slideData.tax_type - 1].label}</td>

          <td>
            <div className="status-ui" onClick={() => this.setStatus(slideData.id, index, stats)}>
              {
                slideData.status 
                ? 
                <div className="stock-field on-btn"><label className="switch"><div className="switch-slider"></div></label></div>
                :
                <div className="stock-field off-btn"><label className="switch"><div className="switch-slider"></div></label></div>
              }
            </div>
          </td>

          <td>
            <div className="table-btn-block">
              {
                getAclChecks('SHOP_CATEGORY_ADD_EDIT')
                ?
                <Link  className="btn edit-btn" to={"/dashboard/edit-taxes/"+ slideData.id}>Edit</Link>
                :
                null
              }
              {
                getAclChecks('SHOP_CATEGORY_DELETE')
                ?
                <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
                :
                null
              }
            </div>
          </td>
        </tr>
    	);
  	}
}

export default ManageTaxesSlide;