import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteGallery, deleteGallerySuccess } from '../../actions/shops';
import {DELETE_CONFIRMATION, DELETE_SUCCESS } from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tooltip from '../common/Tooltip';
import {getAclChecks} from '../../utilities';

class ManageGallerySlide extends Component {
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
            deleteGallery({id: dId}).then((response) => {
              this.props.deleteGallerySuccess(index);
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
              <Link  className="btn edit-btn" to={"/dashboard/editgallery/"+ slideData.id}>Edit</Link>
              <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
            </div>
          </td>
        </tr>
    	);
  	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteGallerySuccess: (payload) => {
      dispatch(deleteGallerySuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(ManageGallerySlide);