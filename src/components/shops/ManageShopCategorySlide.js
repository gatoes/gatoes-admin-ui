import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteShopCategory, deleteShopCategorySuccess } from '../../actions/shops';
import {DELETE_CONFIRMATION, DELETE_SUCCESS, ACTIVATE_CONFIRMATION, DEACTIVATE_CONFIRMATION, STATUS_UPDATE_SUCCESS } from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tooltip from '../common/Tooltip';
import {getAclChecks} from '../../utilities';

class ManageShopCategorySlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData
    });
  }

  deleteItem(dId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteShopCategory({catId: dId}).then((response) => {
              this.props.reload();
              toast.success(DELETE_SUCCESS, {
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

	render() {
      const { slideData, index } = this.state;
      
      return (
        <tr>
          <td>{ parseInt(index+1) }</td>
          <td>{slideData.name}</td>
          <td>
            <div className="table-btn-block">
              {
                getAclChecks('SHOP_CATEGORY_ADD_EDIT')
                ?
                <Link  className="btn edit-btn" to={"/dashboard/editshopcategory/"+ slideData.id}>Edit</Link>
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

export default ManageShopCategorySlide;