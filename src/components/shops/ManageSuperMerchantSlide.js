import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteSuperMerchant, deleteSuperMerchantSuccess } from '../../actions/shops';
import {DELETE_CONFIRMATION, DELETE_SUCCESS } from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import ChangePasswordForm from '../users/ChangePasswordForm';
import Modal from '../../Modal';
//import {getAclChecks} from '../../utilities';

class ManageSuperMerchantSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      srno: props.srno,
      index: props.index
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.updateShop = this.updateShop.bind(this);
  }

  changePassword(shopId){
    window.getFooter().setState({
      renderElement: <Modal 
              id="stock-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Change Password</h4>}
              body={<ChangePasswordForm shopId={shopId} updateShop={this.updateShop} panel="supermerchant"  />}
            />
    });
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
            deleteSuperMerchant({id: dId}).then((response) => {
              this.props.deleteSuperMerchantSuccess(index);
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

  hide(){
    window.getFooter().setState({
        renderElement: null
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


	render() {
      const { slideData, index, srno } = this.state;
      return (
        <tr>
          <td>{ parseInt(srno + parseInt(index+1)) }</td>
          <td>{slideData.name}</td>
          <td>{slideData.email}</td>
          <td>{slideData.contactNumber}</td>
          <td>{slideData.firstAlertnateContactNumber}</td>
          <td>
            <div className="table-btn-block">
              <Link className="btn edit-btn" to={"/dashboard/editsupermerchant/"+ slideData.id}>Edit</Link>
              <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
              <a className="btn edit-btn" href="javascript:void(0)" onClick={() => this.changePassword(slideData.id)}>Change Password</a>
            </div>
          </td>
        </tr>
    	);
  	}
}

export default connect(null, {deleteSuperMerchantSuccess})(ManageSuperMerchantSlide);