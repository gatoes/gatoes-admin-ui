import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { deleteStaff, deleteStaffSuccess, setStaffMemberStatus } from '../../actions/users';
import Tooltip from '../common/Tooltip';
import { DELETE_CONFIRMATION, DELETE_SUCCESS, ACTIVATE_CONFIRMATION, DEACTIVATE_CONFIRMATION, STATUS_UPDATE_SUCCESS} from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getAclChecks} from '../../utilities';
import Modal from '../../Modal';
import ChangePasswordForm from './ChangePasswordForm';

class StaffSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.setStaffStatus = this.setStaffStatus.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.updateShop = this.updateShop.bind(this);
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
            deleteStaff({staffId: dId}).then((response) => {
              this.props.deleteStaffSuccess(index);
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

  setStaffStatus(dId, index, stats){
    const { slideData } = this.state;
    confirmAlert({
      title: '',
      message: stats == 1 ? ACTIVATE_CONFIRMATION : DEACTIVATE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setStaffMemberStatus({staffId: dId, status: stats}).then((response) => {
              this.setState({
                slideData: {...slideData, status: response.data.data.status}
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

  changePassword(staffId){
    window.getFooter().setState({
      renderElement: <Modal 
              id="stock-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Change Password</h4>}
              body={<ChangePasswordForm panel="staff" shopId={staffId} updateShop={this.updateShop}  />}
            />
    });
  }

  updateShop(result){
    toast.success("Password has been updated successfully.", {
      position: toast.POSITION.TOP_RIGHT
    });
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

	render() {
      const { slideData, index } = this.state;
      const stats = slideData.status ? 0 : 1;
    	return (
        <tr>
          <td>{ parseInt(index+1) }</td>
          <td>{slideData.unique_id ? slideData.unique_id : null }</td>
          <td>{slideData.name}</td>
          <td>{slideData.roleName.toString()}</td>
          <td>{slideData.zoneName.toString()}</td>
          <td>{slideData.contactNumber}</td>
          <td>
            {
              getAclChecks('STAFF_ADD_EDIT')
              ?
              <div className="status-ui" onClick={() => this.setStaffStatus(slideData.id, index, stats)}>
                {
                  slideData.status 
                  ? 
                  <Tooltip title="Click to deactivate"><div className="stock-field on-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
                  :
                  <Tooltip title="Click to activate"><div className="stock-field off-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
                }
              </div>
              :
              <div className="status-ui">
                {
                  slideData.status 
                  ? 
                  <div className="stock-field on-btn"><label className="switch"><div className="switch-slider"></div></label></div>
                  :
                  <div className="stock-field off-btn"><label className="switch"><div className="switch-slider"></div></label></div>
                }
              </div>
            }
          </td>
          <td>
            <div className="table-btn-block">
              <div className="table-btn-block">
                {
                  getAclChecks('STAFF_ADD_EDIT')
                  ?
                  <Link className="btn edit-btn" to={"/dashboard/editstaff/"+ slideData.id}>Edit</Link>
                  :
                  null
                }
                {
                  getAclChecks('STAFF_DELETE')
                  ?
                  <>
                  <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
                  <a className="btn edit-btn" href="javascript:void(0)" onClick={() => this.changePassword(slideData.id)}>Change Password</a>
                  </>
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
    deleteStaffSuccess: (payload) => {
      dispatch(deleteStaffSuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(StaffSlide);