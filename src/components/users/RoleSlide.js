import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { deleteRole, deleteRoleSuccess } from '../../actions/users';
import Tooltip from '../common/Tooltip';
import { DELETE_CONFIRMATION, DELETE_SUCCESS} from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getAclChecks} from '../../utilities';

class RoleSlide extends Component {
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
      slideData: nextProps.slideData,
      index: nextProps.index
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
            deleteRole({roleId: dId}).then((response) => {
              this.props.deleteRoleSuccess(index);
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
          <td>{slideData.permission}</td>
          <td>
            <div className="table-btn-block">
              <div className="table-btn-block">
                {
                  getAclChecks('ROLES_ADD_EDIT')
                  ?
                  <Link className="btn edit-btn" to={"/dashboard/editrole/"+ slideData.roleId}>Edit</Link>
                  :
                  null
                }
                {
                  getAclChecks('ROLES_DELETE')
                  ?
                  <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.roleId, index)}>Delete</button>
                  :
                  null
                }
                
              </div>
              </div>
          </td>
        </tr>
    	);
  	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRoleSuccess: (payload) => {
      dispatch(deleteRoleSuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(RoleSlide);