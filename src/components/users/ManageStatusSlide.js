import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import {toast} from 'react-toastify';
import { deleteUser, deleteUserSuccess, recoverUser, recoverUserSuccess } from '../../actions/users';
import {  DELETE_CONFIRMATION, DELETE_SUCCESS, RECOVER_USER_SUCCESS, RESTORE_SUCCESS } from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';

class ManageStatusSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
  }

  deleteItem(itemId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteUser({id: itemId}).then((response) => {
              this.props.deleteUserSuccess(index);
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

  restoreItem(itemId, index){
    confirmAlert({
      title: '',
      message: RESTORE_SUCCESS,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            recoverUser({id: itemId}).then((response) => {
              this.props.deleteUserSuccess(index);
              toast.success(RECOVER_USER_SUCCESS, {
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
    const { slideData, index, srno } = this.state;
    return (
      <tr>
        <td>{ parseInt(parseInt(index+1) + srno)}</td>
        <td>{slideData.unique_id}</td>
        <td>{slideData.full_name ? slideData.full_name : null}</td>
        <td>{slideData.email && slideData.email }</td>
        <td>{slideData.phone_number ? "+" + slideData.country_code + ' ' +slideData.phone_number : null}</td>
        

        <td>{moment(slideData.registered_at).format('ll')}</td>

       

        <td>{moment(slideData.deleted_at).format('ll')}</td>

        <td>
        <div className="table-btn-block">

            <button className="btn edit-btn" onClick={() => this.restoreItem(slideData.id, index)}>Recover</button>
            <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
          </div>
            
        </td>
      </tr>
  	);
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserSuccess: (payload) => {
      dispatch(deleteUserSuccess(payload));
    },
   

  };
}
export default connect(null, mapDispatchToProps)(ManageStatusSlide);